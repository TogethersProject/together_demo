package com.together.member.DAO;

import com.together.member.bean.MemberDTO;
import org.apache.ibatis.annotations.Param;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;


@Transactional//update, delete
@Repository
public interface MemberDAO extends JpaRepository<MemberDTO, String> {

    //id와 pwd가 일치하는 회원의 정보를 찾음.
    @Query("SELECT m FROM MemberDTO m WHERE m.member_id = :memberId AND m.member_pwd = :memberPwd")
    MemberDTO findByMemberIdAndMemberPwd(@Param("member_id") String memberId, @Param("member_pwd")String memberPwd);
}
