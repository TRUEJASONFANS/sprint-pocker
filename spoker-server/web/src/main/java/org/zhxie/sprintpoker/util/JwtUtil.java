package org.zhxie.sprintpoker.util;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtBuilder;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

import java.util.Date;

/**
 * Created by jianyang on 2019/1/9.
 */

//@ConfigurationProperties("jwt.config")
@Component
public class JwtUtil {
    private static String  key = "1234"; //密钥
    private static long ttl = 1000 * 60 * 60 * 24;   //过期时间 1day

    public String getKey() {
        return key;
    }

    public void setKey(String key) {
        JwtUtil.key = key;
    }

    public long getTtl() {
        return ttl;
    }

    public void setTtl(long ttl) {
        JwtUtil.ttl = ttl;
    }

    /**
     * 生成token
     * @param id id
     * @param subject subject
     * @param roles 角色
     * @return token string
     */
    public static String createJWT(String id, String subject, String roles) {
        long nowMillis = System.currentTimeMillis();
        Date now = new Date(nowMillis);
        JwtBuilder builder = Jwts.builder().setId(id)
                .setSubject(subject)
                .setIssuedAt(now)
                .signWith(SignatureAlgorithm.HS256, key).claim("roles",
                        roles);
        if (ttl > 0) {
            builder.setExpiration(new Date(nowMillis + ttl));

        }
        return builder.compact();
    }

    /**
     * 解析token
     * @param jwtStr token
     * @return Claims
     */
    public static Claims parseJWT(String jwtStr) {
        return Jwts.parser()
                .setSigningKey(key)
                .parseClaimsJws(jwtStr)
                .getBody();
    }
}