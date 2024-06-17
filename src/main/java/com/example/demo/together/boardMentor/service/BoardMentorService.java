package com.example.demo.together.boardMentor.service;

import com.example.demo.together.boardMentor.bean.BoardMentorDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.multipart.MultipartFile;

import java.math.BigInteger;
import java.util.List;
import java.util.Map;

public interface BoardMentorService {
    void writeBoard(BoardMentorDTO boardDTO);

    Page<BoardMentorDTO> getWriteList(Pageable pageable);

    Map<String, Object> uploadImageToTemp(MultipartFile multipartFile) throws Exception;

    String deleteBoard(BigInteger seq, String member_id);

    void writeImageToTest(String content, String boardTime);

    Map<String, Object> getUpdateBoard(BigInteger seqInt, String member_id);

    void updateBoard(List<String> imageNamesBefore, BoardMentorDTO boardDTO);
}
