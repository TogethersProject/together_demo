package com.example.demo.together.calendar.bean;


import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.sql.Timestamp;
import java.util.Date;

@Setter
@Getter
@ToString
@Entity
@Table(name="USER_CALENDAR")
public class User_calendarDTO {
    @Id
    @Column(
            name = "calendar_id"
            , nullable = false
    )
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int calendar_id;

    //일정 작성 시간
    @Column(
            name = "calendar_jointime"
            , nullable = false
    )
    private Date calendar_time; //timeStamp

    @PrePersist
    protected void onCreate() {
        calendar_time = new Date();
    }

    @Column(
            name = "calendar_title"
            , nullable = false
            , length = 100
    )
    private String title;

    @Column(
            name = "calendar_content"
            , nullable = false
            , length = 100   //길이 모자를 수도 있음.
    )
    private String content;

    @Column(
            name = "calendar_color"
            , length = 100
    )
    private String backgroundColor;

    @Column(name = "calendar_border")
    private String borderColor;
    //DB와 다름.
    @Column(
            name = "calendar_start"
            , nullable = false
    )
    private Timestamp start;
    //DB는 varcahr(100)
    @Column(
            name = "calendar_end"
    )
    private Timestamp end;

    //외래키. 일정 작성자.
    @Column(
            name = "calendar_memforkey"
            , nullable = false
            , length = 100
    )
    private String calendar_memberId;


    //@ColumnDefault("false")
    @Column(name = "all_day")
    private boolean allDay; // 기본값 설정

    public boolean getAllDay() {
        return this.allDay;
    }
}
