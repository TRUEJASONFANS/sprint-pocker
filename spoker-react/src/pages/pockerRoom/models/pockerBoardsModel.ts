import pathToRegexp from 'path-to-regexp';
import * as pockerService from '@/pages/pockerRoom/services/pockerService';
import { number, string } from 'prop-types';
export default {
  namespace: 'pockerBoard',
  state: {
    scoreList: [],
    roomName: '',
    resetFlag: false,
    curPage: number,
    totalPage: number,
    clickedNum: number,
    playerName: string
  },
  reducers: {

    syncRoomName(state, { payload: { roomName } }) {
      return {...state, roomName }
    },
    
    syncPage(state, {payload: {curPage, totalPage, resetFlag, scoreList, playerName, clickedNum}}) {
      return {...state, curPage, totalPage, resetFlag , scoreList, playerName, clickedNum}
    },
    // syncTotalPage(state, {payload: {totalPage}}) {
    //   return {...state, totalPage}
    // }
  },
  effects: {
    *queryStoryPoints({ payload: roomName }, { call }) {
      yield call(pockerService, roomName);
    },
    *onClickPocker({ payload: values }, { call }) {
      yield call(pockerService.onClickPocker, values)
    },
    *addTicketRecord({ payload: values }, { call }) {
      yield call(pockerService.addTikcetRecord(values));
    },
    *onNextGame({ payload: roomName }, { call }) {
      yield call(pockerService.onNextGame(roomName));
    },
    *AddStory({ payload: values }, { call }) {
      yield call(pockerService.addStory(values));
    },
    *onNavigateToPage({ payload: values }, { call }) {
      yield call(pockerService.onNavigateToPage(values));
    },
  },

  subscriptions: {
    init({ dispatch, history }) {
      return history.listen(location => {
        const match = pathToRegexp('/pockerRoom/:id').exec(location.pathname);
        
        if (match) {
          var roomId = location.pathname.substring(location.pathname.lastIndexOf("/") + 1);

          //TODO: verify the backend whether the room is created or not
          // join room
          dispatch({
            type: 'syncRoomName',
            payload: {
              roomName: roomId,
            }
          });
          pockerService.fetch((data) => {
            let parseJson = JSON.parse(data.body);
            dispatch({
              type: 'syncPage',
              payload: {
                curPage: parseJson.curNum,
                totalPage: parseJson.totalNum,
                resetFlag: parseJson.reset,
                clickedNum: parseJson.clickedNum,
                scoreList: parseJson.playerScoreList,
                playerName: parseJson.playerName,
              }
            });
          }, roomId, 1);
        }
      });
    },
  },
};
