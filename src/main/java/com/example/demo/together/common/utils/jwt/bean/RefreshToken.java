package com.example.demo.together.common.utils.jwt.bean;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.redis.core.RedisHash;

@Getter
// Redis Leettuce사용. value = redis key. timeToLive = 유효시간(초)
@RedisHash(value="refreshToken", timeToLive = 14440)
public class RefreshToken {
    @Id //persistence말고 data.annotation!!
    private String refreshToken;
    private String member_id;

    public RefreshToken(String refreshToken, String member_id) {
        this.refreshToken = refreshToken;
        this.member_id = member_id;
    }
}
