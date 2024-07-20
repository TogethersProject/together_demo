package com.example.demo.together.common.conf;

import lombok.Getter;
import lombok.Setter;
import lombok.Value;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.JavaMailSenderImpl;

import java.util.Properties;

@Configuration
@Getter
@Setter
@ConfigurationProperties("email.naver")

public class MailCofig {
    private String emailAddress;
    private String emailPwd;

    @Bean
    public JavaMailSender javaMailService(){
        JavaMailSenderImpl javaMailSender = new JavaMailSenderImpl();
        System.out.println("자바메일 서비스config: " + emailAddress + " / " + emailPwd);
        // smtp 서버명
        javaMailSender.setHost("smtp.naver.com");
        // 발송 이메일 주소
        javaMailSender.setUsername(emailAddress);
        // 발송 이메일 계정 비밀번호
        javaMailSender.setPassword(emailPwd);

        // 네이버 메일 환경설정과 동일하게.
        javaMailSender.setPort(465);
        javaMailSender.setJavaMailProperties(getMailProperties());

        return javaMailSender;
    }

    private Properties getMailProperties(){
        Properties properties = new Properties();
        properties.setProperty("mail.transport.protocol", "smtp");
        //서버인증 필요
        properties.setProperty("mail.smtp.auth", "true");
        // STARTTLS 보안 연결을 사용
        properties.setProperty("mail.smtp.starttls.enable", "true");
        properties.setProperty("mail.debug", "true");
        // 신뢰할 수 있는 smtp 서버 호스트 이름 지정
        properties.setProperty("mail.smtp.ssl.trust","smtp.naver.com");
        // ssl/tls 보안 연결 사용
        properties.setProperty("mail.smtp.ssl.enable","true");
        return properties;
    }
}
