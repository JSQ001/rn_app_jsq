import * as profileService from '../services/profileService';
// import { routerRedux } from 'dva/router';

export default {
    namespace: 'profile',
    state: {
        users: {},
        list: [],
        detailsList:[]
    },
    reducers: {
        save(state, { payload: { data } }) {
            return { ...state, data };
        },
    },
    effects: {
        // 根据用户名查询该用户信息
        *getUserInfoByUserName({ payload }, { call, put }) {
            const { data } = yield call(profileService.getUserInfoByUserName, payload);
            if (data) {
                yield put({ type: 'save', payload: { data: data } });
            }
        },
    },
    subscriptions: {
    },
}