package com.example.demo.together.boardVolunteer.service;

import com.example.demo.together.boardVolunteer.bean.CommentVolunteerDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.math.BigInteger;

public interface CommentVolunteerService {
    void writeComment(CommentVolunteerDTO commentDTO);

    CommentVolunteerDTO getOneComment(BigInteger seqInt);

    Page<CommentVolunteerDTO> getCommentList(Pageable pageable, BigInteger boardSeq);

    void updateComment(CommentVolunteerDTO commentDTO);

    void deleteComment(BigInteger seqInt);
}
