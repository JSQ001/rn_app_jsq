import { useState, useEffect, useReducer, useContext } from 'react';
import back from "assets/忘记密码/返回.png";
import List from "antd-mobile/es/list";
import {ActivityIndicator, InputItem, Radio, WhiteSpace} from "antd-mobile";
import React from "react";
import {connect} from "dva";
import { routerRedux } from 'dva/router';
import cardArr from "../../utils/bankUtil";
import { globalContext, store} from "../../index"
import './phoneValidateCode.css'
import PageHeader from "components/common/layout/page-header";

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
      <div style={{height: '100vh',background: "#fff"}}>
        <PageHeader title='添加储蓄卡'/>
        <div style={{ margin: '20vh 8vw'}}>
          <div style={{fontSize: 35}}>输入验证码</div>
          <div style={{marginTop: 10, fontSize: 16, color: 'rgb(174,174,174)'}}>已将验证码发送到您的手机: </div>
        </div>
        <div className="validate-code-input" style={{display: 'flex',}}>
          <InputItem className="validate-code-item"/>
          <InputItem className="validate-code-item"/>
          <InputItem className="validate-code-item"/>
          <InputItem className="validate-code-item"/>
        </div>
        <div className='creditBangding' style={{width: '70vw'}} onTouchEnd={handleValidate}>验证</div>

      </div>
  );
};


const mapStateToProps = (state) => {
  const { data } = state.cust;
  return {
    user: state.cust.usr,
  };
};
export default connect()(PhoneValidateCode);
