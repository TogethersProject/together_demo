package com.example.demo.together.boardVolunteer.controller;

import com.example.demo.together.boardVolunteer.bean.CommentVolunteerDTO;
import com.example.demo.together.boardVolunteer.service.CommentVolunteerService;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.*;

import java.math.BigInteger;

@CrossOrigin()
@RestController
@RequestMapping(
        path = {"comment"}
)
@RequiredArgsConstructor
public class CommentVolunteerController {
    private static final Logger log = LoggerFactory.getLogger(CommentVolunteerController.class);
    @Autowired
    private CommentVolunteerService commentService;

    //댓글작성
    @Secured("ROLE_USER")
    @PostMapping(path={"writeComment"})
    public void writeComment(@RequestBody CommentVolunteerDTO commentDTO){
        log.info("DTO: " + commentDTO);
        commentService.writeComment(commentDTO);
    }

    //특정 글에 달린 댓글들 출력
    @GetMapping(path = {"getCommentList"})
    public Page<CommentVolunteerDTO> getCommentList(@PageableDefault(page=0, size=5, sort={"comment_seq"}, direction = Sort.Direction.DESC)Pageable pageable, @RequestBody String board_seq){
        BigInteger boardSeq = new BigInteger(board_seq.split("=")[0]);
        log.info("pageable: " + pageable);
        log.info("board_seq: " + boardSeq);
        Page<CommentVolunteerDTO> list = commentService.getCommentList(pageable, boardSeq);
        System.out.println("Comment List: " + list);
        return list;
    }

    //특정 댓글 1개 전달
    @Secured("ROLE_USER")
    @GetMapping(path={"getOneComment"})
    public CommentVolunteerDTO getOneComment(@RequestBody String comment_seq){
        log.info("comment_id: " + comment_seq);
        BigInteger seqInt = new BigInteger(comment_seq.split("=")[0]);
        return commentService.getOneComment(seqInt);
    }

    //댓글수정
    @Secured("ROLE_USER")
    @PostMapping(path={"updateComment"})
    public void updateComment(@RequestBody CommentVolunteerDTO commentDTO){
        log.info("DTO: " + commentDTO);
        commentService.updateComment(commentDTO);
    }

    //댓글삭제
    @Secured("ROLE_USER")
    @PostMapping(path={"deleteComment"})
    public void delete(@RequestBody String comment_seq){
        BigInteger seqInt = new BigInteger(comment_seq);
        commentService.deleteComment(seqInt);
    }

}
