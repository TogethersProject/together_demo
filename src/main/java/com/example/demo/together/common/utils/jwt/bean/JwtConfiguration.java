package com.example.demo.together.common.utils.jwt.bean;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

@Data
@Component
@ConfigurationProperties("com.security.jwt")
public class JwtConfiguration {
    //인코딩 된 시크릿 키
    private String secretKey;
}
