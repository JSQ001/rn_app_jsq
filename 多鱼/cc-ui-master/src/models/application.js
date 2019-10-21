import * as applicationService from '../services/applicationService';
import * as custService from '../services/custService';
import { routerRedux } from 'dva/router';
import { Toast } from 'antd-mobile';
import * as storage from '../utils/browserStorage.js';

export default {
    namespace: 'application',
    state: {
        users: {}
    },
    reducers: {
        users(state, { payload: { data: users } }) {
            return { ...state, users };
        },
        setUser(state,{ payload }) {
          return { ...state, users: payload };
        },
    },
    effects: {
        // 登录
        *login({ payload, localStorage }, { call, put }) {
            const { data } = yield call(applicationService.login, payload);
            /*const data = {
                status: 'OK'
            };*/
            payload.username = payload.username.substr(0, 11);
            if (typeof data === 'object' && data.status === 'OK') {
                storage.put('usr', JSON.stringify({}));
                storage.put('username', payload.username);
                yield put({ type: 'loadCurrentUser' });
                //yield put({type: 'setUser',payload})
            } else {
                Toast.info("用户名或密码错误", 2);
            }
        },
        *logout(action, { call, put }) {
            yield call(applicationService.logout);
            storage.clear();
            yield put(routerRedux.push(`/login`));
            // if (data.status !== 'OK') {
            //     alert(data.message);
            // } else {
            //     storage.clear();
            //     yield put(routerRedux.push(`/login`));
            // }
        },
        *loadCurrentUserCompleted({ payload: { data } }, { call, put }) {
            storage.put('usr', JSON.stringify(data));
            yield put(routerRedux.push(`/firstPage`));
        },

        *loadCurrentUser(action, { call, put }) {
            const { data } = yield call(applicationService.loadCurrentUser, storage.get('username'));
            yield put({ type: 'loadCurrentUserCompleted', payload: { data, } });
        },


        *isLoginCompleted({ payload: { data } }) {

            storage.put('usr', JSON.stringify(data));
            yield null
        },
        *isLogin(action, { call, put }) {

            const { data } = yield call(applicationService.loadCurrentUser, storage.get('username'));
            yield put({ type: 'isLoginCompleted', payload: { data, } });
        },

        // 发送短信验证码
        *sendMessage({ payload }, { call, put }) {
            const { data } = yield call(custService.sendMessage, payload);
            if (data) {
                if (data.respCode === '000000') {
                    Toast.info('短信验证码发送成功，请注意查收！', 2);
                }
            }
        },
    },
    subscriptions: {
    },
}
