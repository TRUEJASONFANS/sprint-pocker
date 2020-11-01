package org.zhxie.sprintpoker.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;
import org.zhxie.sprintpoker.config.WebSocketConfig;
import org.zhxie.sprintpoker.entity.Room;
import org.zhxie.sprintpoker.entity.dto.CandidateDTO;
import org.zhxie.sprintpoker.entity.dto.GameDTO;
import org.zhxie.sprintpoker.entity.dto.PageableDTO;
import org.zhxie.sprintpoker.entity.dto.ResponseResult;
import org.zhxie.sprintpoker.entity.game.SingleGameRecord;
import org.zhxie.sprintpoker.exception.CommandException;
import org.zhxie.sprintpoker.repository.SocketSessionRegistry;
import org.zhxie.sprintpoker.util.CookieUtil;
import org.zhxie.sprintpoker.util.JwtUtil;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.security.Principal;
import java.util.List;
import java.util.Optional;

@Controller
public class RoomController {


  @Autowired
  SocketSessionRegistry webAgentSessionRegistry;

  @Autowired
  private BCryptPasswordEncoder encoder;

  @MessageMapping("/room")
  @SendTo(WebSocketConfig.WEBSOCKET_SERVER_SUBSCRIBER + "/room")
  public List<Room> getRoomList(Principal user) {
    return webAgentSessionRegistry.getRooms();
  }

  @MessageMapping("/room/add")
  @SendTo(WebSocketConfig.WEBSOCKET_SERVER_SUBSCRIBER + "/room")
  public List<Room> addRoom(Room room, Principal user) {
    room.setOwner(user.getName());
    webAgentSessionRegistry.createRoom(room);
    return webAgentSessionRegistry.getRooms();
  }

  @ResponseBody
  @PostMapping("/sprint/api/rooms/{roomName}")
  public ResponseResult checkRoomPassword(@RequestBody Room room,@PathVariable String roomName, HttpServletRequest request, HttpServletResponse response) {
    String roomPassword = CookieUtil.extractCookie(request, "roomPassword_".concat(roomName));
    Optional<Room> findRoom = webAgentSessionRegistry.getRooms().stream().filter(roomItem -> (roomName.equals(roomItem.getName()) && (room.getRoomPassword().equals(roomItem.getRoomPassword()) || roomItem.getRoomPassword().equals(roomPassword)))).findAny();
    if (findRoom.isPresent()) {
      String cookieKey = "roomPassword_".concat(roomName);
      String cookieValue = findRoom.get().getRoomPassword();
      Cookie passwordCookie = new Cookie(cookieKey, cookieValue);
      passwordCookie.setPath("/");
      response.addCookie(passwordCookie);
      return new ResponseResult(ResponseResult.SUCCESS, "房间密码正确");
    } else {
      return new ResponseResult(ResponseResult.FAIL, "房间密码不正确！");
    }
  }

  @ResponseBody
  @PostMapping("/sprint/api/room/token/{roomName}")
  public ResponseResult generateRoomPasswordToken(@RequestBody Room room, HttpServletRequest request) {
    Optional<Room> findRoom = webAgentSessionRegistry.getRooms().stream().filter(roomItem -> (room.getName().equals(roomItem.getName()))).findAny();
    if(findRoom.isPresent()) {
      String token = JwtUtil.createJWT(room.getName(), "roomPassword", "");
      String link = request.getScheme().concat("://"+request.getServerName()+ ":"+request.getServerPort()).concat("/pockerRoom/").concat(room.getName()).concat("?roomToken=").concat(token);
      ResponseResult responseResult = new ResponseResult(ResponseResult.SUCCESS, "生成token 正确");
      responseResult.getData().put("link", link);
      return responseResult;
    } else {
      return new ResponseResult(ResponseResult.FAIL, "生成token 不正确！");
    }
  }

  @MessageMapping("/pokerBoard/{roomName}/joinPokerBoard//{curPage}")
  @SendTo(WebSocketConfig.WEBSOCKET_SERVER_SUBSCRIBER + "/pokerBoard/{roomName}")
  public GameDTO joinPockerBoardByRoomId(Principal user, @DestinationVariable String roomName, @DestinationVariable Integer curPage) throws
          CommandException {
    //TODO: join the room and remember websocket session id
    System.out.println(user.getName());
    if (!webAgentSessionRegistry.isInRoom(roomName, user.getName())) {
      webAgentSessionRegistry.joinRoom(roomName, user.getName());
    }
    return webAgentSessionRegistry.getSingleGameRecord(roomName, curPage, user.getName());
  }

  @MessageMapping("/pokerBoard/{roomName}/clickPoker/{curPage}")
  @SendTo(WebSocketConfig.WEBSOCKET_SERVER_SUBSCRIBER  + "/pokerBoard/{roomName}")
  public GameDTO onClickPocker(Principal user, SingleGameRecord.SingelPlayerScore singelPlayerScore, @DestinationVariable String
          roomName, @DestinationVariable Integer curPage) {
    System.out.println(user.getName());
    singelPlayerScore.setPlayerName(user.getName());
    webAgentSessionRegistry.updateRoomScoreByPlayer(singelPlayerScore, roomName, curPage);
    return webAgentSessionRegistry.getSingleGameRecord(roomName, curPage, user.getName());
  }

  @MessageMapping("/onNextGame/{roomName}/{curPage}")
  @SendTo(WebSocketConfig.WEBSOCKET_SERVER_SUBSCRIBER + "/pokerBoard/{roomName}")
  public GameDTO onNextGame(Principal user, @DestinationVariable String roomName, @DestinationVariable Integer curPage) {
    webAgentSessionRegistry.onNextGame(user.getName(), roomName, curPage);
    final GameDTO singleGameRecord = webAgentSessionRegistry.getSingleGameRecord(roomName, curPage, user.getName());
    singleGameRecord.setReset(true);
    return singleGameRecord;
  }

  @MessageMapping("/pokerBoard/onAddStory/{roomName}")
  @SendTo(WebSocketConfig.WEBSOCKET_SERVER_SUBSCRIBER +  "/pokerBoard/{roomName}")
  public GameDTO onAddStory(Principal user, @RequestBody PageableDTO pagebleDTO) {
    webAgentSessionRegistry.onAddStory(pagebleDTO);
    return webAgentSessionRegistry.getSingleGameRecord(pagebleDTO.getRoomName(), pagebleDTO.getCurPage(), user.getName());
  }

  @MessageMapping("/onNavigateToPage/{roomName}")
  @SendTo(WebSocketConfig.WEBSOCKET_SERVER_SUBSCRIBER + "/pokerBoard/{roomName}")
  public GameDTO onNavigateToPage(Principal user, @RequestBody PageableDTO pagebleDTO) {
    return webAgentSessionRegistry.getSingleGameRecord(pagebleDTO.getRoomName(), pagebleDTO.getCurPage(), user.getName());
  }

  @MessageMapping("/pokerBoard/OnSelectCandidate/{roomName}")
  @SendTo(WebSocketConfig.WEBSOCKET_SERVER_LISTNER + "/pokerBoard/{roomName}")
    public GameDTO onSelectCandidate(Principal user, @RequestBody CandidateDTO candidateDTO) {
    webAgentSessionRegistry.updateRoomFinalScore(candidateDTO, user.getName());
    return webAgentSessionRegistry.getSingleGameRecord(candidateDTO.getRoomName(), candidateDTO.getPageNum(),
            user.getName());
  }
}
