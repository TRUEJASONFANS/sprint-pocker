import pathToRegexp from 'path-to-regexp';
import * as pockerService from '@/pages/pockerRoom/services/pockerService';
import { number, string } from 'prop-types';
export default {
  namespace: 'pockerBoard',
  state: {
    scoreList: [],
    roomName: '',
    resetFlag: false,
    curPage: 1,
    totalPage: 1,
    playerName: '',
    featureName: '',
    internalTaskName: '',
    roomOwner: '',
    finalScores: []
  },
  reducers: {

    syncRoomName(state, { payload: { roomName } }) {
      return {...state, roomName }
    },
    
    syncPage(state, { payload: { curPage, totalPage, resetFlag, scoreList, playerName,
      featureName, internalTaskName, roomOwner, finalScores } }) {
      return {
        ...state, curPage, totalPage, resetFlag, scoreList, playerName,
        featureName, internalTaskName, roomOwner, finalScores
      }
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
    *onNextGame({ payload: values }, { call }) {
      yield call(pockerService.onNextGame(values));
    },
    *AddStory({ payload: values }, { call }) {
      yield call(pockerService.addStory(values));
    },
    *onNavigateToPage({ payload: values }, { call }) {
      yield call(pockerService.onNavigateToPage(values));
    },
    *OnSelectCandidate({ payload: values}, {call}) {
      yield call(pockerService.OnSelectCandidate(values));
    }
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
                scoreList: parseJson.playerScoreList,
                playerName: parseJson.playerName,
                featureName: parseJson.featureName,
                internalTaskName: parseJson.internalTaskName,
                roomOwner: parseJson.owner,
                finalScores: parseJson.finalScores,
              }
            });
          }, roomId, 1);
        }
      });
    },
  },
};
