<<<<<<<< HEAD:src/main/java/com/example/demo/together/common/conf/JwtConfiguration.java
package com.example.demo.together.common.conf;
========
package com.example.demo.together.common.utils.jwt.bean;
>>>>>>>> c876f3d9032582c0e225ea346c52713414c7d090:src/main/java/com/example/demo/together/common/utils/jwt/bean/JwtConfiguration.java

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

@Data
@Component
@ConfigurationProperties("com.security.jwt")
public class JwtConfiguration {
    //인코딩 된 시크릿 키
    private String secretKey;
}
