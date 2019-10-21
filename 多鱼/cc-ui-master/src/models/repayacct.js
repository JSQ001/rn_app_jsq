import * as repayacctService from '../services/repayacctService';
import { routerRedux } from 'dva/router';
import { Toast } from 'antd-mobile';

export default {
    namespace: 'repayacct',
    state: {
        users: {},
        list: [],
        detailsList: []
    },
    reducers: {
        save(state, { payload: { list, total, pageNo,validPlanFlag } }) {
            return { ...state, list, total, pageNo,validPlanFlag };
        },
        saveBalance(state, { payload: { data } }) {
            return { ...state, data };
        },
        saveMobile(state, { payload: { data } }) {
            return { ...state, data };
        },
        saveDetails(state, { payload: { detailsList, detailstotal, detailsPageNo, detailsPlan } }) {
            return { ...state, detailsList, detailstotal, detailsPageNo, detailsPlan };
        },

    },
    effects: {
        // 余额查询
        *queryBalance({ payload }, { call, put }) {
            const { data } = yield call(repayacctService.queryBalance);
            yield put({ type: 'saveBalance', payload: { data: data } });
        },

        // 根据卡号分页获取还款计划列表
        *getRepayPlanList({ payload }, { call, put }) {
            const { data } = yield call(repayacctService.getRepayPlanList, payload);
            if (data) {
                yield put({ type: 'save', payload: { list: data.repayPlanList, total: data.page.totalCnt, pageNo: data.page.pageNo,validPlanFlag:data.validPlanFlag } });
            }
        },

        // 根据卡号分页获取还款计划详情列表
        *getRepayDetails({ payload }, { call, put }) {
            const { data } = yield call(repayacctService.getRepayDetails, payload);
            if (data) {
                yield put({ type: 'saveDetails', payload: { detailsList: data.repayDetailList, detailstotal: data.page.totalCnt, detailsPageNo: data.page.pageNo, detailsPlan: data } });
            }
        },

        // 收益转余额
        *profit2Bal({ payload }, { call, put }) {
            const { data } = yield call(repayacctService.profit2Bal, payload);
            if (data && data.respCode === '000000') {
                Toast.info('转入余额成功', 2);
                // yield put(routerRedux.push(`/myselfWallet/personalCenter/personalCenter`));
                yield put(routerRedux.go(-1));
            } else {
                Toast.info(data.respMsg, 2);
            }
        },

        //会员间转账
        *transfer({ payload }, { call, put }) {
            const { data } = yield call(repayacctService.transfer, payload);
            if (data && data.respCode === '000000') {
                Toast.info(data.respMsg, 2);
                yield put(routerRedux.go(-1));
            } else {
                Toast.info(data.respMsg, 2);
            }
        },
        //账户验证
        *checkRelMobile({ payload }, { call, put }) {
            const { data } = yield call(repayacctService.checkRelMobile, payload);
            if (data && data.respCode === '000000') {
                yield put({ type: 'saveMobile', payload: { data: data } });
                Toast.info("账户验证成功", 2);
            } else {
                Toast.info(data.respMsg, 2);
            }
        },


        // 删除计划
        *delPlanDt({ payload, cardId }, { call, put }) {
            const { data } = yield call(repayacctService.delPlanDt, payload);
            const payloads = {
                pageNo: 1,
                pageSize: 100,
                planId: payload.planId
            }
            if (data && data.respCode === '000000') {
                Toast.info('还款计划删除成功', 2)
                const { data } = yield call(repayacctService.getRepayDetails, payloads);
                if (data && data.repayDetailList) {
                    if (data.repayDetailList.length === 0) {
                        // yield put(routerRedux.push(`/repaymentPlan/personalCenter/personalCenter/${cardId}`));
                        yield put(routerRedux.go(-1));
                    } else {
                        yield put({ type: 'saveDetails', payload: { detailsList: data.repayDetailList, detailstotal: data.page.totalCnt, detailsPageNo: data.page.pageNo, detailsPlan: data } });
                    }
                }

            } else {
                Toast.info(data.respMsg, 2)
            }
        },
        // 重新执行计划
        *reflishOrder({ payload, planId }, { call, put }) {
            const { data } = yield call(repayacctService.reflishOrder, payload);
            const payloads = {
                pageNo: 1,
                pageSize: 100,
                planId
            }
            if (data && data.respCode === '000000') {
                Toast.info('执行成功', 2)
                yield put({ type: 'getRepayDetails', payload: payloads });
            } else {
                Toast.info(data.respMsg, 2)
            }
        },
        // 终止还款计划
        *endPlan({ payload, cardId }, { call, put }) {
            const { data } = yield call(repayacctService.endPlan, payload);
            if (data && data.respCode === '000000') {
                Toast.info('终止成功', 2)
                // yield put(routerRedux.push(`/repaymentPlan/personalCenter/personalCenter/${cardId}`));
                yield put(routerRedux.go(-1));
            } else {
                Toast.info(data.respMsg, 2)
            }
        },
    },
    subscriptions: {
    },
}