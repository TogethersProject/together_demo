package com.together.common.utils.jwt;

import com.together.common.utils.jwt.bean.JwtConfiguration;
import com.together.common.utils.jwt.bean.JwtToken;
import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Arrays;
import java.util.Collection;
import java.util.Date;
import java.util.stream.Collectors;

@Component
public class JwtTokenProviderImpl implements JwtTokenProvider{
    private JwtConfiguration jwtProp;
    private final Key key;

    @Autowired
        //secret key 값 저장. constructort. application.properties에 있음.
    public JwtTokenProviderImpl(JwtConfiguration jwtProp){
        System.out.println("시크릿 키 저장");
        if (jwtProp == null) {
            throw new IllegalArgumentException("JwtConfiguration cannot be null");
        }
        byte[] signingKey = jwtProp.getSecretKey().getBytes();
        System.out.println("JWTTOkenProvider - constructor의 key: " + signingKey);
        this.key= Keys.hmacShaKeyFor(signingKey);
    }

    //access, refresh 토큰 생성.
    @Override
    public JwtToken generateToken(Authentication authentication){
        System.out.println("토큰 생성");
        // 권한 가져오기
        String authorities = authentication.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .collect(Collectors.joining(","));

        //accessToken 생성
        String accessToken = Jwts.builder()
                .setSubject("유저 권한 부여")
                //관리자 id로 로그인 시 admin 권한 부여, 그 외에는 user 권한 부여.
                .claim("rol", authorities)
                .setIssuedAt(new Date())
                .setExpiration((new Date(System.currentTimeMillis() + 1000*60*60)))//1hours
                .signWith(key, SignatureAlgorithm.HS512)
                .compact();

        //refreshToken 생성
        String refreshToken = Jwts.builder()
                                .setExpiration(new Date(System.currentTimeMillis() + 1000*60*60*24*7))//유효기간 7일
                                .signWith(key, SignatureAlgorithm.HS512)
                                .compact();

        JwtToken returnToken =JwtToken.builder()
                .grantType("Bearer ")
                .accessToken(accessToken)
                .refreshToken(refreshToken)
                .build();
        System.out.println("return JwtToken: " + returnToken);
        return returnToken;
    }

    //토큰 복호화
    @Override
    public Authentication getAuthentication(String accessToken) {
        System.out.println("accessToken 토큰 복호화:" + accessToken);
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
        System.out.println("Jwt 토큰 복호화 - userDetails: " + userDetails);
        return new UsernamePasswordAuthenticationToken(userDetails, "", authorities);
    }

    //토큰 유효기간 검증
    private Claims parseClaims(String token){
        System.out.println("토큰 유효기간검증");
        try{
            return Jwts.parser()
                    .setSigningKey(key)
                    .build()
                    .parseClaimsJws(token)
                    .getBody();
        }catch (ExpiredJwtException e){ //토큰 유효기간 만료 시.
            System.out.println("토큰 유효기간이 만료되었습니다.");
            return e.getClaims();
        }
    }

    //토큰 정보 검증
    @Override
    public boolean validateToken(String token) {
        System.out.println("토큰 유효성 검사");
        try {
            Jwts.parser()
                    .setSigningKey(key)
                    .build()
                    .parseClaimsJws(token);
            return true;
        } catch (SecurityException | MalformedJwtException e) {
            System.out.println("Invalid JWT Token " + e);
        } catch (ExpiredJwtException e) {
            System.out.println("Expired JWT Token " + e);
        } catch (UnsupportedJwtException e) {
            System.out.println("Unsupported JWT Token " + e);
        } catch (IllegalArgumentException e) {
            System.out.println("JWT claims string is empty " + e);
        }
        return false;
    }
}
