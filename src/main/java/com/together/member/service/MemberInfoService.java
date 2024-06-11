package com.together.member.service;

import com.together.common.utils.jwt.bean.AuthenticationRequest;
import com.together.common.utils.jwt.bean.JwtToken;
import com.together.member.bean.MemberDTO;
import org.springframework.http.ResponseEntity;

public interface MemberInfoService {

    ResponseEntity<JwtToken> loginCheck(AuthenticationRequest request);

    String writeMember(MemberDTO memberDTO);

    boolean decodingToken(JwtToken jwtToken);

    String isExist(String memberId);
}
