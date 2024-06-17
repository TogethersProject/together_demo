<<<<<<<< HEAD:src/main/java/com/example/demo/together/boardMentor/DAO/BoardMentorDAO.java
package com.example.demo.together.boardMentor.DAO;

import com.example.demo.together.boardMentor.bean.BoardMentorDTO;
========
package com.example.demo.together.board.DAO;

import com.example.demo.together.board.bean.BoardDTO;
>>>>>>>> c876f3d9032582c0e225ea346c52713414c7d090:src/main/java/com/example/demo/together/board/DAO/BoardDAO.java
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
