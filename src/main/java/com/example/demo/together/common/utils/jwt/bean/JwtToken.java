package com.example.demo.together.common.utils.jwt.bean;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Builder
@Setter
@Getter
@ToString
public class JwtToken {
    //Jwt에 대한 인증 타입: Bearer
    // Bearer: http 요청에 access token을 authorization 헤더에 담아 전송
    @Column(name="grantType")
    private String grantType;

    @Id
    @Column(name="accessToken")
    private String accessToken;

    @Column(name="refreshToken")
    private String refreshToken;
}
