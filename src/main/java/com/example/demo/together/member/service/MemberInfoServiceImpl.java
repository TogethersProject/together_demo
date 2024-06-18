package com.example.demo.together.member.service;
import com.example.demo.together.common.conf.MailCofig;
import com.example.demo.together.common.utils.jwt.bean.AuthenticationRequest;
import com.example.demo.together.common.utils.jwt.bean.JwtToken;
import com.example.demo.together.common.utils.jwt.bean.RefreshToken;
import com.example.demo.together.common.utils.jwt.repository.RefreshTokenRepo;
import com.example.demo.together.common.utils.jwt.service.JwtTokenProvider;
import com.example.demo.together.member.bean.MemberDTO;
import com.example.demo.together.member.DAO.MemberDAO;
import com.nimbusds.oauth2.sdk.auth.Secret;
import jakarta.mail.Message;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.AddressException;
import jakarta.mail.internet.InternetAddress;
import jakarta.mail.internet.MimeMessage;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.data.redis.core.HashOperations;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.http.*;
import org.springframework.mail.MailException;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.JavaMailSenderImpl;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.concurrent.TimeUnit;

@Transactional(readOnly = false)
@Service
public class MemberInfoServiceImpl implements MemberInfoService {
    @Autowired
    private MemberDAO memberDAO;
    private final JwtTokenProvider jwtTokenProvider;
    private final AuthenticationManagerBuilder authenticationManagerBuilder;
    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private RefreshTokenRepo refreshTokenRepo;
    @Autowired
    private JavaMailSender javaMailSender;
    @Autowired
    private RedisTemplate<String, String> redisTemplate;
    @Autowired
    private MailCofig mailCofig;

    private static final long AUTH_CODE_EXPIRATION_HOURS = 1;
    private static final String EMAIL_AUTH_HASH = "email_auth_hash";
    private static final String EMAIL_PASS_HASH = "email_pass_hash";
    @Autowired
    private CustomOauth2UserService customOauth2UserService;

    //constructort. jwtTokenProvider 초기화.
    public MemberInfoServiceImpl(JwtTokenProvider jwtTokenProvider, AuthenticationManagerBuilder authenticationManagerBuilder,AuthenticationManager authenticationManager) {
        this.jwtTokenProvider = jwtTokenProvider;
        this.authenticationManagerBuilder = authenticationManagerBuilder;
        this.authenticationManager = authenticationManager;
    }

    //회원가입
    @Transactional
    @Override
    public String writeMember(MemberDTO memberDTO) {
        //isExist로 검사해서 검사 필수 아님. DB 접근이 잦아서 성능 저하가 우려 된다면 뺄 것.
        System.out.println("회원가입: " + memberDTO);
        if(isExistId(memberDTO.getMember_id())){
            throw new DuplicateKeyException("이미 존재하는 회원입니다.");
        }else{
            String encodedPassword = passwordEncoder.encode(memberDTO.getMember_pwd());
            List<String> roles = new ArrayList<>();
            roles.add("USER");
            //memberDTO.setMember_pwd(encodedPassword);
            memberDAO.save(memberDTO);
        }
        return "가입을 축하합니다.";
    }

    //id 중복 여부 판단
    @Override
    public boolean isExistId(String checkId) {
        if(memberDAO.findById(checkId).isPresent())
            return true;
        return false;
    }

    //id 중복 여부 판단
    @Override
    public String isExist(String memberId) {
        System.out.println("가입하려는 회원 아이디: " +memberId);
        Optional<MemberDTO> isExist = memberDAO.findById(memberId);

        String writeMsg = "true";
        if(isExist.isPresent()) writeMsg = "이미 존재하는 아이디입니다.";

        return writeMsg;
    }

    //id와 pw를 확인하여 로그인
    @Override
    //public boolean loginCheck(AuthenticationRequest request) {
    public ResponseEntity<JwtToken> loginCheck(AuthenticationRequest request) {
        String member_id = request.getMember_id();
        String member_pwd = request.getMember_pwd();
        System.out.println(member_id +" / " + member_pwd);
        // 1. username + password 를 기반으로 Authentication 객체 생성
        // 이때 authentication 은 인증 여부를 확인하는 authenticated 값이 false
        UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(member_id, member_pwd);
        System.out.println("auth: " +authenticationToken);

        try {
            // 2. 실제 검증. authenticate() 메서드를 통해 요청된 Member 에 대한 검증 진행
            // authenticate 메서드가 실행될 때 CustomUserDetailsService 에서 만든 loadUserByUsername 메서드 실행
            //Authentication authentication = authenticationManagerBuilder.getObject().authenticate(authenticationToken);
            Authentication authentication = authenticationManager.authenticate(authenticationToken);

            // 3. 인증 정보를 기반으로 JWT 토큰 생성
            JwtToken jwtToken = jwtTokenProvider.generateToken(authentication, member_id);
            System.out.println("MemberService - loginCheck의 jwtToken: " + jwtToken);

            // 4. refresh 토큰을 DB에 저장(Redis를 사용하는 경우가 많음)
            String refreshToken = jwtToken.getRefreshToken();
            RefreshToken redis = new RefreshToken(refreshToken, member_id);
            refreshTokenRepo.save(redis);

            //HttpHeaders 객체 생성 및 토큰 추가
            HttpHeaders httpHeaders = new HttpHeaders();
            httpHeaders.setBearerAuth(jwtToken.getAccessToken());
            httpHeaders.setContentType(MediaType.APPLICATION_JSON);
            System.out.println("httpHeaders: " + httpHeaders);

            return ResponseEntity.ok().headers(httpHeaders).body(jwtToken);
        } catch (AuthenticationException e) {
            // 인증 실패 시 예외 처리
            System.out.println("유효x 아이디 비밀번호");
            throw new BadCredentialsException("유효하지 않은 아이디, 혹은 비밀번호입니다.");
        }

    }

    //유효 토큰 판별
    @Override
    public boolean decodingToken(JwtToken jwtToken) {
        boolean isValid = jwtTokenProvider.validateToken(jwtToken.getAccessToken());
        System.out.println("decodingToken(Service): " + isValid);
        return isValid;
    }

    //유저가 작성한 코드와 이메일로 보낸 코드 일치 여부 판별
    @Override
    public Boolean isEmail(String email, String authMem) {
        //인증 코드 DB에서 꺼내기
        HashOperations<String, String, String> hashOps = redisTemplate.opsForHash();
        String authDB = hashOps.get(EMAIL_AUTH_HASH, email);//HGET email_auth_hash "lamp0525@naver.com"

        //유저가 입력한 인증 코드와 DB에서 꺼낸 코드 비교하여 T/F
        if(authDB.equals(authMem)){
            System.out.println("DB: " + authDB + " / Member: " + authMem);
            return true;
        }
        return false;
    }


    private boolean isValidEmail(String email) {
        System.out.println("유효 이메일?: " + email);
        if (email == null) {
            System.out.println("빔");
            return false;
        }

        try {
            InternetAddress emailAddr = new InternetAddress(email);
            emailAddr.validate();
            System.out.println("유효");
        } catch (AddressException ex) {
            System.out.println("예외");
            return false;
        }
        return true;
    }
    //유저에게 본인확인용 이메일 전송

    @Override
    public String sendEmailIsMe(String email) {
        try{
            String code = String.valueOf(UUID.randomUUID());

            //1시간 후 만료, 해시맵 형태의 redis. email - code 관계
            HashOperations<String, String, String> hashOps = redisTemplate.opsForHash();
            hashOps.put(EMAIL_AUTH_HASH, email, code);
            redisTemplate.expire(EMAIL_AUTH_HASH, AUTH_CODE_EXPIRATION_HOURS, TimeUnit.HOURS);

            String title ="[together] 인증 번호 안내";
            String content = "이메일 인증 코드: " + code;

            return sendEmailForm(email, title, content);
        }catch(Exception e){
            System.out.println(e);
            return "false";
        }
    }

    private String sendEmailForm(String email, String title, String content) {
        if (email == null || email.isEmpty()) {
            throw new IllegalArgumentException("이메일 주소가 유효하지 않습니다.");
        }if (!isValidEmail(email)) {
            throw new IllegalArgumentException("이메일 주소 형식이 올바르지 않습니다.");
        }

        //인증 코드 생성 및 DB 저장 -> redis(dbgyrlrks, hash map: "유저 email - 유저 인증 코드").
        String emailFrom = mailCofig.getEmailAddress();
        System.out.println("보내는 사람: " + emailFrom);

        //이메일 내용 작성
        MimeMessage message = javaMailSender.createMimeMessage();
        try{
            //이메일 내용 작성: MessagingException
            message.addRecipients(Message.RecipientType.TO, email);
            message.setSubject(title);
            message.setText(content);
            message.setFrom(new InternetAddress(emailFrom));
            System.out.println("이메일 내용: " + message);

            //이메일 전송: MailException
            javaMailSender.send(message);
        }catch(MailException | MessagingException mailException){
            mailException.printStackTrace();
            throw new IllegalArgumentException("이메일 내용 작성 중, 혹은 이메일 전송 중 문제가 발생했습니다.");
        }
        return "true";
    }

    //비밀번호 찾기
    @Override
    public String findPassword(String email, String code) {
        //code가 없는 경우 = 이메일 전송
        if(code ==null){
            String createCode = String.valueOf(UUID.randomUUID());

            //1시간 후 만료, 해시맵 형태의 redis. email - code 관계
            HashOperations<String, String, String> hashOps = redisTemplate.opsForHash();
            hashOps.put(EMAIL_PASS_HASH, email, createCode);
            redisTemplate.expire(EMAIL_PASS_HASH, AUTH_CODE_EXPIRATION_HOURS, TimeUnit.HOURS);

            String title ="[together] 비밀번호 찾기 안내";
            String content = "이메일 인증 코드: " + createCode + "을 입력하세요."
                            +"\n 새로운 비밀번호 생성을 도와드리겠습니다." ;
            return sendEmailForm(email, title, content);
        }else{//code가 있는 경우 = redis 내부에서 코드를 찾아 대조.
            //인증 코드 DB에서 꺼내기
            HashOperations<String, String, String> hashOps = redisTemplate.opsForHash();
            String authDB = hashOps.get(EMAIL_PASS_HASH, email);//HGET email_pass_hash "lamp0525@naver.com"

            //유저가 입력한 인증 코드와 DB에서 꺼낸 코드 비교하여 T/F
            if(authDB.equals(code)){
                System.out.println("DB: " + authDB + " / Code: " + code);
                return "true";
            }
            return "false";
        }
    }//비번찾기 findPassword
    
    //회원 탈퇴
    @Override
    public void deleteMember(String member_id, String accessToken) {
        System.out.println("삭제");
        Optional<MemberDTO> memberDTO = memberDAO.findById(member_id);
        if(memberDTO.isPresent()){
            String provider = memberDTO.get().getProvider();
            if ((provider != null)) {
                snsDelete(member_id, accessToken);   //sns가입 유저면 가입 유저라는 정보가 sns상에도 남아있으니 양쪽에서 삭제해주어야한다.
            }
            memberDAO.deleteById(member_id);
        }

    }
    //sns가입 유저 회원 탈퇴
    private void snsDelete(String memberId, String accessToken){
        Optional<MemberDTO> memberDTO = memberDAO.findById(memberId);
        String type = memberDTO.get().getProvider();
        customOauth2UserService.deleteMember(accessToken, type);
    }

    //특정 유저 1명의 정보 전달
    @Override
    public MemberDTO getMember(String member_id) {
        Optional<MemberDTO> memberDTO = memberDAO.findById(member_id);
        System.out.println("getMember - Service: " + memberDTO.get());
        return memberDTO.get();
    }

    //회원 정보 수정
    @Override
    public void updateMember(MemberDTO memberDTO) {
        //provider가 존재해도(sns 가입 유저여도) id 및 email 제외 모든 정보 수정 가능하도록.
        String member_id= memberDTO.getMember_id();
        System.out.println(member_id + "의 정보를 수정합니다(service)");
        String member_name = memberDTO.getMember_name();
        String member_pwd = memberDTO.getMember_pwd();
        String member_address = memberDTO.getMember_address();
        String member_addressDetail = memberDTO.getMember_addressDetail();
        memberDAO.updateById(
                member_name,
                member_pwd,
                member_address,
                member_addressDetail,
                member_id
        );
    }
}
