package com.example.demo.together.member.service;

import com.example.demo.together.common.utils.jwt.service.JwtTokenProvider;
import com.example.demo.together.common.utils.jwt.bean.AuthenticationRequest;
import com.example.demo.together.common.utils.jwt.bean.JwtToken;
import com.example.demo.together.member.DAO.MemberDAO;
import com.example.demo.together.member.bean.MemberDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Transactional(readOnly = true)
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
        if(memberDAO.findById(memberDTO.getMember_id()).isPresent()){
            throw new DuplicateKeyException("이미 존재하는 회원입니다.");
        }else{
            String encodedPassword = passwordEncoder.encode(memberDTO.getMember_pwd());
            List<String> roles = new ArrayList<>();
            roles.add("USER");
            memberDTO.setMember_pwd(encodedPassword);
            memberDAO.save(memberDTO);
        }
        return "가입을 축하합니다.";
    }

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
        //System.out.println(member_id +" / " + member_pwd);
        // 1. username + password 를 기반으로 Authentication 객체 생성
        // 이때 authentication 은 인증 여부를 확인하는 authenticated 값이 false
        UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(member_id, member_pwd);
        //System.out.println(authenticationToken);

        try {
            // 2. 실제 검증. authenticate() 메서드를 통해 요청된 Member 에 대한 검증 진행
            // authenticate 메서드가 실행될 때 CustomUserDetailsService 에서 만든 loadUserByUsername 메서드 실행
            //Authentication authentication = authenticationManagerBuilder.getObject().authenticate(authenticationToken);
            Authentication authentication = authenticationManager.authenticate(authenticationToken);

            // 3. 인증 정보를 기반으로 JWT 토큰 생성
            JwtToken jwtToken = jwtTokenProvider.generateToken(authentication);
            System.out.println("MemberService - loginCheck의 jwtToken: " + jwtToken);
    

            //HttpHeaders 객체 생성 및 토큰 추가
            HttpHeaders httpHeaders = new HttpHeaders();
            httpHeaders.setBearerAuth(jwtToken.getAccessToken());
            httpHeaders.setContentType(MediaType.APPLICATION_JSON);
            System.out.println("httpHeaders: " + httpHeaders);

            return ResponseEntity.ok().headers(httpHeaders).body(jwtToken);
        } catch (AuthenticationException e) {
            // 인증 실패 시 예외 처리
            throw new BadCredentialsException("유효하지 않은 아이디, 혹은 비밀번호입니다.");
        }

    }

    @Override
    public boolean decodingToken(JwtToken jwtToken) {
        boolean isValid = jwtTokenProvider.validateToken(jwtToken.getAccessToken());
        System.out.println("decodingToken(Service): " + isValid);
        return isValid;
    }
}
