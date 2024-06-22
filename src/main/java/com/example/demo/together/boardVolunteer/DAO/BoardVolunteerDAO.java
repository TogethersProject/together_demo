package com.example.demo.together.boardVolunteer.DAO;

import com.example.demo.together.boardVolunteer.bean.BoardVolunteerDTO;
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
public interface BoardVolunteerDAO extends JpaRepository<BoardVolunteerDTO, BigInteger> {

//    @Query("SELECT boardDTO.content FROM BoardDTO boardDTO WHERE boardDTO.seq = :seq")
//    String findContentBySeq(@Param("seq") BigInteger seq);

    //글 수정
    @Modifying
    @Query("UPDATE BoardVolunteerDTO boardDTO SET boardDTO.title = :title, " +
            "                            boardDTO.content = :content, " +
            "                            boardDTO.board_lastTime = :boardTimePresent, " +
            "                            boardDTO.thumnail = :thumnail,"+
            "                            boardDTO.volun_date = :volun_date,"+
            "                            boardDTO.volun_address = :address,"+
            "                            boardDTO.volun_institution = :institution"+
            "                        WHERE boardDTO.seq = :seq")
    void updateBySeq(@Param("seq")int seq, @Param("title")String title, @Param("content")String content, @Param("boardTimePresent") Timestamp boardTimePresent, @Param("thumnail")String thumnail,@Param("volun_date")String volun_date, @Param("address")String address, @Param("institution")String institution);
}
