package org.zhxie.sprintpoker.entity.game;

import com.google.common.base.Strings;
import com.google.common.collect.Lists;
import lombok.Data;
import org.zhxie.sprintpoker.entity.Player;
import org.zhxie.sprintpoker.entity.dto.FinalResultDTO;
import org.zhxie.sprintpoker.entity.dto.PageableDTO;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Data
public class RoomGameRecord {

  private List<SingleGameRecord> recordList = Lists.newArrayList(new SingleGameRecord());

  public int getTotalGameRecord() {
    return recordList.size();
  }

  public void addSingleGameRecord() {
    recordList.add(new SingleGameRecord());
  }

  public SingleGameRecord getCurPage(int selectedGameIndex) {
    if (selectedGameIndex <=0 || selectedGameIndex > recordList.size()) {
      throw new UnsupportedOperationException("Error Index:" + selectedGameIndex);
    }
    return recordList.get(selectedGameIndex - 1);
  }


  public void removePlayer(String exitUserId) {
    for(SingleGameRecord record : recordList) {
      record.removeScoreRecord(exitUserId);
    }
  }

  public void resetPage(int selectedGameIndex) {
    if (selectedGameIndex <0 || selectedGameIndex > recordList.size()) {
      throw new UnsupportedOperationException("Error Index");
    }
    SingleGameRecord newOne = new SingleGameRecord();
    SingleGameRecord former = recordList.set(selectedGameIndex - 1, newOne);
    if (former != null) {
      newOne.setFeatureName(former.getFeatureName());
      newOne.setInternalTaskTitle(former.getInternalTaskTitle());
      newOne.setRoomNum(former.getRoomNum());
      newOne.setFinalGameRecord("");
    }
  }

  public void addScoreRecord(String playerName, String roomName) {
    for (SingleGameRecord record : recordList) {
      record.addScoreRecord(playerName, roomName);
    }
  }

  public void addStory(Set<Player> players, String roomName, PageableDTO dto) {
    SingleGameRecord newOne =  new SingleGameRecord();
    for (Player p : players) {
      newOne.addScoreRecord(p.getName(), roomName);
    }
    newOne.setFeatureName(dto.getTitle());
    newOne.setInternalTaskTitle(dto.getTaskTitle());
    recordList.add(newOne);
  }

  public List<FinalResultDTO> getFinalScores() {
    return recordList.stream().filter(s -> !Strings.isNullOrEmpty(s.getFinalGameRecord()))
            .map(record -> new FinalResultDTO(record.getInternalTaskTitle(), record.getFinalGameRecord()))
            .collect(Collectors.toList());
  }

}
