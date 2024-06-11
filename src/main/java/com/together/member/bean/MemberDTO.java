package com.together.member.bean;

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
@EqualsAndHashCode(of = "id")
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
            , nullable = false)
    private String member_email;

    @ElementCollection(fetch = FetchType.EAGER)
    @Builder.Default
    private List<String> roles = new ArrayList<>();
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return this.roles.stream()
                .map(SimpleGrantedAuthority::new)
                .collect(Collectors.toList());
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

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
