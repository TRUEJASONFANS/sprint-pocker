import * as userService from '@/services/userService';
export default {
  namespace: 'global', // 全局
  state: {
    userName: "",
  },
  reducers: { //同步action
    login(state, { payload: {userName}}) {
      return {
        ...state,
        userName: userName
      };
    },
  },
  effects: { //异步action
    *queryUserStatus({},{ call, put, select }) {
      let requestBody = yield call(userService.whoAmI);
      console.log('username', requestBody);
      yield put({ type: "login", payload: { userName: requestBody.data.userName} })
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
