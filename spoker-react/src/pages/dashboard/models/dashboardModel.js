import * as dashboardService from '../services/dashboardService';

export default {
  namespace: 'dashboard',
  state: {
    itemList: [],
    page: 1

  },
  reducers: {
    save(state, { payload: { data: itemList, page } }) {
      console.log("dash fetch:" , page);
      return { ...state, itemList, page };
    },
  },
  effects: {
    *fetch({ payload: page }, { call, put }) {
      let {data, header} = yield call(dashboardService.fetch, page);
      yield put({ type: 'save', payload: { data, page }});
    },
    *create({ payload: newItem }, { call, select ,put}) {
      yield call(dashboardService.create, newItem);
      const page = yield select(state => state.users.page);
      yield put({ type: 'fetch', payload: { page } });
    },
    *deleteOne({ payload: ticketNum }, { call, select, put }) {
      yield call(dashboardService.deleteOne, ticketNum);
      const page = yield select(state => state.users.page);
      yield put({ type: 'fetch', payload: { page } });
    }
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {
        if (pathname === '/dashboard') {
          dispatch({
            type: 'fetch',
            payload: {
              page: query.page
            }
          });
        }
      });
    },
  },
}