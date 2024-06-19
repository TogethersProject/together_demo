package com.example.demo.together.calendar.service;

import com.example.demo.together.calendar.DAO.CalendarDAO;
import com.example.demo.together.calendar.bean.User_calendarDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.text.SimpleDateFormat;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Transactional(readOnly = false)
@Service
public class CalendarServiceImpl implements CalendarService{
    @Autowired
    private CalendarDAO calendarDAO;

    @Override
    public void writeCalendar(User_calendarDTO calendarDTO) {
        System.out.println("서비스 연결 된다");
        System.out.println("배경색이 뭐니: " + calendarDTO.getBackgroundColor());
        if(calendarDTO.getBackgroundColor()==null){
            calendarDTO.setBackgroundColor("pink");
        }
        calendarDTO.setBorderColor(calendarDTO.getBackgroundColor());
        System.out.println("캘린더 저장합니다: "+calendarDTO);
        calendarDAO.save(calendarDTO);
    }

    @Override
    public List<User_calendarDTO> getCalendarList(Date startDate, Date endDate, String memberId) {
        System.out.println("calendarList Service");
        //int year = Integer.parseInt(date.substring(0, 4));
        //int month = Integer.parseInt(date.substring(4, 6));
        List<User_calendarDTO> list = calendarDAO.findByMonthAndMemberId(startDate, endDate, memberId);
        for(User_calendarDTO calendarDTO : list ){
            LocalDateTime adjustedStart = calendarDTO.getStart().toInstant()
                    .atZone(ZoneId.of("UTC")).plusHours(9) // UTC에서 KST(UTC+9)로 조정
                    .toLocalDateTime();
            calendarDTO.setStart(java.sql.Timestamp.valueOf(adjustedStart)); // 조정된 시간을 다시 설정

            if (calendarDTO.getEnd() != null) {
                LocalDateTime adjustedEnd = calendarDTO.getEnd().toInstant()
                        .atZone(ZoneId.of("UTC"))
                        .toLocalDateTime()
                        .plusHours(9); // UTC에서 KST로 조정
                calendarDTO.setEnd(java.sql.Timestamp.valueOf(adjustedEnd));
            }

//            if(calendarDTO.getAllDay()){
//                Date start_date = calendarDTO.getStart();
//                // Date 객체를 'yyyy-MM-dd HH:mm:ss' 형식의 문자열로 포맷
//                SimpleDateFormat sdfFull = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
//                String formattedDateFull = sdfFull.format(start_date);
//                // Date 객체를 'HH:mm' 형식의 문자열로 포맷하여 시간 부분만 추출
//                SimpleDateFormat sdfTime = new SimpleDateFormat("HH:mm");
//                String startTime = sdfTime.format(start_date);
//
//                calendarDTO.setTitle(calendarDTO.getTitle() + ", " + startTime);
//            }
        }
        System.out.println("getCalendarList(Service): " + list);
        return list;
    }

    @Override
    public void updateCalendar(User_calendarDTO userCalendarDTO) {
        System.out.println("update Calendar: "+userCalendarDTO);

        Date start = userCalendarDTO.getStart();
        Date end = userCalendarDTO.getEnd();
        int calendarId = userCalendarDTO.getCalendar_id();
        String title = userCalendarDTO.getTitle();
        String content = userCalendarDTO.getContent();
        String backgroundColor = userCalendarDTO.getBackgroundColor();
        boolean allDay = userCalendarDTO.getAllDay();
        //String memberId = userCalendarDTO.getCalendar_memberId();
        calendarDAO.updateCalendar(calendarId, start, end, title, content, backgroundColor, allDay);
    }

    @Override
    public Optional<User_calendarDTO> getOneCalendar(Integer id) {
        System.out.println("getOneCalendar Service: ");
        System.out.println(calendarDAO);

        Optional<User_calendarDTO> userDTO = calendarDAO.findById(id);
        if (userDTO.isEmpty()) {
            System.out.println("캘린더 데이터가 없습니다.");
            return Optional.empty();
        }
        System.out.println(userDTO);
        return userDTO;
    }

    @Override
    public void deleteCalendar(Integer memberId) {
        System.out.println("delete Calendar Service");
        calendarDAO.deleteById(memberId);
    }
}
