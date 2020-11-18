package org.zhxie.sprintpoker;

import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.zhxie.sprintpoker.entity.User;
import org.zhxie.sprintpoker.entity.dto.UserDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.test.context.junit4.SpringRunner;
import org.zhxie.sprintpoker.service.UserService;

/**
 * Created by jianyang on 2019/1/7.
 */

@RunWith(SpringRunner.class)
@SpringBootTest
public class UserServiceTest {
    @Autowired
    private UserService userService;
    private BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

    @Test
    public void testSave() {
        UserDTO user = new UserDTO();
        user.setUserName("jianyang");
        user.setPassword("123");
        if (userService.findByUserName("jianyang") == null) {
            User savedUser = userService.save(user);
            Assert.assertEquals(user.getUserName(), savedUser.getName());
        }
    }

    @Test
    public void testFindByUserName() {
        User user = userService.findByUserName("jianyang");
        Assert.assertTrue(encoder.matches("123",user.getPassword()));
    }

//    @Test
//    public void testFindByUserNameAndPassword() {
//        User user = userService.findByUserNameAndPassword("jianyang", "123");
//        Assert.assertTrue(encoder.matches("123", user.getPassword()));
//    }
}
