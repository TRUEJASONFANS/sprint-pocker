package org.zhxie.sprintpoker.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Lazy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.zhxie.sprintpoker.entity.User;
import org.zhxie.sprintpoker.entity.dto.UserDTO;
import org.zhxie.sprintpoker.repository.UserRepository;

/**
 * Created by jianyang on 1/7/2019.
 */

@Service
public class UserService {
    @Autowired
    private UserRepository userDAO;

    private BCryptPasswordEncoder encoder;

    @Autowired
    public UserService(@Lazy BCryptPasswordEncoder encoder) {
        this.encoder = encoder;
    }


    public User save(UserDTO userDTO) {
        User user = new User();
        user.setName(userDTO.getUserName());
        user.setEmail(userDTO.getEmail());
        String encodePassword = encoder.encode(userDTO.getPassword());
        user.setPassword(encodePassword);
        return userDAO.save(user);
    }

    public User findByUserName(String userName) {
        return userDAO.findByName(userName);
    }

    public User findByUserNameAndPassword(String userName, String password) {
        User user = userDAO.findByName(userName);
        if (user != null && encoder.matches(password, user.getPassword())) {
            return user;
        } else {
            return null;
        }
    }


    @Bean
    public BCryptPasswordEncoder bcryptPasswordEncoder() {
        return new BCryptPasswordEncoder();
    }
}
