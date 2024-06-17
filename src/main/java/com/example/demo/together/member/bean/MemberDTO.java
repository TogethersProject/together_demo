package com.example.demo.together.member.bean;

import jakarta.persistence.*;
import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Setter
@Getter
@Entity
@ToString
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
@Table(name ="MEMBER")
public class MemberDTO implements UserDetails {
    @Id
    @Column(name = "member_id", updatable = false, unique = true, nullable = false)
    private String member_id;

    @Column( name="member_name"
            , nullable = false)
    private String member_name;

    @Column( name="member_pwd"
            , nullable = false)
    private String member_pwd;

    @Column( name="member_jointime")
    private Date member_jointime;
    @PrePersist
    protected void onCreate() {
        member_jointime = new Date();
    }

    @Column( name="member_address")
    private String member_address;

    @Column( name="member_role"
            , nullable = false)
    private String member_role ="USER";//default user.

    @Column( name="member_email"
            , nullable = false
            ,unique = true)
    private String member_email;

    //역할 부여(user)
    @ElementCollection(fetch = FetchType.EAGER)
    @Builder.Default
    private List<String> roles = new ArrayList<>();
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return this.roles.stream()
                .map(SimpleGrantedAuthority::new)
                .collect(Collectors.toList());
    }

    //sns 로그인 사이트 - naver
    private String provider;

    // sns 로그인 한 유저의 고유 id
    private String providerId;

    //계정 만료x
    @Override
    public boolean isAccountNonExpired() {
        return true;
    }
    //계정잠김 x
    @Override
    public boolean isAccountNonLocked() {
        return true;
    }
    //비밀번호 만료x
    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }
    //계정 사용 o
    @Override
    public boolean isEnabled() {
        return true;
    }

    @Override
    public String getPassword() {
        return this.member_pwd;
    }

    @Override
    public String getUsername() {
        return this.member_id;
    }
    //private String member_email;
    //private String member_subscribe;
    //private String member_bncode;

}
