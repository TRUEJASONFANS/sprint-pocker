package org.zhxie.sprintpoker.controller;

import com.google.common.collect.Maps;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.*;
import org.zhxie.sprintpoker.entity.User;
import org.zhxie.sprintpoker.entity.dto.ResponseResult;
import org.zhxie.sprintpoker.entity.dto.UserDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.zhxie.sprintpoker.service.UserService;
import org.zhxie.sprintpoker.util.JwtUtil;

import java.security.Principal;
import java.util.HashMap;
import java.util.Map;

/**
 * Created by jianyang on 2019/1/8.
 */

@Controller
public class UserController {

    @Autowired
    private UserService userService;


    @RequestMapping(value = "/user/regist", method = RequestMethod.POST, produces = "application/json")
    public @ResponseBody ResponseResult regist(@RequestBody UserDTO user) {
        User findUser = userService.findByUserName(user.getUserName());
        if (findUser != null) {
            return new ResponseResult(ResponseResult.REGIST_ERROR, "用户名已经被注册");
        }
        userService.save(user);
        return new ResponseResult(ResponseResult.SUCCESS, "注册成功");
    }

    @RequestMapping("/login*")
    public String login(@RequestParam Map<String, String> allParams, ModelMap map) {
        if (allParams.containsKey("msg")) {
            map.addAttribute("msg", "密码错误或用户名不存在");
        }
        return "login";
    }

    @RequestMapping(value = "/api/users/whoAmI", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public Map whoAmI(Principal user) {
        Map<String, String> nameMap = new HashMap<>();
        nameMap.put("userName", user.getName());
        return nameMap;
    }

}
