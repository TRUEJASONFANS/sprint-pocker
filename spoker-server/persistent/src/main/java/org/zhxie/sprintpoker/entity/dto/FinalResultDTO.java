package org.zhxie.sprintpoker.entity.dto;

import lombok.Data;

@Data
public class FinalResultDTO {
  private String internalTaskTitle;
  private String finalScore;

  public FinalResultDTO(String internalTaskTitle, String finalScore) {
    this.internalTaskTitle = internalTaskTitle;
    this.finalScore = finalScore;
  }

}
