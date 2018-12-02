import { routerRedux } from 'dva/router';
import * as loginService from '../services/login_service';
import pathToRegexp from 'path-to-regexp';
export default {
  namespace: 'global',
  state: {
    hasLogin: false,
    userName: "",
  },
  reducers: { //同步action
    signin(state, { payload: loginState }) {
      console.log("signing:" + loginState);
      return {
        ...state,
        hasLogin: loginState
      };
    },
  },
  effects: { //异步action
    *onLogin({ payload: userName }, { call, put, select }) {
      console.log('username', userName);
      const hasLogin = yield select(state => state.global.hasLogin);
      if (!hasLogin && userName !== undefined) {
        yield call(loginService.onLoginServer, userName);
      }
    },
    *onAuth({ payload: location }, { call, put, select }) {
      const hasLogin = yield select(state => state.global.hasLogin);
      console.log('Auth:', hasLogin);
      if (!hasLogin) {
        yield put(routerRedux.push('/login'));
      }
    },
    *throwError() {
      throw new Error('hi error');
    },
  },
  subscriptions: { //订阅
    openSocket({ dispatch, history }) {
      return loginService.openSocket((data) => {
        console.log('Set login state:' + data.hasLogin);
        dispatch({ type: 'signin', payload: data.hasLogin });
        dispatch(routerRedux.push('/'));
      })
    },

    openAuth({ dispatch, history }) {
      history.listen((location) => {
        const match = pathToRegexp('/login').exec(location.pathname)
        if (!match) {
          dispatch({ type: 'onAuth', payload: location.pathname });
        }
      })
    }
  }

}