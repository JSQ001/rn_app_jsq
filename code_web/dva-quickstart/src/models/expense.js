import store from "@/" // src下index

export default {
  namespace: 'expense',

  state: {
    expenseCode: [],
  },

  effects: {
    *getData({ payload }, { call, put }) {
      const response = yield call(async ()=> {
          const data= await setTimeout(()=>{
            console.log(payload);
            console.log(123,"执行异步中...");
            return {data: [{id: 1,name: 'jsq'}]}
          },1000);
          return data
      }, payload);
      yield put({
        type: 'setData', // reducer中定义的方法
        payload: response,
      });

    },
  },

  reducers: {
    setData(state, { payload={} }) {
      return {
        ...state,
        expenseCode: payload.data,
      };
    },
  },

  subscriptions: {
    setup ({dispatch, history}) {
      history.listen(({ pathname }) => {
        if(store){
          console.log(store.getState())
        }
        if(pathname.includes("/ant/expense-category/")){
          dispatch({
            type: "expense/getData",
            payload: {name: 'jsq'} ,
          });
        }
      })
    },
  },
};
