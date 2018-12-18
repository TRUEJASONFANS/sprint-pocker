import pathToRegexp from 'path-to-regexp';
import * as pockerService from '../service/pockerService';
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
    setup({ dispatch, history }) {
      return history.listen(location => {
        console.log(location.pathname);
        const match = pathToRegexp('/pocketRoom/:id').exec(location.pathname);
        if (match) {
          pockerService.fetch((data) => {
            dispatch({
              type: 'syncStoryPoint',
              payload: 
                JSON.parse(data.body),
            })
          });
        }
      });
    },
  },
};
