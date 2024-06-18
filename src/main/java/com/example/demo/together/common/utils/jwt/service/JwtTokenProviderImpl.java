package com.example.demo.together.common.utils.jwt.service;

import com.example.demo.together.common.utils.jwt.bean.RefreshToken;
import com.example.demo.together.common.utils.jwt.repository.RefreshTokenRepo;
import com.example.demo.together.common.conf.JwtConfiguration;
import com.example.demo.together.common.utils.jwt.bean.JwtToken;
import com.example.demo.together.member.DAO.MemberDAO;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.security.Key;
import java.util.Arrays;
import java.util.Collection;
import java.util.Date;
import java.util.Optional;
import java.util.stream.Collectors;

@Component
@Service
@Transactional
public class JwtTokenProviderImpl implements JwtTokenProvider {
    private static final Logger log = LoggerFactory.getLogger(JwtTokenProviderImpl.class);
    private final RefreshTokenRepo refreshTokenRepo;
    @Autowired
    private MemberDAO memberDAO;
    private JwtConfiguration jwtProp;
    private final Key key;

    //secret key 값 저장. constructort. application.properties에 있음.
    public JwtTokenProviderImpl(JwtConfiguration jwtProp, RefreshTokenRepo refreshTokenRepo, MemberDAO memberDAO){
        log.info("시크릿 키 저장");
        if (jwtProp == null) {
            throw new IllegalArgumentException("JwtConfiguration cannot be null");
        }
        byte[] signingKey = jwtProp.getSecretKey().getBytes();
        log.info("JWTTOkenProvider - constructor의 key: " + signingKey);
        this.key= Keys.hmacShaKeyFor(signingKey);
        this.refreshTokenRepo = refreshTokenRepo;
        this.memberDAO = memberDAO;
    }

    //access, refresh 토큰 생성.
    @Override
    public JwtToken generateToken(Authentication authentication ,String member_id){
        System.out.println("generateToken");
        log.info("토큰 생성");
        // 권한 가져오기
        String authorities = authentication.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .collect(Collectors.joining(","));

        //accessToken 생성
        String accessToken = createAccessToken(authorities, member_id);

        //refreshToken 생성
        String refreshToken = createRefreshToken();

        JwtToken returnToken = JwtToken.builder()
                .grantType("Bearer ")
                .accessToken(accessToken)
                .refreshToken(refreshToken)
                .build();

        log.info("return JwtToken: " + returnToken);
        return returnToken;
    }

    private String createAccessToken(String role, String member_id){
        String accessToken = Jwts.builder()
                .setSubject(member_id+"의 토큰")
                //관리자 id로 로그인 시 admin 권한 부여, 그 외에는 user 권한 부여.
                .claim("rol", role)
                .claim("id", member_id)
                .setIssuedAt(new Date())
                .setExpiration((new Date(System.currentTimeMillis() + 1000*60*60)))//1hours
                .signWith(key, SignatureAlgorithm.HS512)
                .compact();
        return accessToken;
    }
    private String createRefreshToken(){
        //uuid로 발급해도 됨. 사용자 정보가 필수는 아니니까.
        String refreshToken = Jwts.builder()
                .setExpiration(new Date(System.currentTimeMillis() + 1000*60*60*24*7))//유효기간 7일
                .signWith(key, SignatureAlgorithm.HS512)
                .compact();
        return refreshToken;
    }
    //토큰 복호화
    @Override
    public Authentication getAuthentication(String accessToken) {
        log.info("accessToken 토큰 복호화:" + accessToken);
        //Jwt 토큰 복호화
        Claims claims = parseClaims(accessToken);
        // user도 admin도 아닌 경우
        if (claims.get("rol") == null) throw new RuntimeException("권한 정보가 없습니다.");

        //권한 정보 가져오기
        Collection<? extends GrantedAuthority> authorities
                //여러개의 권한을 가진 경우 ,를 기준으로 나눠서 저장
                = Arrays.stream(claims.get("rol").toString().split(","))
                .map(SimpleGrantedAuthority::new)
                .collect(Collectors.toList());

        UserDetails userDetails = new User(claims.getSubject(), "", authorities);
        log.info("Jwt 토큰 복호화 - userDetails: " + userDetails);
        return new UsernamePasswordAuthenticationToken(userDetails, "", authorities);
    }

    //토큰 유효기간 검증
    @Override
    public Claims parseClaims(String token){
        log.info("토큰 유효기간검증");
        try{
            return Jwts.parser()
                    .setSigningKey(key)
                    .build()
                    .parseClaimsJws(token)
                    .getBody();
        }catch (ExpiredJwtException e){ //토큰 유효기간 만료 시.
            log.info("토큰 유효기간이 만료되었습니다.");
            return e.getClaims();
        }
    }

    //토큰 정보 검증. access와 refresh 둘 다 가능
    @Override
    public boolean validateToken(String token) {
        log.info("토큰 유효성 검사");
        try {
            Jwts.parser()
                    .setSigningKey(key)
                    .build()
                    .parseClaimsJws(token);

            return true;
        } catch (SecurityException | MalformedJwtException e) {
            log.info("Invalid JWT Token " + e);
        } catch (ExpiredJwtException e) {
            log.info("Expired JWT Token " + e);
        } catch (UnsupportedJwtException e) {
            log.info("Unsupported JWT Token " + e);
        } catch (IllegalArgumentException e) {
            log.info("JWT claims string is empty " + e);
        }
        return false;
    }

    @Override
    public String reissueAccessToken(RefreshToken refreshToken){
        //유효한 refresh Token 인가?
        if(!validateToken(refreshToken.getRefreshToken())){
            System.out.println("이상한 refreshToken인데요.");
            return "";
        }

        //refresh 토큰 -> accessToken 발급
        Optional<RefreshToken> refreshToken1 = refreshTokenRepo.findById(refreshToken.getRefreshToken());
        String accessToken = createAccessToken("USER", refreshToken1.get().getMember_id());

        System.out.println("재발급한 accessToken: " + accessToken);
        return accessToken;
    }


}
