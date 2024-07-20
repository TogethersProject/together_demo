package com.example.demo.together.boardMentor.DAO;

import com.example.demo.together.boardMentor.bean.BoardMentorDTO;
import com.example.demo.together.search.bean.SearchResultDTO;
import org.apache.ibatis.annotations.Param;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigInteger;
import java.sql.Timestamp;
import java.util.List;

@Transactional(readOnly = false)
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

    @Query("SELECT new com.example.demo.together.search.bean.SearchResultDTO(b.seq, b.title, b.content, b.id, 'mentor') from BoardMentorDTO  b WHERE b.id LIKE %:query%")
    List<SearchResultDTO> findByMemberId(String query);

    @Query("SELECT new com.example.demo.together.search.bean.SearchResultDTO(b.seq, b.title, b.content, b.id, 'mentor') from BoardMentorDTO  b WHERE b.content LIKE %:query%")
    List<SearchResultDTO> findByContent(String query);

    @Query("SELECT new com.example.demo.together.search.bean.SearchResultDTO(b.seq, b.title, b.content, b.id, 'mentor') from BoardMentorDTO  b WHERE b.title LIKE %:query%")
    List<SearchResultDTO> findByTitle(String query);
}
