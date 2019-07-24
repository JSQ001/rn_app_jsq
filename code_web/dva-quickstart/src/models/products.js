export default {
  namespace: 'products',  // 当前 Model 的名称。整个应用的 State，由多个小的 Model 的 State 以 namespace 为 key 合成
  state: [{jsq:1}],  //该 Model 当前的状态。数据保存在这里，直接决定了视图层的输出
  reducers: { //处理同步动作
    'delete'(state, { payload: id }) { //重命名
      console.log('...正在处理同步操作');
      return state.filter(item => item.id !== id);
    },
  },
  effects: { //处理异步动作
    *operate(action, { call, put }) {
      yield call(
        ()=>{console.log('...正在处理异步操作')}, 1000);
      yield put({ type: 'number' });
    },
  },
};


/*

namespace 表示在全局 state 上的 key

state 是初始值，在这里是空数组

reducers 等同于 redux 里的 reducer，接收 action，同步更新 state

然后别忘记在 index.js 里载入他：*/
