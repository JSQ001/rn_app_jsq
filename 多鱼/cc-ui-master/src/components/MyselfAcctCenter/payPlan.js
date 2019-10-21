import { useState, useEffect, useReducer, useContext } from 'react';
import back from "assets/忘记密码/返回.png";
import List from "antd-mobile/es/list";
import {ActivityIndicator, InputItem, Radio, Toast, WhiteSpace} from "antd-mobile";
import React from "react";
import {connect} from "dva";
import { routerRedux } from 'dva/router';
import cardArr from "../../utils/bankUtil";
import { globalContext, store} from "../../index"
import './phoneValidateCode.css'
import {fourCardNo} from "../../utils/appUtils";
import Item from "antd-mobile/es/popover/Item";

const PayPlan = (props) =>{
  const [count, setCount] = useState(1);

  // 类似componentDidMount 和 componentDidUpdate:
  useEffect(() => {
    // Update the document title using the browser API
    /*this.props.dispatch({
      type: 'cust/getUserInfo',
      payload: {

      }
    });*/
    document.title = `You clicked ${count} times`;
  });



  const handleValidate = ()=>{
    const { dispatch} = store;

    //todo,手机验证码
    dispatch({
      type: 'cust/addDebitCard',
      payload: {}
    });
    dispatch(routerRedux.replace({pathname: '/bindSuccess'}));

  };

  return (
      <div style={{height: '20vh',background: "#fff", padding: '0px 28px'}}>
          <div style={{display: 'flex'}}>
             <div >
               <div style={{width:'60vw'}}>
                 <div>
                   <span>status</span>
                   <span style={{marginLeft: 10}}>已成功</span>
                 </div>
                 <div style={{margin: '0.833rem 0',paddingLeft: 48}}>上海市</div>
                 <div style={{margin: '0.833rem 0',paddingLeft: 48}}>计划金额：1000.00</div>
                 <div style={{margin: '0.833rem 0',paddingLeft: 48}}>执行时间</div>
                 <div style={{margin: '0.833rem 0',paddingLeft: 48}}>创建时间</div>
               </div>
             </div>
            <div>
              百分比图
            </div>
          </div>
      </div>
  );
};

export default PayPlan;
