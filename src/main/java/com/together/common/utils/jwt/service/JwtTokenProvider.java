package com.together.common.utils.jwt.service;

import com.together.common.utils.jwt.bean.JwtToken;
import com.together.common.utils.jwt.bean.RefreshToken;
import io.jsonwebtoken.Claims;
import org.springframework.security.core.Authentication;

public interface JwtTokenProvider {
    //accessToken과 refreshToken 생성
    public JwtToken generateToken(Authentication authentication ,String member_id);
    //토큰 정보 추출 = 복호화
    public Authentication getAuthentication(String accessToken);
    //토큰 정보 검증
    public boolean validateToken(String token);
    public String reissueAccessToken(RefreshToken refreshToken);
    public Claims parseClaims(String token);
}
