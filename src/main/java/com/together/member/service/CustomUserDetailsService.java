package com.together.member.service;

import com.together.member.DAO.MemberDAO;
import com.together.member.bean.MemberDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.lang.reflect.Member;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CustomUserDetailsService implements UserDetailsService {
    @Autowired
    private MemberDAO memberDAO;
    private final PasswordEncoder passwordEncoder;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        //System.out.println("loadUserByUsername: " + username);
        Optional<MemberDTO> memberDTO = memberDAO.findById(username);
        //System.out.println("memberDTO " + memberDTO);

        UserDetails userDetails = memberDTO
                .map(this::createUserDetails)
                .orElseThrow(() -> new UsernameNotFoundException("해당하는 회원을 찾을 수 없습니다."));

        System.out.println("customUserDetailsService - loadUser: " + userDetails);
        return userDetails;
    }

    // 해당하는 User 의 데이터가 존재한다면 UserDetails 객체로 만들어서 return
    private UserDetails createUserDetails(MemberDTO member) {
        UserDetails userDetails = User.builder()
                .username(member.getUsername())
                //실제로는 DB 자체에 encoding된 password 값을 갖고 있고 그냥 memer.getPassword()로 encoding된 password를 꺼내는 것이 좋지만, 편의를 위해 검증 객체를 생성할 때 encoding을 해줬다
                .password(passwordEncoder.encode(member.getPassword()))
                .roles(member.getMember_role())//ROLE_USER
                //.roles(member.getRoles().toArray(new String[0]))
                .build();
        System.out.println("customUserDetailsService - createDetails: " + userDetails);
        return userDetails;
    }
}
