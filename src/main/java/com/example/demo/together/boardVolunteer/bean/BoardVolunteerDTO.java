package com.example.demo.together.boardVolunteer.bean;

import jakarta.persistence.*;
import lombok.*;

import java.util.Date;

//@EnableJpaRepositories
@Entity
@Table( name = "volunteer" )
@Data
@ToString
//이 dto 클래스와 이 dto 클래스를 상속 받은 클래스에서만 접근이 가능함.
@NoArgsConstructor(access = AccessLevel.PROTECTED)
//게시글 테이블
public class BoardVolunteerDTO {
    //글 번호이자 테이블의 pk
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="board_id")
    private int seq;

    //글 작성자 이름
    @Column(
            name = "member_name",
            nullable = false,
            length = 30
    )
    private String name;

    //글 작성자 아이디이자 member 테이블과 연결하는 fk
    @Column(
            name = "member_id",
            nullable = false
    )
    private String id;

    @Column(name = "member_email")
    private String email;

    //글 제목
    @Column(
            name = "board_title",
            nullable = false,
            length = 50
    )
    private String title;

    //글 내용
    @Column(
            name = "board_content",
            nullable = false
            ,length = 1000
    )
    private String content;

    //현재날짜와 시간을 자동으로 담음. 배포 후 시간을 확인할 것!!
    @Column(nullable = false)
    private Date board_time;
    @PrePersist
    protected void onCreate() {
        board_time = new Date();
    }

    //해시태그 타입 리스트로 받아야?
    @Column(name="hashtag_id")
    private String hashtag_id;
    
    //마지막 수정 시간. 이미지는 가장 마지막으로 저장된 날짜 폴더에 저장되어 있기 때문.
    @Column(name="board_lastTime")
    private Date board_lastTime;

    //봉사 위치. 지도 api + 상세 위치
    @Column(name="volun_address"
            ,nullable=false)
    private String volun_address;
    
    //봉사 기관. 지도위치, 홈페이지, 전화번호, 이메일 등 형식 자유
    @Column(name="volun_institution"
            ,nullable= false)
    private String volun_institution;

    @Column(name="thumnail")
    private String thumnail;

    @Column(name="volun_date"
        ,nullable=false)
    private String volun_date;


}
