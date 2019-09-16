import pathToRegexp from 'path-to-regexp';
import * as pockerService from '@/pages/pockerRoom/services/pockerService';
import { number } from 'prop-types';
export default {
  namespace: 'pockerBoard',
  state: {
    scoreList: [],
    roomName: '',
    resetFlag: false,
    curpage: number,
    totalPage: number
  },
  reducers: {
    syncStoryPoint(state, { payload: { scoreList } }) {
      return { ...state, scoreList }
    },
    syncRoomName(state, { payload: { roomName } }) {
      return { ...state, roomName }
    },
    syncResetflag(state, {payload: {resetFlag}}) {
      return {...state, resetFlag}
    }
  },
  effects: {
    *queryStoryPoints({ payload: roomName }, { call }) {
      yield call(pockerService, roomName);
    },
    *onClickPocker({ payload: values }, { call, put }) {
      yield call(pockerService.onClickPocker, values)
    },
    *addTicketRecord({payload:values}, {call}){
      yield call(pockerService.addTikcetRecord(values));
    },
    *onNextGame({ payload: roomName }, { call }) {
      yield call(pockerService.onNextGame(roomName));
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
            dispatch({
              type: 'syncResetflag',
              payload: {
                resetFlag: JSON.parse(data.body).reset
              }
            });
            dispatch({
              type: 'syncStoryPoint',
              payload: {
                scoreList: JSON.parse(data.body).playerScoreList,
              }
            })
          }, roomId, 1);
        }
      });
    },
  },
};
