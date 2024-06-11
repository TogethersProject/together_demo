package com.together.common.conf;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;

import lombok.Getter;
import lombok.Setter;

@Configuration
@PropertySource("classpath:/naver.properties")
@ConfigurationProperties(prefix = "ncp")
@Getter
@Setter
public class NaverConfiguration {
	 private String accessKey;//ncp.accessKey
	 private String secretKey;
	 private String regionName;
	 private String endPoint;
}
