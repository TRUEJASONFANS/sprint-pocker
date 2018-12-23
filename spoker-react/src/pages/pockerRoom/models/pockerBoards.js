import pathToRegexp from 'path-to-regexp';
import * as pockerService from '../services/pockerService';
export default {
  namespace: 'pockerBoard',
  state: {
    scoreList: [],
    roomName: '',
    average: ''
  },
  reducers: {
    syncStoryPoint(state, { payload: { scoreList } }) {
      return { ...state, scoreList }
    },
    syncRoomName(state, { payload: { roomName } }) {
      return { ...state, roomName }
    }
  },
  effects: {
    *queryStoryPoints({ payload: roomName }, { call }) {
      yield call(pockerService, roomName);
    },
    *onClickPocker({ payload: values }, { call, put }) {
      console.log('tag2', 'www');
      yield call(pockerService.onClickPocker, values)
    },
    *resetStoryPoints({ payload: data }, { call, put }) {

    }
  },

  subscriptions: {
    init({ dispatch, history }) {
      return history.listen(location => {
        const match = pathToRegexp('/pockerRoom/:id').exec(location.pathname);
        if (match) {
          var roomId = location.pathname.substring(location.pathname.lastIndexOf("/") + 1);
          // join room
          console.log(roomId);
          dispatch({
            type: 'syncRoomName',
            payload: {
              roomName: roomId,
            }
          });
          pockerService.fetch((data) => {
            console.log('pocker room', data);
            dispatch({
              type: 'syncStoryPoint',
              payload: {
                scoreList: JSON.parse(data.body),
              }
            })
          }, roomId);
        }
      });
    },
  },
};
