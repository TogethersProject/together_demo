package com.example.demo.together.member.DAO;

import com.example.demo.together.member.bean.MemberDTO;
import org.apache.ibatis.annotations.Param;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
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

    @Modifying
    @Query("UPDATE MemberDTO m SET m.member_name = :name, m.member_pwd = :pwd, m.member_address = :address, m.member_addressDetail = :addressDetail WHERE m.member_id = :id")
    void updateById(@Param("member_name") String name, @Param("member_pwd") String pwd, @Param("member_address") String address,@Param("member_addressDetail") String addressDetail, @Param("member_id") String id);

    @Modifying
    @Query("DELETE FROM MemberDTO m WHERE m.member_id = :member_id")
    void deleteById(@Param("member_id")String member_id);
}
