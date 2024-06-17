package com.example.demo.together.member.DAO;

import com.example.demo.together.member.bean.MemberDTO;
import org.apache.ibatis.annotations.Param;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;


@Transactional//update, delete
@Repository
public interface MemberDAO extends JpaRepository<MemberDTO, String> {

    //id와 pwd가 일치하는 회원의 정보를 찾음.
    @Query("SELECT m FROM MemberDTO m WHERE m.member_id = :memberId AND m.member_pwd = :memberPwd")
    MemberDTO findByMemberIdAndMemberPwd(@Param("member_id") String memberId, @Param("member_pwd")String memberPwd);


    @Query("SELECT m From MemberDTO m WHERE m.member_email = :email")
    Optional<MemberDTO> findByMember_email(String email);
}
