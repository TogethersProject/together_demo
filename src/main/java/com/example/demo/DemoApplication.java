package com.example.demo;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.data.redis.repository.configuration.EnableRedisRepositories;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.stereotype.Repository;


@MapperScan(basePackages = "com/example/demo/mapper")//@MapperScan(basePackages = "com.example.demo.mapper")
@SpringBootApplication
@ComponentScan(
        basePackages = {"com.together.board.*"
                        ,"com.together.common.conf" // naver.properties set (objectStorage)
                        ,"com.together.common.utils.*" // 암호화, 임시 폴더 자동 삭제
                        ,"com.together.member.*"
        }
)
@EnableRedisRepositories("com.together.common.utils.jwt.repository")
@EnableJpaRepositories({"com.together.board.DAO"
        ,"com.together.member.DAO"})
@EntityScan({"com.together.board.bean"
        ,"com.together.member.bean"})

@EnableScheduling   //일정 시간이 지나면 임시 이미지 저장 폴더 자동 삭제를 위함
//@EnableAutoConfiguration(exclude={DataSourceAutoConfiguration.class})
public class DemoApplication {

    public static void main(String[] args) {
        SpringApplication.run(DemoApplication.class, args);
        // 123123
    }
}
