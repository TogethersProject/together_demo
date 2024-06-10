package com.example.demo.unPyeongGuShop.controller;

import com.example.demo.unPyeongGuShop.service.ShopService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@Slf4j
@CrossOrigin("*")
@RequestMapping("/")
public class ShopController {

    private final ShopService shopService;

    @GetMapping("/home")
    public String getHome(){
        System.out.println("ㅎㅇ!");
        return "안녕하새우";
}
}