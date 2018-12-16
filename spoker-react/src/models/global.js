import { routerRedux } from 'dva/router';
import * as loginService from '../services/websocket_service';
import pathToRegexp from 'path-to-regexp';
export default {
  namespace: 'global',
  state: {
    hasLogin: false,
    userName: "",
  },
  reducers: { //同步action
    signin(state, { payload: data }) {
      console.log("signing:" + data);
      return {
        ...state,
        hasLogin: data.hasLogin,
        userName: data.userName
      };
    },
  },
  effects: { //异步action
    *onLogin({ payload: userName }, { call, put, select }) {
      console.log('username', userName);
      const hasLogin = yield select(state => state.global.hasLogin);
      const hasLoginName = yield select(state => state.global.userName)
      if (!hasLogin) {
        if (userName !== undefined) {
          yield call(loginService.onLoginServer, userName);
        }
      }
      if (hasLogin) {
        if (userName === hasLoginName) {
          yield put(routerRedux.push('/rooms'));
        } else {
          yield call(loginService.onLoginServer, userName);
        }
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
      loginService.openSocket((data) => {
        console.log('login data' + data);
        dispatch({ type: 'signin', payload: data });
        dispatch(routerRedux.push('/'));
      })
    },

    openAuth({ dispatch, history }) {
      history.listen((location) => {
        const match = pathToRegexp('/login').exec(location.pathname)
        if (!match) {
          // dispatch({ type: 'onAuth', payload: location.pathname });
        }
      })
    }
  }

}