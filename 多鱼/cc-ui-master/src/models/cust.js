import * as custService from '../services/custService';
import { routerRedux } from 'dva/router';
import { Toast } from 'antd-mobile';
import * as storage from '../utils/browserStorage.js';

export default {
    namespace: 'cust',
    state: {
        users: {},
        list: [],
        listAddr: [],
        creditList: [],
        commList: [],
        securityList:[],
        shareImg: '',

    },
    reducers: {

        fetchAddr(state, { payload: { listAddr, total, pageNo } }) {
            return { ...state, listAddr, total, pageNo };
        },
        saveCustInfo(state, { payload: { data } }) {
            return { ...state, data };
        },
        saveDebitCard(state, { payload: { list, total, offset } }) {
            return { ...state, list, total, offset };
        },
        saveCreditCard(state, { payload: { creditList, creditTotal, creditPageNo } }) {
            return { ...state, creditList, creditTotal, creditPageNo };
        },
        saveIdent(state, { payload: { identData } }) {
            return { ...state, identData };
        },
        saveCalcPlan(state, { payload: { calcData } }) {
            return { ...state, calcData };
        },
        saveCommunity(state, { payload: { list, total, pageNo, teamCnt } }) {
            return { ...state, list, total, pageNo, teamCnt };
        },
        saveIsSetPwd(state, { payload: { isSetPwdData } }) {
            return { ...state, isSetPwdData };
        },
        saveUserLevalData(state, { payload: { data } }) {
            return { ...state, data };
        },
        saveDayProfitList(state, { payload: { list, total, pageNo } }) {
            return { ...state, list, total, pageNo };
        },
        saveSingleDayProfits(state, { payload: { list, total, pageNo } }) {
            return { ...state, list, total, pageNo };
        },
        saveSingleDayComm(state, { payload: { listComm, totalComm, pageNoComm } }) {
            return { ...state, listComm, totalComm, pageNoComm };
        },
        fetchUserSec(state, { payload: { securityList, total, pageNo } }) {
            return { ...state, securityList, total, pageNo };
        },
        saveUsrMsg(state, { payload: { msgList } }) {
            return { ...state, msgList };
        },
        saveImageQry4FaceId(state, { payload: { data } }) {
            return { ...state, data };
        },
        saveShareImage(state, {payload: {data}}){
            return {...state, shareImg: data}
        }
    },
    effects: {
        // 发送短信验证码
        *sendMessage({ payload }, { call, put }) {
            const { data } = yield call(custService.sendMessage, payload);
            if (data) {
                Toast.info(data.respMsg, 2);
            }
        },
        // 注册
        *register({ payload }, { call, put }) {
            const { data } = yield call(custService.register, payload);
            if (data) {
                if (data.respCode === '000000') {
                    Toast.info('注册成功，请下载或打开app进行登录', 2);
                } else {
                    Toast.info(data.respMsg, 2);
                }
            }
        },
        //修改登录密码（忘记密码）
        *editPassword({ payload }, { call, put }) {
            const { data } = yield call(custService.findLoginPwd, payload);
            if (data) {
                if (data.respCode === '000000') {
                    Toast.info('密码修改成功，请登录', 2);
                    yield put(routerRedux.push(`/login`));
                } else {
                    Toast.info(data.respMsg, 2);
                }
            }
        },

        //修改登录密码（安全中心修改登录密码）
        *editLoginPassword({ payload }, { call, put }) {
            const { data } = yield call(custService.editLoginPassword, payload);
            if (data) {
                if (data.respCode === '000000') {
                    Toast.info('登录密码修改成功', 2);
                    yield put(routerRedux.push(`/saftCenter`));
                } else {
                    Toast.info(data.respMsg, 2);
                }
            }
        },
        //修改交易密码
        *updTransPwd({ payload }, { call, put }) {
            const { data } = yield call(custService.updTransPwd, payload);
            if (data) {
                if (data.respCode === '000000') {
                    Toast.info('交易密码修改成功', 2);
                    yield put(routerRedux.go(-1));
                } else {
                    Toast.info(data.respMsg, 2);
                }
            }
        },

        //获取当前会员信息
        *getUserInfo({ payload }, { call, put }) {
            const { data } = yield call(custService.getUserInfo);
            storage.put("usrExt",JSON.stringify(data));
            yield put({ type: 'saveCustInfo', payload: { data: data } });
        },

        //获取借记卡列表
        *getDebitCardList({ payload }, { call, put }) {
            const { data } = yield call(custService.getDebitCardList, payload);
            if (data) {
                yield put({ type: 'saveDebitCard', payload: { list: data.cardList, total: data.page.totalCnt, offet: data.page.pageNo } });
            }
        },
        //删除卡片
        *delCard({ payload, types }, { call, put }) {
            const { data } = yield call(custService.delCard, payload);
            if (data && data.respCode === '000000') {
                Toast.info('卡片删除成功', 1)
                if (types === 'XYK') {
                    yield put({
                        type: 'getCreditCardList', payload: {
                            pageSize: 20,
                            pageNo: 1
                        }
                    })
                } else {
                    yield put({
                        type: 'getDebitCardList', payload: {
                            pageSize: 20,
                            pageNo: 1
                        }
                    })
                }
            } else {
                Toast.info(data.respMsg, 1)
            }
        },

        //查询所有借记卡并保存到里
        *getAllDebitCardList({ payload }, { call, put }) {
            const { data } = yield call(custService.getDebitCardList, payload);
            if (data) {
                yield put({ type: 'saveDebitCard', payload: { list: data.cardList, total: data.page.totalCnt, offet: data.page.pageNo } });
            }
        },

        //获取信用卡列表
        *getCreditCardList({ payload, id }, { call, put }) {
            const { data } = yield call(custService.getCreditCardList, payload);
            if (data) {
                yield put({ type: 'saveCreditCard', payload: { creditList: data.cardList, creditTotal: data.page.totalCnt, creditPageNo: data.page.pageNo } });
                if (id) {
                    yield put({
                        type: 'repayacct/getRepayPlanList', payload: {
                            pageNo: 1,
                            pageSize: 6,
                            cardNo: (data.cardList && data.cardList.find((element) => (element.id === Number(id)))) || {}
                        }
                    })
                }
            }
        },

        //添加信用卡信息
        *addCreditCard({ payload }, { call, put }) {
            const { data } = yield call(custService.addCreditCard, payload.values);
            if (data) {
                //根据返回的状态码判断添加是否成功，并弹出显示
                if (data.respCode === '000000') {
                    Toast.info('信用卡添加成功', 2);
                    // yield put(routerRedux.push(`/myselfCardPackage`)); //返回我的卡包页面
                    yield put(routerRedux.go(-1));
                } else {
                    Toast.info(data.respMsg, 2);
                }
            }
        },

        //修改信用卡
        *updCreditCard({ payload }, { call, put }) {
            const { data } = yield call(custService.updCreditCard, payload);
            if (data) {
                //根据返回的状态码判断添加是否成功，并弹出显示
                if (data.respCode === '000000') {
                    Toast.info('信用卡修改成功', 2);
                    // yield put(routerRedux.push(`/myselfCardPackage/${payload.addr}/${payload.addred}`)); //返回我的卡包页面
                    yield put(routerRedux.go(-1));
                } else {
                    Toast.info(data.respMsg, 2);
                }
            }
        },

        //添加储蓄卡信息
        *addDebitCard({ payload }, { call, put }) {
            const { data } = yield call(custService.addDebitCard, payload);
            if (data) {
                //根据返回的状态码判断添加是否成功，并弹出显示
                if (data.respCode === '000000') {
                    Toast.info('储蓄卡添加成功', 2);
                    // yield put(routerRedux.push(`/myselfCardPackage/${payload.addr}/${payload.addred}`)); //返回我的卡包页面
                    yield put(routerRedux.go(-1));
                } else {
                    Toast.info(data.respMsg, 2);
                }
            }
        },

        //手机验证码



        //获取地址
        *getAddrList({ payload }, { call, put }) {
            const { data } = yield call(custService.getAddrList, payload);
            if (data && data.respCode === '000000') {
                yield put({ type: 'fetchAddr', payload: { listAddr: data.addrList, total: data.page.totalCnt, pageNo: data.page.pageNo } });
            }
        },

        //添加地址
        *addAddr({ payload }, { call, put }) {
            const { data } = yield call(custService.addAddr, payload);
            const values = {
                pageSize: 50,
                pageNo: 1
            }
            if (data.respCode === '000000') {
                Toast.info(data.respMsg, 2);
                yield put({ type: 'getAddrList', payload: values });
            } else {
                Toast.info(data.respMsg, 2);
            }
        },

        //修改地址
        *editAddr({ payload }, { call, put }) {
            const { data } = yield call(custService.editAddr, payload);
            const values = {
                pageSize: 50,
                pageNo: 1
            }
            if (data && data.respCode === '000000') {
                Toast.info('地址修改成功', 2);
                yield put({ type: 'getAddrList', payload: values });
            } else {
                Toast.info(data.respMsg, 2);
            }
        },

        //设置默认卡片
        *setDefaultCard({ payload }, { call, put }) {
            const { data } = yield call(custService.setDefaultCard, payload);
            if (data && data.respCode === '000000') {
                Toast.info('默认卡片设置成功', 2);
                yield put({
                    type: 'getDebitCardList', payload: {
                        pageSize: 20,
                        pageNo: 1
                    }
                })
            } else {
                Toast.info(data.respMsg, 2);
            }
        },
        //地址删除
        *delAddr({ payload }, { call, put }) {
            const { data } = yield call(custService.delAddr, payload);
            const values = {
                pageSize: 50,
                pageNo: 1
            }
            if (data && data.respCode === '000000') {
                Toast.info('地址删除成功', 2);
                yield put({ type: 'getAddrList', payload: values });
            } else {

                Toast.info(data.respMsg, 2);
            }
        },
        //实名认证
        *identification({ payload }, { call, put }) {
            const { data } = yield call(custService.identification, payload);
            if (data.error_code === 0) {
                yield put({ type: 'saveIdent', payload: { identData: data.result } });
            } else {
                Toast.info('身份验证失败，请稍候重试', 2);
            }
        },

        //计算还款计划
        *calcRepayPlan({ payload }, { call, put }) {
            const { data } = yield call(custService.calcRepayPlan, payload);
            storage.put("defaultConsumeAddr",payload.planLocate);
            if (data.respCode === '000000') {

                yield put({ type: 'saveCalcPlan', payload: { calcData: data } });
            }
        },

        //确认还款计划
        *confirmRepayPlan({ payload }, { call, put }) {
            const { data } = yield call(custService.confirmRepayPlan, {...payload.calcData, userSecId: payload.userSecId});
            if (data.respCode === '000000') {
                if (data.channleId === '') {
                    Toast.info('您已绑定成功！', 2);
                    // yield put(routerRedux.push(`/repaymentPlan/${payload.addr}/${payload.addred}/${payload.id}`));
                    yield put(routerRedux.go(-1));
                } else if (data.channleId !== '') {
                    yield put(routerRedux.push(`/confirmRepayPlan/${payload.addr}/${payload.addred}/${payload.id}/${data.channleId}/${data.merchantNo}`));
                }
            } else {
                Toast.info(data.respMsg, 2);
            }
        },

        //是否设置交易密码查询
        *getTransPwdFlag({ payload }, { call, put }) {
            const { data } = yield call(custService.getTransPwdFlag, payload);
            if (data) {
                yield put({ type: 'saveIsSetPwd', payload: { isSetPwdData: data } });
            }
        },

        //我的社群列表查询
        *downStatById({ payload }, { call, put }) {
            const { data } = yield call(custService.downStatById, payload);
            if (data) {
                yield put({ type: 'saveCommunity', payload: { list: data.downStat, total: data.page.totalCnt, pageNo: payload.pageNo, teamCnt: data.teamCnt } });
            }
        },

        //提现
        *withdraw({ payload }, { call, put }) {
            const { data } = yield call(custService.withdraw, payload);
            if (data && data.respCode === '000000') {
                Toast.info('提现已受理，稍后请查看账单', 2);

                yield put(routerRedux.go(-2));

            } else {
                Toast.info(data.respMsg, 2);
            }
        },

        //获取权益信息
        *getUserLevel({ payload }, { call, put }) {
            const { data } = yield call(custService.getUserLevel);
            if (data) {
                yield put({ type: 'saveUserLevalData', payload: { data: data } });
            }
        },
        //获取每日收益信息
        *getDayProfitList({ payload }, { call, put }) {
            const { data } = yield call(custService.getDayProfitList, payload);
            if (data && data.respCode === '000000') {
                yield put({ type: 'saveDayProfitList', payload: { list: data.dayList, total: data.page.totalCnt, pageNo: payload.pageNo } });
            } else {
                Toast.info(data.respMsg, 2);
            }
        },
        //人脸识别
        *getBioUrl({ payload }, { call, put }) {
            const { data } = yield call(custService.getBioUrl, payload);
            if (data && data.respCode === '000000') {

                Toast.info('正在跳往人脸识别页面，请稍等...', 2);
                window.location.href = data.url
            }
        },
        // 当日收益
        *getSingleDayProfits({ payload }, { call, put }) {
            const { data } = yield call(custService.getSingleDayProfits, payload);
            if (data && data.respCode === '000000') {
                yield put({ type: 'saveSingleDayProfits', payload: { list: data.singleDayList, total: data.page.totalCnt, pageNo: payload.pageNo } });
            } else {
                Toast.info(data.respMsg, 2);
            }
        },
        // 当日返佣
        *getSingleDayComm({ payload }, { call, put }) {
            const { data } = yield call(custService.getSingleDayComm, payload);
            if (data && data.respCode === '000000') {
                yield put({ type: 'saveSingleDayComm', payload: { listComm: data.singleCommList, totalComm: data.page.totalCnt, pageNoComm: payload.pageNo } });
            } else {
                Toast.info(data.respMsg, 2);
            }
        },

        //获取卡券
        *getUserSec({ payload }, { call, put }) {
            const { data } = yield call(custService.getUserSec, payload);
            if (data && data.respCode === '000000') {
                yield put({ type: 'fetchUserSec', payload: { securityList: data.securityList, total: data.page.totalCnt, pageNo: data.page.pageNo } });
            }
        },

        //赠送卡券
        *ticketsTransfer({ payload }, { call, put }) {
            const { data } = yield call(custService.ticketsTransfer, payload);
            if (data) {
                if (data.respCode === '000000') {
                    Toast.info('赠送成功', 2);
                    yield put(routerRedux.go(-1));
                } else {
                    Toast.info(data.respMsg, 2);
                }
            }
        },

        //使用卡券
        *useTicket({ payload }, { call, put }) {
            const { data } = yield call(custService.useTicket, payload);
            const values = {
                securityType: '',
                pageSize: 6,
                pageNo: 1
            }
            if (data && data.respCode === '000000') {
                Toast.info('卡券使用成功', 2);
                yield put({ type: 'getUserSec', payload: values });
                // yield put(routerRedux.push({pathname:'/myselfTickets/personalCenter'}));

            } else {
                Toast.info(data.respMsg, 2);
            }
        },
        //获取消息列表
        *getUserMsg({ payload }, { call, put }) {
            const { data } = yield call(custService.getUserMsg, payload);
            if (data) {
                yield put({ type: 'saveUsrMsg', payload: { msgList:data } });
            }
        },
        //查询已经上传的身份证照片和识别结果
        *idImageQry4FaceId({ payload }, { call, put }) {
            const { data } = yield call(custService.idImageQry4FaceId, payload);
            console.log(data)
            if (data) {
                yield put({ type: 'saveImageQry4FaceId', payload: { data } });
            }
        },
        //认证结果通知
        *noticeResult({ payload }, { call }) {
            console.log(1)
            yield call(custService.bioStatus, payload);
        },

        // 获取分享图片
        *getQrPoster({payload},{call,put}){
            const data = yield call(custService.getQrPoster,payload);
            if(data){
                yield put({type: 'saveShareImage', payload: {data}})
            }
        }
    },
    subscriptions: {
    },
}
