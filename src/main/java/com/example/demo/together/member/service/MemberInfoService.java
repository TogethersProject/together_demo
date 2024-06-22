package com.example.demo.together.member.service;

import com.example.demo.together.common.utils.jwt.bean.AuthenticationRequest;
import com.example.demo.together.common.utils.jwt.bean.JwtToken;
import com.example.demo.together.member.bean.MemberDTO;
import org.springframework.http.ResponseEntity;

import java.util.Optional;

public interface MemberInfoService {

    ResponseEntity<JwtToken> loginCheck(AuthenticationRequest request);

    String writeMember(MemberDTO memberDTO);

    boolean isExistId(String checkId);

    boolean decodingToken(JwtToken jwtToken);

    String isExist(String memberId);

    Boolean isEmail(String email, String authMem);

    String findPassword(String email);
    String findPasswordCheck(String email, String code);

    String sendEmailIsMe(String email) throws Exception;

    void deleteMember(String memberId, String accessToken);

    MemberDTO getMember(String member_id);

    void updateMember(MemberDTO memberDTO);

    void changePassword(String password, String email);
}
