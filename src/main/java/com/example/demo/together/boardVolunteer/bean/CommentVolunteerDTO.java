package com.example.demo.together.boardVolunteer.bean;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.util.Date;

@Entity
@Table( name = "comment_v" )
@Data
@ToString
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class CommentVolunteerDTO {
    //댓글 식별 id
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="comment_id")
    private int commentSeq;

    //댓글이 달린 글 번호. board 테이블과 연결 fk
    @Column(name="board_id", nullable=false)
    private int boardSeq;

    //댓글 작성자 아이디이자 member 테이블과 연결하는 fk
    @Column(
            name = "member_id",
            nullable = false
    )
    private String member_id;

    //댓글 내용
    @Column(
            name = "comment_content",
            nullable = false
            ,length = 1000
    )
    private String content;

    //현재날짜와 시간을 자동으로 담음. 배포 후 시간을 확인할 것!!
    @Column(nullable = false)
    private Date comment_time;
    @PrePersist
    protected void onCreate() { comment_time = new Date();
    }

    //해당 봉사 활동 추천 여부
    @Column(nullable = false)
    private boolean isGoodVolun;

}
