package com.together.member.controller;

import com.together.common.utils.jwt.bean.AuthenticationRequest;
import com.together.common.utils.jwt.bean.JwtConfiguration;
import com.together.common.utils.jwt.bean.JwtToken;
import com.together.member.bean.MemberDTO;
import com.together.member.service.MemberInfoService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.*;

//포트 번호가 달라서(front는 3000, back은 8080) 생기는 연결 거부 문제 해결
@CrossOrigin
//직접적인 페이지 연결은 프론트에서 함으로 벡에서는 정보 전달을 위한 작업만 수행함.
@RestController
//접근경로
@RequestMapping(
        path = {"member"}
)
public class MemberController {
    private static final Logger log = LoggerFactory.getLogger(MemberController.class);
    @Autowired
    private JwtConfiguration jwtProp;
    @Autowired
    private MemberInfoService memberInfoService;

    @Secured("ROLE_USER")
    @GetMapping(path="test")
    public String test(){
        System.out.println("테스트");
        log.info("테스트임당");
        return "test";
    }
    @PostMapping(path="test4")
    public String test4(@RequestParam("str") String str){
        System.out.println("테스트4 " + str);
        log.info("테스트4임당 " + str);
        return "test4 " + str;
    }

    @PostMapping(path={"loginCheck"})
    public ResponseEntity<JwtToken>  loginCheck(@RequestBody AuthenticationRequest request){
        log.info("login controller: " + request);

        ResponseEntity<JwtToken>  jwtToken = memberInfoService.loginCheck(request);
        //System.out.println("MemberController - JwtToken: " + jwtToken);

        return jwtToken;
    }

    //회원가입.
    @PostMapping(path={"writeMember"})
    public String writeMember(@RequestBody MemberDTO memberDTO){
        System.out.println("writeMemberController: " + memberDTO);

        String writeMsg = memberInfoService.isExist(memberDTO.getMember_id());// "true" or "이미 존재 아이디"
        if(writeMsg.equals("true")){
            writeMsg = memberInfoService.writeMember(memberDTO);// 가입을 축하합니다.
        }
        return writeMsg;
    }

    @PostMapping(path="decodingToken")
    public boolean decodingToken(@RequestBody JwtToken jwtToken){
        System.out.println("decodingToken: " + jwtToken);
        return memberInfoService.decodingToken(jwtToken);
    }


    /*
    @PostMapping(path={"updateMember"})
    public void updateMember(MemberDTO memberDTO){
        memberInfoService.updateMember(memberDTO);
    }

    @PostMapping(path={"deleteMamber"})
    public void deleteMember(String member_id){
        memberInfoService.deleteMember(member_id);
    }

    //유저 1명의 정보 DB에서 가져오기
    @GetMapping(path={"getMemberInfo"})
    public MemberDTO getMemberInfo(String memeber_id, ??){
        return memberInfoService.getMemberInfo(member_id, ??);
    }
*/
    
}
