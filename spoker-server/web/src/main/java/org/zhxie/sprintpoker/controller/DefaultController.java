package org.zhxie.sprintpoker.controller;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

@Controller
public class DefaultController {

  @ResponseStatus(value= HttpStatus.NOT_FOUND)
  @RequestMapping(value = "/404", method = RequestMethod.GET)
  public String handleNotFound() {
    return "index";
  }
}