import React from 'react';
import { Router, Route, Switch, Redirect,routerRedux } from 'dva/router';
import dynamic from 'dva/dynamic';

import Login from './components/LoginPage/Login';
import ForgetPassword from './components/LoginPage/ForgetPassword';
import GetAcctNum from './components/LoginPage/GetAcctNum';
import UserRegister from './components/UserRegister/UserRegister';
import SaftCenter from './components/SafeCenter/SaftCenter';
import FirstPage from './components/FirstPage/FirstPage';
import CustService from './components/FirstPage/CustService';
import GoodsDetails from './components/FirstPage/GoodsDetails';
import MemberGoods from './components/MembersGoods/MemberGoods';
import MemberGoodsChoose from './components/MembersGoods/MemberGoodsChoose';
import MembersGoodsList from './components/MembersGoods/MembersGoodsList';
import PersonalCenter from './components/PersonalCenter/PersonalCenter';
import EditPasswordLogin from './components/SafeCenter/EditPasswordLogin';
import EditTranPassword from './components/SafeCenter/EditTranPassword';
import MyselfAddr from './components/PersonalCenter/MyselfAddr';
import MyselfOrder from './components/PersonalCenter/MyselfOrder';
import MyselfInterests from './components/PersonalCenter/MyselfInterests';
import MyselfCommunity from './components/PersonalCenter/MyselfCommunity';
import MyselfAcctCenter from './components/MyselfAcctCenter/MyselfAcctCenter';
import MyselfCardPackage from './components/MyselfAcctCenter/MyselfCardPackage';
import Share from './components/Share/Share';
import Wonderful from './components/Share/wonderful';
import AddCreditCard from './components/MyselfAcctCenter/AddCreditCard';
import AddSavingsCard from './components/MyselfAcctCenter/AddSavingsCard';
import MyselfWallet from './components/MyselfAcctCenter/MyselfWallet';
import EditCreditCard from './components/MyselfAcctCenter/EditCreditCard';
import RepaymentPlan from './components/Reimbursement/RepaymentPlan';
import AddRepaymentPlan from './components/Reimbursement/AddRepaymentPlan';
import BalanceWithdrawal from './components/Balance/BalanceWithdrawal';
import IntoBalance from './components/Balance/IntoBalance';
import TotalEarnings from './components/Balance/TotalEarnings';
import TodayEarning from './components/Balance/TodayEarning';
import EarningDetails from './components/Balance/EarningDetails';
import Bill from './components/Balance/Bill';
import BillDetails from './components/Balance/BillDetails';
import ReimbursementPlan from './components/Reimbursement/ReimbursementPlan';
import ConfirmRepayPlan from './components/Reimbursement/ConfirmRepayPlan';
import PlanDetails from './components/Reimbursement/PlanDetails';
import VipGoodsDetails from './components/FirstPage/VipGoodsDetails';
import Transfer from './components/Balance/Transfer';
import ChooseBankCard from './components/Balance/ChooseBankCard';
import PersonalAuth from './components/PersonalCenter/PersonalAuth';
import FaceAuth from './components/PersonalCenter/FaceAuth';
import AuthMiddle from './components/PersonalCenter/AuthMiddle';
import AuthFail from './components/PersonalCenter/AuthFail';
import AuthSuccess from './components/PersonalCenter/AuthSuccess';
import PaySuccess from './components/PersonalCenter/PaySuccess';
import PayFail from './components/PersonalCenter/PayFail';
import MyselfTickets from './components/Tickets/MyselfTickets';
// import App from './components/App';
import { authenticated } from './utils/routeAuth.js';

import Demo4 from './components/UserRegister/Demo4';
import SelfCenter from './components/PersonalCenter/SelfCenter';
import MyselfRevn from './components/MyselfAcctCenter/MyselfRevn';
import TodayEmploy from './components/Balance/TodayEmploy';
import TotalEmploy from './components/Balance/TotalEmploy';
import TicketsTransfer from './components/Tickets/TicketsTransfer';

import PhoneValidateCode from './components/MyselfAcctCenter/phoneValidateCode';
import BindSuccess from './components/MyselfAcctCenter/bindSuccess';

import LayoutTest from './components/common/layout-test'

import ShoppingMall from './components/shopping-mall'
import ProductDetail from './components/shopping-mall/product-detail'
import CreditCard from './components/creditCard'


const { ConnectedRouter } = routerRedux;


function RouterConfig({ history, app}) {

  const LazyComponent =  dynamic({
    app,
    models: ()=> [
      // import('./models/expense')  已经在index页面注册过啦，放开会报错
    ],
    component: () => import("./components/creditCard")
  });

  const routes = [];
  return (
    <ConnectedRouter history={history}>
      <Switch>
        {/*登录页*/}
        <PrivateLoginRoute path="/login" component={Login} />
        {/*忘记密码*/}
        <Route path="/forgetPassword" component={ForgetPassword} />
        {/*获取账号*/}
        <Route path="/getAcctNum" component={GetAcctNum} />
        {/*用户注册*/}
        <Route path="/userRegister/:recommend" component={UserRegister} />

        {/*首页*/}
        <PrivateRoute path="/firstPage" component={FirstPage} />
        {/*客服*/}
        <PrivateRoute path="/custService" component={CustService} />
        {/*商品详情*/}
        <PrivateRoute path="/goodsDetails/:id/:addr" component={GoodsDetails} />
        {/*会员商品*/}
        <PrivateRoute path="/memberGoods/:status" component={MemberGoods} />
        {/*会员商品选择(vip商品列表)*/}
        <PrivateRoute path="/memberGoodsChoose" component={MemberGoodsChoose} />
        {/*会员商品详情页*/}
        <PrivateRoute path="/vipGoodsDetails/:id/:addr" component={VipGoodsDetails} />
        {/*普通商品列表*/}
        <PrivateRoute path="/membersGoodsList" component={MembersGoodsList} />
        {/*分享*/}
        <PrivateRoute path="/share" component={Share} />
        {/*精彩*/}
        <PrivateRoute path="/wonderful" component={Wonderful} />
        {/*个人中心*/}
        <PrivateRoute path="/personalCenter" component={PersonalCenter} />
        {/*认证成功*/}
        <PrivateRoute path="/authSuccess" component={AuthSuccess} />
        {/*认证失败*/}
        <PrivateRoute path="/authFail" component={AuthFail} />
        {/*支付成功*/}
        <PrivateRoute path="/paySuccess" component={PaySuccess} />
        {/*绑定完成*/}
        <PrivateRoute path="/bindSuccess" component={BindSuccess} />
        {/*支付失败*/}
        <PrivateRoute path="/payFail" component={PayFail} />
        {/*我的权益*/}
        <PrivateRoute path="/myselfInterests" component={MyselfInterests} />
        {/*我的社群*/}
        <PrivateRoute path="/myselfCommunity/:addr/:addred" component={MyselfCommunity} />
        {/*我的卡包*/}
        <PrivateRoute path="/myselfCardPackage/:addr/:addred" component={MyselfCardPackage} />
        {/*添加信用卡*/}
        <PrivateRoute path="/addCreditCard/:addr/:addred" component={AddCreditCard} />
        {/*添加储蓄卡*/}
        <PrivateRoute path="/addSavingsCard/:addr/:addred" component={AddSavingsCard} />
        {/*手机验证码*/}
        <PrivateRoute path="/phone/validate/code" component={PhoneValidateCode} />
        {/*修改信用卡*/}
        <PrivateRoute path="/editCreditCard/:addr/:addred/:id" component={EditCreditCard} />
        {/*还款计划列表*/}
        <PrivateRoute path="/repaymentPlan/:addr/:addred/:id" component={RepaymentPlan} />
        {/*添加还款计划*/}
        {/* <PrivateRoute path="/addRepaymentPlan/:addr/:addred/:id/:channlId/:merchantNo" component={AddRepaymentPlan} /> */}
        <PrivateRoute path="/addRepaymentPlan/:addr/:addred/:id" component={AddRepaymentPlan} />
        {/*确认还款计划*/}
        <PrivateRoute path="/confirmRepayPlan/:addr/:addred/:id/:channlId/:merchantNo" component={ConfirmRepayPlan} />
        {/*还款计划详情*/}
        <PrivateRoute path="/planDetails/:addr/:addred/:id/:cardId" component={PlanDetails} />
        {/*我的账户中心*/}
        <PrivateRoute path="/myselfAcctCenter/:addr" component={MyselfAcctCenter} />
        {/*安全中心*/}
        <PrivateRoute path="/saftCenter" component={SaftCenter} />
        {/*登录密码修改*/}
        <PrivateRoute path="/editPasswordLogin" component={EditPasswordLogin} />
        {/*交易密码修改*/}
        <PrivateRoute path="/editTranPassword" component={EditTranPassword} />
        {/*我的订单*/}
        <PrivateRoute path="/myselfOrder" component={MyselfOrder} />
        {/*个人中心*/}
        <PrivateRoute path="/selfCenter" component={SelfCenter} />
        {/*我的地址*/}
        <PrivateRoute path="/myselfAddr" component={MyselfAddr} />
        {/*我的卡券*/}
        <PrivateRoute path="/myselfTickets/:addr" component={MyselfTickets} />
        {/*赠送卡券*/}
        <PrivateRoute path="/ticketsTransfer/:id" component={TicketsTransfer} />

        {/*我的余额*/}
        <PrivateRoute path="/myselfWallet/:addr/:addred" component={MyselfWallet} />
        {/*我的收益*/}
        <PrivateRoute path="/myselfRevn/:addr/:addred" component={MyselfRevn} />
        {/*余额提现*/}
        <PrivateRoute path="/balanceWithdrawal/:addr/:addred" component={BalanceWithdrawal} />
        {/*选择银行卡*/}
        <PrivateRoute path="/chooseBankCard" component={ChooseBankCard} />
        {/*转账*/}
        <PrivateRoute path="/transfer/:addr/:addred" component={Transfer} />
        {/*转入余额*/}
        <PrivateRoute path="/intoBalance/:addr" component={IntoBalance} />
        {/*每日还款*/}
        <PrivateRoute path="/totalEarnings/:addr/:addred" component={TotalEarnings} />
        {/*好友还款*/}
        <PrivateRoute path="/todayEarning/:addr/:addred/:id" component={TodayEarning} />
        {/*每日晋升*/}
        <PrivateRoute path="/totalEmploy/:addr/:addred" component={TotalEmploy} />
        {/*好友晋升*/}
        <PrivateRoute path="/todayEmploy/:addr/:addred/:id" component={TodayEmploy} />
        {/*收益明细*/}
        <PrivateRoute path="/earningDetails/:id" component={EarningDetails} />
        {/*账单*/}
        <PrivateRoute path="/bill/:addr/:addred" component={Bill} />
        {/*实名认证*/}
        <PrivateRoute path="/personalAuth/:type" component={PersonalAuth} />
        {/*实名认证中间页*/}
        <PrivateRoute path="/authMiddle" component={AuthMiddle} />
        {/*进入人脸识别*/}
        <PrivateRoute path="/faceAuth" component={FaceAuth} />
        {/*账单详情*/}
        <PrivateRoute path="/billDetails/:id" component={BillDetails} />
        {/**/}
        <PrivateRoute path="/reimbursementPlan/:addr" component={ReimbursementPlan} />
        {/**/}
        <PrivateRoute path="/demo/layout/test" component={LayoutTest} />
        {/*商城*/}
        <PrivateRoute path="/shopping/mall" component={ShoppingMall} />
        {/*商品详情*/}
        <PrivateRoute path="/product/detail" component={ProductDetail} />

        {/*信用卡*/}
        <PrivateRoute path="/credit/card" component={CreditCard} />

        <PrivateRoute path="/demo" component={Demo4} />
        <PrivateRoute path="/" component={FirstPage} />

        {
          routes.map(({path,...dynamic},index)=>{
            return (
                <Route
                    key={index}
                    path={path}
                    component={dynamic({
                      app,
                      ...dynamic
                    })}
                />
            )

          })
        }
      </Switch>
    </ConnectedRouter>
  );
}

const PrivateLoginRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      authenticated(props) ? (
        <Component {...props} />
      ) : (
          <Redirect
            to={{
              pathname: "/",
              state: { from: props.location }
            }}
          />
        )
    }
  />
);



const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      authenticated(props) ? (
        <Component {...props} />
      ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: props.location }
            }}
          />
        )
    }
  />
);


export default RouterConfig;
