package com.together.common.utils.jwt.controller;

import com.together.board.controller.BoardController;
import jakarta.servlet.http.HttpServletRequest;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController
@RequestMapping(path = {"common/security"})
public class IsTokenValid {
    private static final Logger log = LoggerFactory.getLogger(BoardController.class);

    @Secured("ROLE_USER")
    @PostMapping(path="isUser")
    public String isUser(@RequestBody String str,@RequestHeader("Authorization")String authorization, HttpServletRequest httpRequest){
        String authorization2 = httpRequest.getHeader("Authorization");
        System.out.println("str: " +str);
        System.out.println("isUser: " +str+ "/"+ authorization + "\n" + authorization2);
        return str;
    }

}
