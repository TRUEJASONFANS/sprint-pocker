import pathToRegexp from 'path-to-regexp';
import * as pockerService from '@/pages/pockerRoom/services/pockerService';
import { number } from 'prop-types';
export default {
  namespace: 'pockerBoard',
  state: {
    scoreList: [],
    roomName: '',
    resetFlag: false,
    curPage: number,
    totalPage: number
  },
  reducers: {
    syncStoryPoint(state, { payload: { scoreList} }) {
      return {...state, scoreList }
    },
    syncRoomName(state, { payload: { roomName } }) {
      return {...state, roomName }
    },
    syncResetflag(state, {payload: {resetFlag}}) {
      return {...state, resetFlag}
    },
    syncCurPage(state, {payload: {curPage}}) {
      return {...state, curPage}
    },
    syncTotalPage(state, {payload: {totalPage}}) {
      return {...state, totalPage}
    }
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
            let paseJson = JSON.parse(data.body);
            dispatch({
              type: 'syncResetflag',
              payload: {
                resetFlag: paseJson.reset
              }
            });
            dispatch({
              type: 'syncResetflag',
              payload: {
                resetFlag: paseJson.reset
              }
            });
            dispatch({
              type: 'syncCurPage',
              payload: {
                curPage: paseJson.curNum
              }
            });
            dispatch({
              type: 'syncTotalPage',
              payload: {
                totalPage: paseJson.totalNum
              }
            });
            dispatch({
              type: 'syncStoryPoint',
              payload: {
                scoreList: paseJson.playerScoreList,
              }
            })
          }, roomId, 1);
        }
      });
    },
  },
};
