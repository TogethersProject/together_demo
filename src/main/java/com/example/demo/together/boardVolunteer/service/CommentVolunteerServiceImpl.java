package com.example.demo.together.boardVolunteer.service;

import com.example.demo.together.boardVolunteer.DAO.BoardVolunteerDAO;
import com.example.demo.together.boardVolunteer.DAO.CommentVolunteerDAO;
import com.example.demo.together.boardVolunteer.bean.CommentVolunteerDTO;
import com.example.demo.together.member.DAO.MemberDAO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.math.BigInteger;
import java.util.Optional;

@Service
public class CommentVolunteerServiceImpl implements CommentVolunteerService{
    @Autowired
    private BoardVolunteerDAO boardDAO;
    @Autowired
    private CommentVolunteerDAO commentDAO;
    @Autowired
    private MemberDAO memberDAO;

    @Override
    public String writeComment(CommentVolunteerDTO commentDTO) {
        Optional<CommentVolunteerDTO> commentVolunteerDTO=commentDAO.findByMember_idANDCommentSeq(commentDTO.getMember_id(), commentDTO.getBoardSeq());
        if(commentVolunteerDTO.isEmpty()){
            commentDAO.save(commentDTO);
            return "댓글을 작성했습니다.";
        }else{
            return "이미 댓글을 작성하셨습니다.";
        }
    }

    @Override
    public CommentVolunteerDTO getOneComment(BigInteger seqInt) {
        Optional<CommentVolunteerDTO> commentVolunteerDTO = commentDAO.findById(seqInt);
        return commentVolunteerDTO.orElse(null);
    }

    @Override
    public Page<CommentVolunteerDTO> getCommentList(Pageable pageable, BigInteger boardSeq) {
        //Page<CommentVolunteerDTO> list = commentDAO.findAll(pageable);
        Page<CommentVolunteerDTO> list = commentDAO.findByBoardSeq(pageable, boardSeq);//확인 필요
        return list;
    }

    @Override
    public void updateComment(CommentVolunteerDTO commentDTO) {
        String content = commentDTO.getContent();
        boolean isGoodVolun = commentDTO.isGoodVolun();
        String member_id = commentDTO.getMember_id();
        commentDAO.updateById(content, isGoodVolun, member_id);//작동확인필요
    }

    @Override
    public void deleteComment(BigInteger seqInt) {
        commentDAO.deleteById(seqInt);
    }
}
