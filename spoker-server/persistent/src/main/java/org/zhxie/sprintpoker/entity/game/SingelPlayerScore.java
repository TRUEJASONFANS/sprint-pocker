package org.zhxie.sprintpoker.entity.game;


import lombok.Data;

@Data
public  class SingelPlayerScore {
  private String fibonacciNum = "?";
  private boolean clicked = false;
  private String playerName;
  private String roomName;
  private boolean shown;
}
