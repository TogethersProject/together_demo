package com.example.demo.together.member.controller;

import com.example.demo.together.common.conf.JwtConfiguration;
import com.example.demo.together.common.utils.jwt.bean.AuthenticationRequest;
import com.example.demo.together.common.utils.jwt.bean.JwtToken;
import com.example.demo.together.member.DAO.MemberDAO;
import com.example.demo.together.member.bean.MemberDTO;
import com.example.demo.together.member.bean.OauthResponseDTO;
import com.example.demo.together.member.service.MemberInfoService;
import com.example.demo.together.member.bean.*;
import com.example.demo.together.member.service.CustomOauth2UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.*;

import javax.swing.text.html.HTML;
import java.util.Optional;

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
    @Autowired
    private CustomOauth2UserService customOauth2UserService;
    @Autowired
    private MemberDAO memberDAO;

    //로그인. id&pw -> jwt(access&refresh)
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

    //이메일 인증 번호 일치여부
    @GetMapping("/isEmail")
    public Boolean isEmail(@RequestParam("email")String email, @RequestParam("authCode")String authCode){
        System.out.println("isEmail Controller: " + email +" / " + authCode);
        return memberInfoService.isEmail(email, authCode);
    }
    //https://velog.io/@leesomyoung/SpringBoot-SMTP-%EC%9D%B4%EB%A9%94%EC%9D%BC-%EC%9D%B8%EC%A6%9D-%EB%84%A4%EC%9D%B4%EB%B2%84
    //인증번호를 담은 이메일 전송
    @PostMapping("/sendEmail")
    public String sendEmail(@RequestParam("email")String email) throws Exception{
        return memberInfoService.sendEmailForm(email);
    }

    //sns 로그인 및 회원가입
    @GetMapping("/snsLogin")
    public String signup(@RequestParam(name = "code")String code, @RequestParam("state")String state){
        System.out.println("code: " + code + " / state: " + state);
        OauthResponseDTO oauthResponseDTO = customOauth2UserService.signUp(code, "naver");
        //return ResponseEntity.ok(oauthResponseDTO);
        String member_id = oauthResponseDTO.getMember_id();
        Optional<MemberDTO> memberDTO = memberDAO.findById(member_id);
        String member_name = memberDTO.get().getMember_name();
        StringBuilder htmlBuilder = new StringBuilder();
        htmlBuilder.append("<p style='color:red; name='").append(member_id).append("'>");
        htmlBuilder.append(member_name+"님 안녕하세요");
        htmlBuilder.append("</p>");
        htmlBuilder.append("<button onclick=\"location.href='http://localhost:3000/Mypage?id=hong'\"> 버튼 </button>");

        //localStorage에 member_id 저장
        return htmlBuilder.toString();
    }
    @GetMapping("/kakaoLogin")
    public ResponseEntity<OauthResponseDTO> signupKakao(@RequestParam(name = "code")String code, @RequestParam("state")String state){
        System.out.println("code: " + code + " / state: " + state);
        return ResponseEntity.ok(customOauth2UserService.signUp(code, "kakao"));
    }

    //토큰 진위 여부
    @PostMapping(path="decodingToken")
    public boolean decodingToken(@RequestBody JwtToken jwtToken){
        System.out.println("decodingToken: " + jwtToken);
        return memberInfoService.decodingToken(jwtToken);
    }

/*
    @Secured("ROLE_USER")
    @PostMapping(path={"updateMember"})
    public void updateMember(MemberDTO memberDTO){
        memberInfoService.updateMember(memberDTO);
    }

    @Secured("ROLE_USER")
    @PostMapping(path={"deleteMamber"})
    public void deleteMember(String member_id){
        memberInfoService.deleteMember(member_id);
    }

    //유저 1명의 정보 DB에서 가져오기
    @Secured("ROLE_USER")
    @GetMapping(path={"getMemberInfo"})
    public MemberDTO getMemberInfo(String memeber_id, ??){
        return memberInfoService.getMemberInfo(member_id, ??);
    }
*/
    
}
