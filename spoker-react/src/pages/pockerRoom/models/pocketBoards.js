
import pathToRegexp from 'path-to-regexp';
export default {
  namespace: 'pocketBoard',
  state: {
    scoreList: {},
    roomNumber: '',
  },

  effect: {},

  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen((location) => {
        console.log(location.pathname);
        const match = pathToRegexp('/pocketRoom/:id').exec(location.pathname)
        if (match) {

        }
      });
    },
  },
};
