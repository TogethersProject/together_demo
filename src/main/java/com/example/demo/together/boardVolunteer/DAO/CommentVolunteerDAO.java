package com.example.demo.together.boardVolunteer.DAO;

import com.example.demo.together.boardVolunteer.bean.CommentVolunteerDTO;
import org.apache.ibatis.annotations.Param;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigInteger;

@Transactional(readOnly = false)
@Repository
public interface CommentVolunteerDAO extends JpaRepository<CommentVolunteerDTO, BigInteger> {

    @Modifying
    @Query("UPDATE CommentVolunteerDTO c SET c.content = :content, c.isGoodVolun = :isGoodVolun WHERE c.member_id = :member_id")
    void updateById(@Param("content") String content, @Param("isGoodVolun")boolean isGoodVolun, @Param("member_id")String member_id);

    Page<CommentVolunteerDTO> findByBoardSeq(Pageable pageable, BigInteger boardSeq);
}
