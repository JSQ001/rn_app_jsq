import * as webshopService from '../services/webshopService';
import * as paymentService from '../services/paymentService';
import { routerRedux } from 'dva/router';
import { Toast } from 'antd-mobile';
// import * as storage from '../utils/browserStorage.js';

export default {
    namespace: 'webshop',
    state: {
        users: {},
        list: []
    },
    reducers: {
        save(state, { payload: { list, total, pageNo } }) {
            return { ...state, list, total, pageNo };
        },
        saveDetails(state, { payload: { data } }) {
            return { ...state, data };
        },
        saveVIP(state, { payload: { vipFlag } }) {
            return { ...state, vipFlag };
        },
        saveVIPPrice(state, { payload: { priceObj } }) {
            return { ...state, priceObj };
        }
    },
    effects: {
        // 普通查询商品列表
        *fetchGoods({ payload }, { call, put }) {

            const { data } = yield call(webshopService.fetchGoods, payload);
            if (data) {
                yield put({ type: 'save', payload: { list: data.goodsList, total: data.page.totalCnt, pageNo: payload.pageNo } });
            }
        },
        // 查询vip商品列表
        *fetchVipGoods({ payload }, { call, put }) {
            const { data } = yield call(webshopService.fetchVipGoods, payload);
            if (data) {
                yield put({ type: 'save', payload: { list: data.goodsList, total: data.page.totalCnt, pageNo: payload.pageNo } });
            }
        },
        //检查是否已购买过VIP服务
        *fetchVip({ payload }, { call, put }) {
            const data = yield call(webshopService.fetchVIP, payload);
            if (data) {
                yield put({ type: 'saveVIP', payload: { vipFlag: data.data } });
            }
        },
        //检查是否已购买过VIP服务
        *goVipPage({ payload }, { call,put }) {
            const { data } = yield call(webshopService.fetchVIP, payload);
            if (data) {
                if (data === 2) {
                    Toast.info('您已成功晋升VIP，无需重复购买！', 2);
                } else if (data === 1) {
                    yield put(routerRedux.push(`/memberGoodsChoose/firstPage`));
                    ;
                } else if(data === 4){
                    //vip处理跳转
                    Toast.info('登录失效请重新登录！', 2);
                    yield put(routerRedux.push(`/login`));
                }else if(data === 0){
                    yield put(routerRedux.push(`/memberGoods/0`));
                }else if(data === 3){//支付中
                    yield put(routerRedux.push(`/memberGoods/3`));
                }else{
                    Toast.info('发生一些情况，请稍后重试！', 2);
                }
            }else{
                yield put(routerRedux.push(`/memberGoods/0`));
            }
        },
        //查询商品详情
        *fetchGoodsDetails({ payload }, { call, put }) {
            const { data } = yield call(webshopService.fetchGoodsDetails, payload);
            if (data) {
                yield put({ type: 'saveDetails', payload: { data } });
            }
        },

        //vip商品选择
        *chooseVipGoods({ payload }, { call, put }) {
            const { data } = yield call(webshopService.chooseVipGoods, payload);
            if (data && data.respCode === '000000') {
                Toast.info('商品领取成功', 2);
                yield put(routerRedux.push(`/firstPage`));
            } else {
                Toast.info(data.respMsg, 2);
            }
        },

        //根据userId获取用户订单
        *getCurrUserOrderList({ payload }, { call, put }) {
            const { data } = yield call(webshopService.getCurrUserOrderList, payload);
            if (data) {
                yield put({ type: 'save', payload: { list: data.orderList, total: data.page.totalCnt, pageNo: payload.pageNo } });
            }
        },

        //普通商品购买
        *buyGoods({ payload }, { call, put }) {
            const { data } = yield call(webshopService.buyGoods, payload);
            const values = {
                channelId: "ALIPAY",
                orderId: data && data.orderId ? data.orderId : '',
                amount: payload.amount
            }
            //当支付方式为支付宝时
            if (payload && payload.payType && payload.payType === 'THIRD_PARTY') {
                if (data && data.respCode === '000000') {
                    yield put({ type: 'payBuyGoods', payload: values });
                } else {
                    Toast.info(data.respMsg, 2);
                }
            } else {
                if (data) {
                    if (data.respCode === '000000') { //返回成功
                        Toast.info(data.respMsg, 2);
                        yield put(routerRedux.push(`/firstPage`));
                    } else {
                        Toast.info(data.respMsg, 2);
                    }
                }
            }
        },

        //vip购买取消
        *buyVipCancel({ payload }, { call, put }) {
            const { data } = yield call(webshopService.buyVipCancel, payload);
            if (data && data.respCode === '000000') {
                yield put({ type: 'saveVIP', payload: { vipFlag: 0 } });
                Toast.info('取消成功，可以重新购买！', 2);
            } else {
                Toast.info(data.respMsg, 2);
            }
        },

        //vip购买
        *buyVip({ payload }, { call, put }) {

            const { data } = yield call(webshopService.buyVip, payload);
            const values = {
                channelId: "ALIPAY",
                orderId: data && data.vipBuyId ? data.vipBuyId : '',
                amount: payload.amount
            };
            //当支付方式为第三方时
            if (payload && payload.payType && payload.payType === 'THIRD_PARTY') {
                if (data && data.respCode === '000000') {
                    yield put({ type: 'payVip', payload: values });
                } else {
                    Toast.info(data.respMsg, 2);
                }
            } else {
                if (data) {
                    if (data.respCode === '000000') { //返回成功
                         Toast.info("你的支付正在处理中，耐心等候呦！", 2);
                         yield put({type: 'payment', payload: values});
                         yield put(routerRedux.push(`/paySuccess`));
                         //yield put({ type: 'goVipPage', payload: values });
                    } else {
                        Toast.info(data.respMsg, 4);
                    }
                }
            }
        },

        //当支付方式为支付宝时使用（VIP购买）
        *payVip({ payload }, { call, put }) {
            const { data } = yield call(paymentService.payVip, payload);
            if (data && data.url) {
                window.ReactNativeWebView.postMessage(`pay:${data.url}`)
            }
        },

        // 当支付方式为支付宝时使用（购买普通商品）
        *payBuyGoods({ payload }, { call, put }) {
            const { data } = yield call(paymentService.payBuyGoods, payload);
            if (data) {
                window.ReactNativeWebView.postMessage(`pay:${data.url}`)
            }
        },

        // 清除缓存
        *clear({ payload }, { call, put }) {
            yield put({ type: 'saveVIP', payload: { data: {} } });
        },
        // 取消订单
        *cancelOrder({ payload, orderStatus }, { call, put }) {
            const { data } = yield call(webshopService.cancelOrder, payload);
            const payloads = {
                pageNo: 1,
                pageSize: 1000,
                orderStatus
            }
            if (data && data.respCode === '000000') {
                Toast.info('订单取消成功', 2)
                yield put({ type: 'getCurrUserOrderList', payload: payloads });
            } else {
                Toast.info(data.respMsg, 2)
            }
        },
        // 删除订单
        *delOrder({ payload, orderStatus }, { call, put }) {
            const { data } = yield call(webshopService.delOrder, payload);
            const payloads = {
                pageNo: 1,
                pageSize: 1000,
                orderStatus
            }
            if (data && data.respCode === '000000') {
                Toast.info('订单删除成功', 2)
                yield put({ type: 'getCurrUserOrderList', payload: payloads });
            } else {
                Toast.info(data.respMsg, 2)
            }
        },

        //查询VIP价格
        *fetchVipPrice({ payload }, { call, put }) {
            const { priceObj } = yield call(webshopService.fetchVipPrice, payload);
            if (priceObj) {
                yield put({ type: 'saveVIPPrice', payload: { priceObj } });
            }
        },
    },
    subscriptions: {
    },
}
