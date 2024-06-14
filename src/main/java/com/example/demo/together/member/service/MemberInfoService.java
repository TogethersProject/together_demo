package com.example.demo.together.member.service;

import com.example.demo.together.common.utils.jwt.bean.AuthenticationRequest;
import com.example.demo.together.common.utils.jwt.bean.JwtToken;
import com.example.demo.together.member.bean.MemberDTO;
import org.springframework.http.ResponseEntity;

public interface MemberInfoService {

    ResponseEntity<JwtToken> loginCheck(AuthenticationRequest request);

    String writeMember(MemberDTO memberDTO);

    boolean decodingToken(JwtToken jwtToken);

    String isExist(String memberId);
}
