package org.zhxie.sprintpoker;

import io.jsonwebtoken.Claims;
import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;
import org.zhxie.sprintpoker.util.JwtUtil;

/**
 * Created by jianyang on 1/10/2019.
 */
@RunWith(SpringRunner.class)
@SpringBootTest
public class JwtUtilTest {

    public static String TOKEN = "eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiIxIiwic3ViIjoiamlhbnlhbmciLCJpYXQiOjE1NDcwODU2NDAsInJvbGVzIjoidXNlciIsImV4cCI6MTg2MjQ0NTY0MH0.wreXE_sGtdJ2O43j9PTiB2zS3fMyX6zyMXEPQgMZ4UY";

    @Test
    public void testCreateJWT() {
        String token = JwtUtil.createJWT("1", "jianyang", "user");
        System.out.println(token);
    }

    @Test
    public void testParseJWT() {
        Claims claims = JwtUtil.parseJWT(TOKEN);
        String id = claims.getId();
        String roles = claims.get("roles", String.class);
        Assert.assertEquals("1", id);
        Assert.assertEquals("user", roles);
    }

}
