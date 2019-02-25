import * as roomService from '../services/rooms';

export default {
  namespace: 'rooms',
  state: {
    list: [],
    total: null,
    page: null,
  },
  reducers: {
    save(state, { payload: { data: list, total, page } }) {
      
      return { ...state, list, total, page };
    },
  },
  effects: {
    * remove({ payload: id }, { call, put, select }) {
      yield call(roomService.remove, id);
      const page = yield select(state => state.users.page);
      yield put({ type: 'fetch', payload: { page } });
    },
    * create({ payload: values }, { call, put, select }) {
      yield call(roomService.create, values);
      const page = yield select(state => state.users.page);
      yield put({ type: 'fetch', payload: { page } });
    },
    // * fetch({ payload: values }, { call, put }) {
    //   let result;
    //   console.log(call);
    //   yield call(roomService.fetch, result);
    //   console.log("table list", result);
    // },
    *fetch({ payload: { page = 1 } }, { call, put }) {
      const { data, headers } = yield call(roomService.fetch, {page});
      let total = parseInt(headers['x-total-count'], 10);
      page = parseInt(page, 10);
      yield put({
        type: 'save',
        payload: {
          data: data,
          total:  isNaN(total) ? 1: total,
          page: isNaN(page)? 1: page,
        },
      });
    }
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {
        if (pathname === '/rooms') {
          dispatch({
            type: 'fetch',
            payload : {
              page: 1
            }
          });
        }
      });
    },
  },
};
