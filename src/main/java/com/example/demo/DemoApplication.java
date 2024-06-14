package com.example.demo;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.scheduling.annotation.EnableScheduling;


@MapperScan(basePackages = "com.example.demo.mapper")
@SpringBootApplication
@ComponentScan(
        basePackages = {"com.example.demo.together.board.*"
                        ,"com.example.demo.together.common.conf" // naver.properties set (objectStorage)
                        ,"com.example.demo.together.common.utils" // 암호화, 임시 폴더 자동 삭제
                        ,"com.example.demo.together.member.*"
        }
)
@EnableJpaRepositories({"com.example.demo.together.board.DAO"
        ,"com.example.demo.together.member.DAO"})
@EntityScan({"com.example.demo.together.board.bean"
        ,"com.example.demo.together.member.bean"})
@EnableScheduling   //일정 시간이 지나면 임시 이미지 저장 폴더 자동 삭제를 위함
//@EnableAutoConfiguration(exclude={DataSourceAutoConfiguration.class})
public class DemoApplication {

    public static void main(String[] args) {
        SpringApplication.run(DemoApplication.class, args);
        // 123123
    }
}
