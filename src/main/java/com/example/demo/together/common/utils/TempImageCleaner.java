package com.example.demo.together.common.utils;

import com.example.demo.together.common.utils.board.ObjectStorageService;

import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.text.SimpleDateFormat;
import java.util.Calendar;

//주기적으로 temp 폴더 내 이미지를 지우겠습니다.
@Component
public class TempImageCleaner {
    private final ObjectStorageService objectStorageService;
    private final String tempVolunteerPath = "volunteer/temp/";
    private final String tempMentorPath = "mentor/temp/";

    public TempImageCleaner(ObjectStorageService objectStorageService) {
        this.objectStorageService = objectStorageService;
    }

    @Scheduled(fixedRate = 3600000) // 1시간마다 실행
    public void cleanTempImages() {
        //오늘 날짜 기준, 2일 전의 날짜를 String yyyyMMdd로 저장
        // 2일 전의 날짜를 yyyyMMdd 형식으로 계산
        Calendar calendar = Calendar.getInstance();
        calendar.add(Calendar.DATE, -2); // 2일 전으로 설정
        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyyMMdd");
        String cutoffDate = dateFormat.format(calendar.getTime());

        // 2일 이전에 생성된 폴더 삭제
        objectStorageService.deleteDirectory(tempVolunteerPath+cutoffDate);
        objectStorageService.deleteDirectory(tempMentorPath+cutoffDate);
    }
}

