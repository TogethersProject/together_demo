package com.together.board.service;

import com.together.board.bean.BoardDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.multipart.MultipartFile;

import java.math.BigInteger;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.Optional;

public interface BoardService {
    void writeBoard(BoardDTO boardDTO);

    Page<BoardDTO> getWriteList(Pageable pageable);

    Map<String, Object> uploadImageToTemp(MultipartFile multipartFile) throws Exception;

    String deleteBoard(BigInteger seq, String member_id);

    void writeImageToTest(String content, String boardTime);

    Map<String, Object> getUpdateBoard(BigInteger seqInt, String member_id);

    void updateBoard(List<String> imageNamesBefore, BoardDTO boardDTO);
}
