package com.example.demo.together.member.bean;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@NoArgsConstructor
public class OauthResponseDTO {
    private String member_id;
    private String accessToken;
    private String refreshToken;
    private Boolean isMember;

    public OauthResponseDTO(String member_id, String accessToken, String refreshToken, Boolean isMember){
        this.member_id = member_id;
        this.accessToken = accessToken;
        this.refreshToken = refreshToken;
        this.isMember = isMember;
    }
}
