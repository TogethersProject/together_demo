package com.example.demo.together.member.service;

import com.example.demo.together.common.utils.jwt.bean.AuthenticationRequest;
import com.example.demo.together.common.utils.jwt.bean.JwtToken;
import com.example.demo.together.member.bean.MemberDTO;
import org.springframework.http.ResponseEntity;

public interface MemberInfoService {

    ResponseEntity<JwtToken> loginCheck(AuthenticationRequest request);

    String writeMember(MemberDTO memberDTO);

<<<<<<< HEAD
    boolean isExistId(String checkId);

    boolean decodingToken(JwtToken jwtToken);

    String isExist(String memberId);

    Boolean isEmail(String email, String authMem);

    String sendEmailForm(String email)throws Exception;
=======
    boolean decodingToken(JwtToken jwtToken);

    String isExist(String memberId);
>>>>>>> c876f3d9032582c0e225ea346c52713414c7d090
}
