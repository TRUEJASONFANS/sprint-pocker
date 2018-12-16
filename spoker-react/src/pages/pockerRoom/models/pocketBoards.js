import pathToRegexp from 'path-to-regexp';
export default {
  namespace: 'pocketBoard',
  state: {
    ticketScore: {},
    roomNumber: '',
  },
  reducers: {
    syncStoryPoint(state, { payload: data }) {},
  },
  effect: {
    *queryStoryPoints({ payload: roomId }, { call, put }) {

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
          dispatch({ type: 'queryStoryPoint' });
        }
      });
    },
  },
};
