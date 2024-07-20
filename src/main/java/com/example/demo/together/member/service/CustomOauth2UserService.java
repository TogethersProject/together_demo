package com.example.demo.together.member.service;

import com.example.demo.together.common.utils.jwt.bean.JwtToken;
import com.example.demo.together.common.utils.jwt.bean.RefreshToken;
import com.example.demo.together.common.utils.jwt.repository.RefreshTokenRepo;
import com.example.demo.together.common.utils.jwt.service.JwtTokenProvider;
import com.example.demo.together.member.bean.MemberDTO;
import com.example.demo.together.member.bean.OauthResponseDTO;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.example.demo.together.member.DAO.MemberDAO;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.redis.core.HashOperations;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

import java.util.*;
import java.util.concurrent.TimeUnit;

@Service
@RequiredArgsConstructor
@Slf4j
public class CustomOauth2UserService extends DefaultOAuth2UserService{
    @Value("${naver.client.id}")
    private String NAVER_CLIENT_ID;
    @Value("${naver.client.secret}")
    private String NAVER_CLIENT_SECRET;
    @Value("${naver.redirect.url}")
    private String NAVER_REDIRECT_URL;
    @Value("${kakao.client.id}")
    private String KAKAO_CLIENT_ID;//[내 애플리케이션] > [앱 키]
    @Value("${kakao.client.secret}")
    private String KAKAO_CLIENT_SECRET;//[내 애플리케이션] > [카카오 로그인] > [보안]
    @Value("${kakao.redirect.url}")
    private String KAKAO_REDIRECT_URL;
    @Value("${google.client.id}")
    private String GOOGLE_CLIENT_ID;//[내 애플리케이션] > [앱 키]
    @Value("${google.client.secret}")
    private String GOOGLE_CLIENT_SECRET;//[내 애플리케이션] > [카카오 로그인] > [보안]
    @Value("${google.redirect.url}")
    private String GOOGLE_REDIRECT_URL;

    @Autowired
    private MemberDAO memberDAO;
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private RefreshTokenRepo refreshTokenRepo;
    @Autowired
    private JwtTokenProvider jwtTokenProvider;
    @Autowired
    private RedisTemplate<String, String> redisTemplate;

    private String TYPE;
    private String CLIENT_ID;
    private String REDIRECT_URI;
    private final String NAVER_PASS_HASH = "naver";
    private final String KAKAO_PASS_HASH = "kakao";
    private final int AUTH_CODE_EXPIRATION_HOURS = 1;

    //회원가입, 회원이면 로그인
    public OauthResponseDTO signUp(String code, String type){
        TYPE = type;
        if(type.equals("naver")){
            CLIENT_ID = NAVER_CLIENT_ID;
            REDIRECT_URI = NAVER_REDIRECT_URL;
        }else if(type.equals("kakao")){
            CLIENT_ID = KAKAO_CLIENT_ID;
            REDIRECT_URI = KAKAO_REDIRECT_URL;
        }else if(type.equals("google")){
            CLIENT_ID = GOOGLE_CLIENT_ID;
            REDIRECT_URI = GOOGLE_REDIRECT_URL;
        }else{
            System.out.println("잘못된 타입입니다.");
            return null;
        }

        //인가코드로 accessToken 요청
        JsonNode jsonNode = getAccessToken(code);
        String accessTokenSns = " ";
        String id_token = " ";
        if(TYPE.equals("naver")){
            accessTokenSns = jsonNode.get("access_token").asText();
        }else if(TYPE.equals("kakao")){
            id_token = jsonNode.get("id_token").asText();//kakao는 id_token - accessToken
        }

        //토큰으로 API 호출
        Map map = getUserInfo(accessTokenSns, id_token);
        System.out.println("map: " + map);
        String snsAccessToken = (String) map.get("snsAccessToken");
//        String snsRefreshToken = (String) map.get("snsRefreshToken");

        //DB 정보 확인 , 없으면 DB에 저장
        MemberDTO memberDTO = registerUserIfNeed(map);

        //JWT 토큰 리턴 및 로그인 처리
        // 권한 설정
        List<GrantedAuthority> authorities = new ArrayList<>();
        authorities.add(new SimpleGrantedAuthority("ROLE_USER"));

        // Authentication 객체 생성
        String member_id = (String) map.get("id");
        Authentication authentication = new UsernamePasswordAuthenticationToken(member_id, "password", authorities);
        System.out.println("Authentication: " + authentication);
        JwtToken jwtToken = jwtTokenProvider.generateToken(authentication, member_id);
        System.out.println("jwtToken: " + jwtToken);
        String accessToken = jwtToken.getAccessToken();
        String refreshToken = jwtToken.getRefreshToken();
        RefreshToken redis = new RefreshToken(refreshToken, member_id);
        refreshTokenRepo.save(redis);

        //회원 여부 email로 확인
        Boolean isMember = checkIsMember(memberDTO);
        return new OauthResponseDTO(memberDTO.getMember_id(), accessToken, refreshToken, isMember, snsAccessToken);
    }
    
    // 인가 코드로 (sns)accessToken 발급
    private JsonNode getAccessToken(String code){
        //http header 작성
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-type", "application/x-www-form-urlencoded;charset=utf-8");

        //http body 작성(필요한 변수는 네이버 개발자 사이트 참고)
        MultiValueMap<String, String> body = new LinkedMultiValueMap<>();
        body.add("grant_type", "authorization_code");
        body.add("client_id", CLIENT_ID);
        if(TYPE.equals("naver")){
            body.add("client_secret", NAVER_CLIENT_SECRET);
        }else if(TYPE.equals("kakao")){
            body.add("client_secret", KAKAO_CLIENT_SECRET);
        }else if(TYPE.equals("google")){
            body.add("client_secret", GOOGLE_CLIENT_SECRET);
        }
        body.add("redirect_uri", REDIRECT_URI);
        body.add("code", code);
        System.out.println("body: " + body);

        //http 전송
        HttpEntity<MultiValueMap<String, String>> request = new HttpEntity<>(body, headers);
        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<String> response = null;
        if(TYPE.equals("naver")){//네이버라면
            response = restTemplate.exchange(
                    "https://nid.naver.com/oauth2.0/token"
                    ,HttpMethod.POST
                    ,request
                    ,String.class
            );
        }else if(TYPE.equals("kakao")){
            response = restTemplate.exchange(
                    "https://kauth.kakao.com/oauth/token"
                    ,HttpMethod.POST
                    ,request
                    ,String.class
            );
        }else if(TYPE.equals("google")) {
            response = restTemplate.exchange(
                    "https://accounts.google.com/o/oauth2/v2/auth"
                    , HttpMethod.POST
                    , request
                    , String.class
            );
        }else{
            System.out.println("잘못된 타입입니다. - getAccessToken");
            return null;
        }

        //HTTP응답(JSON) 파싱
        try{
            String responseBody = response.getBody();   // null Exception 발생 가능
            ObjectMapper objectMapper = new ObjectMapper();
            JsonNode jsonNode = objectMapper.readTree(responseBody);
            System.out.println("jsonNode: " + jsonNode);
            return jsonNode;
        } catch (Exception e) {
            System.out.println("http 응답 파싱 중 에러");
            throw new RuntimeException("Failed to parse access token response", e);
        }

    }//getAccessToken

    //sns 인가 코드를 통해 유저 정보를 map에 저장
    private Map<String, String> getUserInfo(String accessToken, String id_token){
        //http header 작성
        HttpHeaders headers = new HttpHeaders();
        //Bearer 띄어쓰기 주의
        headers.add("Authorization", "Bearer "+accessToken);
        headers.add("Content-type", "application/x-www-form-urlencoded;charset=utf-8");

        //HTTP 요청
        HttpEntity<MultiValueMap<String, String>> request = new HttpEntity<>(headers);
        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<String> response = null;
        if(TYPE.equals("naver")){
            response = restTemplate.exchange(
                    "https://openapi.naver.com/v1/nid/me"
                    ,HttpMethod.POST
                    ,request
                    ,String.class
            );
        }else if(TYPE.equals("kakao")){
            response = restTemplate.exchange(
                    "https://kapi.kakao.com/v2/user/me"
                    ,HttpMethod.POST
                    ,request
                    ,String.class
            );
        }else if(TYPE.equals("google")){
            response = restTemplate.exchange(
                    "https://www.googleapis.com/oauth2/v2/userinfo"
                    ,HttpMethod.POST
                    ,request
                    ,String.class
            );
        }

        //responseBody에서 정보 추출
        String responseBody;
        Map<String, String> map = new HashMap<>();
        try{
            responseBody = response.getBody();  // nullException 발생 가능
            ObjectMapper objectMapper = new ObjectMapper();
            JsonNode jsonNode = objectMapper.readTree(responseBody);
            if(TYPE.equals("naver")) {
                //accessToken으로 정보 요청
                System.out.println("response: " + jsonNode.get("response"));
                map.put("email", jsonNode.get("response").get("email").asText());
                map.put("id", jsonNode.get("response").get("id").asText());
                map.put("name", jsonNode.get("response").get("nickname").asText());//nickname 말고 name도 가능.
                map.put("snsAccessToken", accessToken);
                //map.put("snsRefreshToken", "나중에 추가");

                //redis에 id - accessToken 저장(naver). 회원 탈퇴 시 사용. 서비스 이용에는 MySQL 내부 정보만 쓰기 때문.
                HashOperations<String, String, String> hashOps = redisTemplate.opsForHash();
                hashOps.put(NAVER_PASS_HASH, map.get("id"), accessToken);
                redisTemplate.expire(NAVER_PASS_HASH, AUTH_CODE_EXPIRATION_HOURS, TimeUnit.HOURS);
            }else if(TYPE.equals("kakao")){
                //id_token(jwt)에 있는 정보 추출.
                System.out.println("kakao_account: " + jsonNode.get("kakao_account"));

                //비지니스 앱이 아니라서 email을 못 가져와... 비즈앱 신청을 해야해...
                //map.put("email", jsonNode.get("kakao_account").get("email").asText());
                map.put("email", String.valueOf(UUID.randomUUID()) );

                //id_token을 decoding하여 sub 추출
                System.out.println("id_token: " + id_token);
                Base64.Decoder decoder = Base64.getUrlDecoder();
                final String payload = id_token.split("\\.")[1];
                String payloadDecode = new String(decoder.decode(payload));
                System.out.println(payloadDecode);
                JsonNode jsonKakao = new ObjectMapper().readTree(payloadDecode);
                String sub = jsonKakao.get("sub").asText();
                System.out.println("map에 저장 할 sub: " + sub);
                map.put("id", sub);
                map.put("name", jsonNode.get("kakao_account").get("profile").get("nickname").asText());
                map.put("snsAccessToken", accessToken);
                //map.put("snsRefreshToken", "나중에 추가");

                //redis에 id - accssToken 저장(kakao)
                HashOperations<String, String, String> hashOps = redisTemplate.opsForHash();
                hashOps.put(KAKAO_PASS_HASH, map.get("id"), accessToken);
                redisTemplate.expire(KAKAO_PASS_HASH, AUTH_CODE_EXPIRATION_HOURS, TimeUnit.HOURS);
            }
            return map;
        }catch (Exception e){
            System.out.println("에러발생");
            map.put("error", e.toString());
            return map;
        }

    }//getUserInfo

    //DB에서 기존 유저인지 정보 확인
    private MemberDTO registerUserIfNeed(Map<String, String> map){
        //sns 가입 유저는 id = email
        Optional<MemberDTO> memberDTO = memberDAO.findByMember_email(map.get("email"));
        
        //미 가입 유저면 DB에 넣어
        if(memberDTO.isEmpty()){
            MemberDTO newMemberDTO = MemberDTO.builder()
                    .member_id(map.get("id"))
                    .member_email(map.get("email"))
                    .member_name(map.get("name"))
                    .member_pwd(passwordEncoder.encode(TYPE))
                    .member_role("USER")
                    .provider(TYPE)
                    .build();
            return memberDAO.save(newMemberDTO);
        } else {
            return memberDTO.get();
        }
    }//registerUserIfNeed

    // email(unique)로 회원 여부 판별
    private Boolean checkIsMember(MemberDTO memberDTO){
        return memberDTO.getMember_email() != null;
    }

    //sns 가입 유저 탈퇴
    public String deleteMember(String accessToken, String type){
        TYPE = type;
        String CLIENT_SECRET = null;
        if(TYPE.equals("naver")){
            CLIENT_ID = NAVER_CLIENT_ID;
            CLIENT_SECRET = NAVER_CLIENT_SECRET;
        }

        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-type", "application/x-www-form-urlencoded;charset=utf-8");

        // 요청 파라미터 설정
        MultiValueMap<String, String> body = new LinkedMultiValueMap<>();
        body.add("grant_type", "delete");
        body.add("client_id", CLIENT_ID);
        body.add("client_secret", CLIENT_SECRET);
        body.add("access_token", accessToken);
        System.out.println("body: " + body);

        // HttpEntity 생성
        HttpEntity<MultiValueMap<String, String>> request = new HttpEntity<>(body, headers);

        // RestTemplate 사용하여 요청 전송
        // GET 예시: https://nid.naver.com/oauth2.0/token?grant_type=delete&client_id=cr9KdwLzvG1E2Y2rcKtf&client_secret=BeGvNSefdt&access_token=AAAAPNup0-jisqBC2gXt2CHHKV0GJlicTmVcnvSNjbephV3CrYV_Iy5VUd0WAQJU9ibUGu3Jg4uBGZ4w7j6ue__igns
        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<String> response = restTemplate.exchange(
                "https://nid.naver.com/oauth2.0/token"
                ,HttpMethod.POST
                ,request
                ,String.class
        );

        // 응답 처리
        if (response.getStatusCode().is2xxSuccessful()) {
            // 성공 처리
            System.out.println(response);
            String responseBody = response.getBody();
            System.out.print("respons.Body: ");
            System.out.println(responseBody);

            return "success";
        } else {
            // 오류 처리
            return "false";
        }
    }
}