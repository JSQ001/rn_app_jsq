import * as paymentService from '../services/paymentService';
import { routerRedux } from 'dva/router';
import { Toast } from 'antd-mobile';

export default {
    namespace: 'payment',
    state: {
        users: {},
        list: [],
        creditList: [],
        payResult: {}
    },
    reducers: {
        save(state, { payload: { data } }) {
            return { ...state, data };
        },
        saveConfirm(state, { payload: { confirmData,stopFlag } }) {
            return { ...state, confirmData,stopFlag };
        },
        saveBillCheckList(state, { payload: { list, total } }) {
            return { ...state, list, total };
        },
        setPayResult(state,{payload}){
            return {...state,...payload}
        }
    },
    effects: {

        // 通道绑信用卡获取短信验证码
        *bindCard4Code({ payload }, { call, put }) {
            const { data } = yield call(paymentService.bindCard4Code, payload);
            if (data && data.respCode === '000000') {
                Toast.info(data.respMsg, 2);
                yield put({ type: 'saveConfirm', payload: { confirmData: data,stopFlag:'1' } });
            } else {
                yield put({ type: 'saveConfirm', payload: { stopFlag: '0' } });
                Toast.info('验证失败，请检查填写信息是否正确或联系客服解决', 2);
            }
        },

        // 通道绑信用卡确认
        *bindCard4Comfirm({ payload, id }, { call, put }) {
            const { data } = yield call(paymentService.bindCard4Comfirm, payload);
            if (data && data.respCode === '000000') {
                Toast.info(data.respMsg, 2);
                // yield put(routerRedux.push(`/repaymentPlan/personalCenter/personalCenter/${id}`));
                yield put(routerRedux.go(-2));
            } else {
                Toast.info(data.respMsg, 2);
            }
        },

        // 普通商品购买支付后异步更新订单支付状态
        // *buyAsyncUpd({ payload }, { call, put }) {
        //     const { data } = yield call(paymentService.buyAsyncUpd, payload);
        // },

        // 还款计划执行（消费，退款）支付后异步更新订单支付状态
        //  *repayAsyncUpd({ payload }, { call, put }) {
        //     const { data } = yield call(paymentService.buyAsyncUpd, payload);
        // },

        // 提现后同步更新状态
        *withdrawAsyncUpd({ payload }, { call, put }) {
            const { data } = yield call(paymentService.withdrawAsyncUpd, payload);
            if (data && data.respCode === '000000') {
                Toast.info(data.respMsg, 2);
                yield put({ type: 'save', payload: { data: data } });
            } else {
                Toast.info(data.respMsg, 2);
            }

        },

        // 提现后同步更新状态
        *withdrawSyncUpd({ payload }, { call, put }) {
            const { data } = yield call(paymentService.withdrawSyncUpd, payload);
            if (data && data.respCode === '000000') {
                Toast.info(data.respMsg, 2);
                yield put({ type: 'save', payload: { data: data } });
            } else {
                Toast.info(data.respMsg, 2);
            }
        },


        // 获取账单列表
        *getBillCheckList({ payload }, { call, put }) {
            const { data } = yield call(paymentService.getBillCheckList, payload);
            if (data && data.respCode === '000000') {
                yield put({ type: 'saveBillCheckList', payload: { list: data.transList, total: data.page.totalCnt } });
            } else {
                Toast.info(data.respMsg, 2);
            }
        },
    },
    subscriptions: {
    },
}
