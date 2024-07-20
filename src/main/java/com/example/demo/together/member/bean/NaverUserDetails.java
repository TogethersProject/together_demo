package com.example.demo.together.member.bean;

import lombok.AllArgsConstructor;

import java.util.Map;

@AllArgsConstructor
public class NaverUserDetails implements OAuth2UserInfo{
    private Map<String, Object> attributes;

    @Override
    public String getProvider(){
        System.out.println("naver");
        return "naver";
    }

    @Override
    public String getProviderId() {
        System.out.println((String) ((Map) attributes.get("response")).get("id"));
        return (String) ((Map) attributes.get("response")).get("id");
    }

    @Override
    public String getEmail() {
        System.out.println((String) ((Map) attributes.get("response")).get("email"));
        return (String) ((Map) attributes.get("response")).get("email");
    }

    @Override
    public String getName() {
        System.out.println((String) ((Map) attributes.get("response")).get("name"));
        return (String) ((Map) attributes.get("response")).get("name");
    }
}
