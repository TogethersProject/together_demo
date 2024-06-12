package com.together.common.utils.jwt.filter;

import com.together.common.utils.jwt.service.JwtTokenProvider;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.ServletRequest;
import jakarta.servlet.ServletResponse;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.GenericFilterBean;

import java.io.IOException;
import java.util.Date;

//Jwt인증을 위한 필터
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends GenericFilterBean {
    private final JwtTokenProvider jwtTokenProvider;

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {
        System.out.println("헤더에서 jwt 토큰 추출");
        //Request Header에서 JWT 토큰 추출
        String token = resolveAccessToken((HttpServletRequest) request);

        //validateToken으로 토큰 유효성 검사
        if(token == null){
            System.out.println("토큰 null");
        }else if(!jwtTokenProvider.validateToken(token)){
            System.out.println("토큰 유효기간 지남");

        } else{
            System.out.println("jwt 토큰 유효: " + token);
            // 토큰이 유효할 경우 토큰에서 Authentication 객체를 가지고 와서 SecurityContext에 저장
            Authentication authentication = jwtTokenProvider.getAuthentication(token);
            SecurityContextHolder.getContext().setAuthentication(authentication);
        }
        
        chain.doFilter(request, response);
    }

    //Request Header에서 accessToken 정보 추출
    private String resolveAccessToken(HttpServletRequest request) {
        System.out.println("jwt 토큰 정보 추출");
        String bearerToken = request.getHeader("Authorization");
        if (StringUtils.hasText(bearerToken) && bearerToken.startsWith("Bearer")) {
            return bearerToken.substring(7);
        }
        return null;
    }

    //Requset Header에서 refreshToken으로 accessToken 재발급
    private String reissueAccessToken(HttpServletRequest request, String role){
        System.out.println("refreshToken 유효성 검사");
        String refreshToken = request.getHeader("RefreshHeader");
        //grantType이 붙어있으면 제거
        if (StringUtils.hasText(refreshToken) && refreshToken.startsWith("Bearer")) {
            refreshToken = refreshToken.substring(7);
        }
        //refreshToken이 유효한 경우 accessToken 재발급(reissue)
        if(jwtTokenProvider.validateToken(refreshToken)){
            //accessToken 생성
            System.out.println("accessToken 재발급");
        }

        return refreshToken;
    }
}
