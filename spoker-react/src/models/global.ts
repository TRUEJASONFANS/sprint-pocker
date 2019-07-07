import * as userService from '@/services/userService';
export default {
  namespace: 'global', // 全局
  state: {
    hasLogin: true,
    userName: "",
  },
  reducers: { //同步action
    login(state, { data: user, hasLogin }) {
      return {
        ...state,
        hasLogin: hasLogin,
        userName: user
      };
    },
  },
  effects: { //异步action
    *queryUserStatus({ call, put, select }) {
      let user = yield call(userService.fetch);
      console.log('username', user);
      yield put({ type: "login", payload: { data: user, hasLogin: true } })
    },
    *throwError() {
      throw new Error('hi error');
    },
  },
  subscriptions: { //订阅
    connecting({ dispatch, history }) {
      dispatch({ type: 'queryUserStatus' });
    },
  }

}
