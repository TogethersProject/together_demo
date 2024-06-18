package com.example.demo.together.boardMentor.DAO;

import com.example.demo.together.boardMentor.bean.BoardMentorDTO;
import org.apache.ibatis.annotations.Param;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigInteger;
import java.sql.Timestamp;

@Transactional
@Repository
public interface BoardMentorDAO extends JpaRepository<BoardMentorDTO, BigInteger> {

//    @Query("SELECT boardDTO.content FROM BoardDTO boardDTO WHERE boardDTO.seq = :seq")
//    String findContentBySeq(@Param("seq") BigInteger seq);

    //글 수정
    @Modifying
    @Query("UPDATE BoardMentorDTO boardDTO SET boardDTO.title = :title, " +
            "                            boardDTO.content = :content, " +
            "                            boardDTO.board_lastTime = :boardTimePresent " +
            "                        WHERE boardDTO.seq = :seq")
    void updateBySeq(@Param("seq")int seq, @Param("title")String title, @Param("content")String content, @Param("boardTimePresent") Timestamp boardTimePresent);
}
