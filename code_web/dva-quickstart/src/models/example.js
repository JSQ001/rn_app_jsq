// import {routerRedux} from 'dva/router'

export default {

  namespace: 'example',

  state: {},

  // 监听时间
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(( pathname ) => {
        console.log(pathname)
      })

    },
  },

  effects: {
    *fetch({ payload }, { call, put }) {  // eslint-disable-line
      yield put({ type: 'save' });
    },

    // 路由跳转
    * redirect ({ payload }, { put }) {
     // console.log(payload)
     // yield put(routerRedux.push('/products', {name: 'dkvirus'}));
    },
  },

  reducers: {
    save(state, action) {
      return { ...state, ...action.payload };
    },
  },

};
