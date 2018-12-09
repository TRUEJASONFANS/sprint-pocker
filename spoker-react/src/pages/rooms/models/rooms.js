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
      console.log('tag', list);
      return { ...state, list, total, page };
    },
  },
  effects: {
    *fetch({ payload: { page = 1 } }, { call, put }) {
      const action = (data) => {
       
      };
      yield call(roomService.fetch, action);
    },
    *remove({ payload: id }, { call, put, select }) {
      yield call(roomService.remove, id);
      const page = yield select(state => state.users.page);
      yield put({ type: 'fetch', payload: { page } });
    },
    *patch({ payload: { id, values } }, { call, put, select }) {
      yield call(roomService.patch, id, values);
      const page = yield select(state => state.users.page);
      yield put({ type: 'fetch', payload: { page } });
    },
    *create({ payload: values }, { call, put, select }) {
      yield call(roomService.create, values);
      const page = yield select(state => state.users.page);
      yield put({ type: 'fetch', payload: { page } });
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {
        if (pathname === '/rooms') {
          roomService.fetch((data) => {
            var body = JSON.parse(data.body);
            console.log("body", JSON.parse(data.body));
             dispatch({
              type: 'save',
              payload: {
                data: body,
                total: 1,
                page: 1
              },
            });
          });
        }
      });
    },
  },
};
