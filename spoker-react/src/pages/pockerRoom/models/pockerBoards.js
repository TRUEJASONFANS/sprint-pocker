import pathToRegexp from 'path-to-regexp';
import * as pockerService from '../services/pockerService';
export default {
  namespace: 'pocketBoard',
  state: {
    userStoryPointLists: [],
    roomName: '',
    average: ''
  },
  reducers: {
    syncStoryPoint(state, { payload: { userStoryPointLists, roomName, average } }) {
      return { ...state, userStoryPointLists, roomName, average}
    },
  },
  effect: {
    *queryStoryPoints({ payload: roomName }, { call, put }) {
      yield call(pockerService, roomName);

    },
    *submitStoryPoints({ payload: data }, { call, put }) {

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
          pockerService.fetch((data) => {
            console.log('pocker room', data);
            dispatch({
              type: 'syncStoryPoint',
              payload: 
                JSON.parse(data.body),
            })
          }, roomId);
        }
      });
    },
  },
};
