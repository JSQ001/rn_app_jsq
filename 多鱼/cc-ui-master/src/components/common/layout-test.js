import { useState, useEffect, useReducer, useContext } from 'react';
import back from "assets/忘记密码/返回.png";
import List from "antd-mobile/es/list";
import {ActivityIndicator, InputItem, Radio, WhiteSpace} from "antd-mobile";
import React from "react";
import {connect} from "dva";
import { routerRedux } from 'dva/router';
import cardArr from "../../utils/bankUtil";
import { globalContext, store} from "../../index"

const PhoneValidateCode = (props) =>{
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
      <div style={{height: '100vh', paddingTop: '65px',background: "#fff"}}>
        <div>
          <div style={{width: '50vw', background: 'red'}}>
            div1
          </div>
          <span>span</span>
          <div style={{width: '50vw', background: 'red'}}>
            div2
          </div>
        </div>
        <div style={{width: '50vw', background: 'red'}}>
          ahha
        </div>
        <div style={{width: '50vw', background: 'pink'}}>bte</div>
      </div>
  );
};

export default PhoneValidateCode;
