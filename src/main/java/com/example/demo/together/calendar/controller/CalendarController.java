package com.example.demo.together.calendar.controller;

import com.example.demo.together.calendar.bean.GetCalendars;
import com.example.demo.together.calendar.bean.User_calendarDTO;
import com.example.demo.together.calendar.service.CalendarService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@CrossOrigin
@RestController
@RequestMapping(path={"calendar"})
public class CalendarController {
    @Autowired
    private CalendarService calendarService;

    @Secured("ROLE_USER")
    @PostMapping("/writeCalendar")
    public ResponseEntity<String> writeCalendar(@RequestBody User_calendarDTO user_calendarDTO) {
        if (calendarService != null) {
            calendarService.writeCalendar(user_calendarDTO);
            return ResponseEntity.ok("Calendar created successfully");
        } else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error occurred while creating calendar");
        }

    }

    //이번 달 정보 + 유저이름 -> 이번 달 유저 일정 정보
    @Secured("ROLE_USER")
    @PostMapping(path={"getCalendarList"})
    public List<User_calendarDTO> getCalendarList(@RequestBody GetCalendars getCalendars){

        System.out.println("캘린더 줄게");
        System.out.println(calendarService);
        //System.out.println("calendarList: 이번달은 " + startDateStr +" ~ " + endDateStr + " 이고 나는 " + memberId +"입니다.");//KST: T00:00:00+09:00
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm:ssXXX");
        LocalDateTime startDateTime = LocalDateTime.parse(getCalendars.getStartDate(), formatter);
        LocalDateTime endDateTime = LocalDateTime.parse(getCalendars.getEndDate(), formatter);

        Date startDate = Date.from(startDateTime.atZone(ZoneId.systemDefault()).toInstant());
        Date endDate = Date.from(endDateTime.atZone(ZoneId.systemDefault()).toInstant());
        return calendarService.getCalendarList(startDate, endDate, getCalendars.getMemberId());
    }

    @Secured("ROLE_USER")
    @PostMapping(path = {"updateCalendar"})
    private void updateCalendar(@RequestBody User_calendarDTO userCalendarDTO){
        System.out.println("updateCalendar");

        // start와 end 값 확인
        System.out.println("Start: " + userCalendarDTO.getStart());
        System.out.println("End: " + userCalendarDTO.getEnd());
        System.out.println(userCalendarDTO);
        calendarService.updateCalendar(userCalendarDTO);
    }

    @Secured("ROLE_USER")
    @PostMapping(path={"getOneCalendar"})
    private Optional<User_calendarDTO> getOneCalendar(@RequestBody String calendar_id) {
        //System.out.println(calendar_id);
        Integer id = Integer.parseInt(calendar_id.split("=")[0]);
        System.out.println(id);
        System.out.println(calendarService);
        return calendarService.getOneCalendar(id);
    }

    @Secured("ROLE_USER")
    @PostMapping(path={"deleteCalendar"})
    private void deleteCalendar(@RequestBody String memberId){
        Integer member_id = Integer.parseInt(memberId);
        System.out.println("delete: " + member_id);
        calendarService.deleteCalendar(member_id);
    }

}
