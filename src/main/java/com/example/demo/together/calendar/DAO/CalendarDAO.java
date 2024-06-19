package com.example.demo.together.calendar.DAO;

import com.example.demo.together.calendar.bean.User_calendarDTO;
import org.apache.ibatis.annotations.Param;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;
import java.util.List;

@Repository
@Transactional(readOnly = false)
public interface CalendarDAO extends JpaRepository<User_calendarDTO, Integer> {

    //@Query("SELECT c FROM User_calendarDTO c WHERE c.calendar_memberId = :memberId AND FUNCTION('MONTH', c.calendar_start) = :month AND FUNCTION('YEAR', c.calendar_start) = :year")
    @Query("SELECT c FROM User_calendarDTO c WHERE c.calendar_memberId = :memberId AND c.start < :endDate AND c.start >= :startDate")
    List<User_calendarDTO> findByMonthAndMemberId(@Param("startDate") Date startDate, @Param("endDate") Date endDate, @Param("memberId") String memberId);

    @Modifying
    @Query("UPDATE User_calendarDTO c SET c.start = :start, c.end = :end, c.title = :title, c.content = :content, c.backgroundColor = :backgroundColor, c.borderColor = :backgroundColor, c.allDay = :allDay WHERE c.calendar_id = :calendarId")
    void updateCalendar(@Param("calendarId") int calendarId, @Param("start")Date start, @Param("end")Date end, @Param("title")String title, @Param("content")String content, @Param("backgroundColor")String backgroundColor, @Param("allDay")boolean allDay);
}
