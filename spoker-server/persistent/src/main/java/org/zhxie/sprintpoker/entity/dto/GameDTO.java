package org.zhxie.sprintpoker.entity.dto;

import lombok.Data;
import org.zhxie.sprintpoker.entity.game.SingleGameRecord;

import java.util.List;

@Data
public class GameDTO {
    private List<SingleGameRecord.SingelPlayerScore> playerScoreList;
    private boolean shown;
    private String roomName;
    private boolean reset = false;
    private int curNum;
    private int totalNum;
    private String clickedNum;
    private String featureName;
    private String internalTaskName;
    private String owner;
    private List<FinalResultDTO> finalScores;
}
