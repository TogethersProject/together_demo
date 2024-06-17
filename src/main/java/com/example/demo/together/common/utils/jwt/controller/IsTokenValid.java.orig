package com.example.demo.together.common.utils.jwt.controller;

<<<<<<< HEAD
import com.example.demo.together.common.utils.jwt.bean.RefreshToken;
import com.example.demo.together.common.utils.jwt.service.JwtTokenProvider;
import com.example.demo.together.boardMentor.controller.BoardMentorController;
import io.jsonwebtoken.Claims;
import jakarta.servlet.http.HttpServletRequest;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
=======
import com.example.demo.together.board.controller.BoardController;
import jakarta.servlet.http.HttpServletRequest;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
>>>>>>> c876f3d9032582c0e225ea346c52713414c7d090
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController
<<<<<<< HEAD
@RequestMapping(path = {"common/"})
public class IsTokenValid {
    private static final Logger log = LoggerFactory.getLogger(BoardMentorController.class);
    @Autowired
    private JwtTokenProvider jwtTokenProvider;
=======
@RequestMapping(path = {"common/security"})
public class IsTokenValid {
    private static final Logger log = LoggerFactory.getLogger(BoardController.class);
>>>>>>> c876f3d9032582c0e225ea346c52713414c7d090

    @Secured("ROLE_USER")
    @PostMapping(path="isUser")
    public String isUser(@RequestBody String str,@RequestHeader("Authorization")String authorization, HttpServletRequest httpRequest){
        String authorization2 = httpRequest.getHeader("Authorization");
        System.out.println("str: " +str);
        System.out.println("isUser: " +str+ "/"+ authorization + "\n" + authorization2);
        return str;
    }

<<<<<<< HEAD
    //accessToken의 유효기간이 지난 경우 refreshToken을 이용해 유효한 accessToken을 받는 방법
    @PostMapping("/reissueRefreshToken")
    public String reissueRefreshToken(@RequestHeader("RefreshToken")String refreshToken){
        System.out.println("재발급");
        Claims claims = jwtTokenProvider.parseClaims(refreshToken);
        String member_id = (String) claims.get("member_id");
        RefreshToken refreshToken1 = new RefreshToken(refreshToken, member_id);
        System.out.println("재발급컨트롤러: " + refreshToken1);
        return jwtTokenProvider.reissueAccessToken(refreshToken1);
    }

=======
>>>>>>> c876f3d9032582c0e225ea346c52713414c7d090
}
