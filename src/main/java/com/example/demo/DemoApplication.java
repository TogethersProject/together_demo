package com.example.demo;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.data.redis.repository.configuration.EnableRedisRepositories;
import org.springframework.scheduling.annotation.EnableScheduling;


@MapperScan(basePackages = "com.example.demo.mapper")
@SpringBootApplication
@ComponentScan(
        basePackages = {"com.example.demo.together.boardMentor.*"
                        ,"com.example.demo.together.boardVolunteer.*"
                        ,"com.example.demo.together.calendar.*"
                        ,"com.example.demo.together.common.conf" // naver.properties set (objectStorage)
                        ,"com.example.demo.together.common.utils.*" // 암호화, 임시 폴더 자동 삭제
                        ,"com.example.demo.together.member.*"
                        ,"com.example.demo.together.search.*"
        }
)
@EnableRedisRepositories("com.example.demo.together.common.utils.jwt.repository")
@EnableJpaRepositories({"com.example.demo.together.boardMentor.DAO"
        ,"com.example.demo.together.boardVolunteer.DAO"
        ,"com.example.demo.together.member.DAO"
        ,"com.example.demo.together.calendar.DAO"})
@EntityScan({"com.example.demo.together.boardMentor.bean"
        ,"com.example.demo.together.boardVolunteer.bean"
        ,"com.example.demo.together.member.bean"
        ,"com.example.demo.together.calendar.bean"})
@EnableScheduling   //일정 시간이 지나면 임시 이미지 저장 폴더 자동 삭제를 위함
//@EnableAutoConfiguration(exclude={DataSourceAutoConfiguration.class})
public class DemoApplication {

    public static void main(String[] args) {
        SpringApplication.run(DemoApplication.class, args);
        // 123123
    }
}
