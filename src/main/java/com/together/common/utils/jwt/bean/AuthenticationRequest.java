package com.together.common.utils.jwt.bean;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@NoArgsConstructor
public class AuthenticationRequest {
    private String member_id;
    private String member_pwd;

}
