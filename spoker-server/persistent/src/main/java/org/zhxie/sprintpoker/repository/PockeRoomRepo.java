package org.zhxie.sprintpoker.repository;

import com.google.common.collect.Maps;
import com.google.common.collect.Sets;
import org.zhxie.sprintpoker.entity.Player;

import java.util.Map;
import java.util.Set;

public class PockeRoomRepo {

  public static  final Map<String, Set<Player>> roomToPlayer = Maps.newConcurrentMap();

  public void joinRoom(Player player, String roomId) {
    roomToPlayer.getOrDefault(roomId, Sets.newHashSet()).add(player);
  }

}
