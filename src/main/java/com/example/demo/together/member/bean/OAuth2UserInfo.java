package com.example.demo.together.member.bean;

//naver, goole, kakao 가입 시 인터페이스 편하게 써야지.
public interface OAuth2UserInfo {
    String getProvider();
    String getProviderId();
    String getEmail();
    String getName();
}