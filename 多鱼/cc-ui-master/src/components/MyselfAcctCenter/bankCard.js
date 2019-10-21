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
import { history} from '../../index'
import { fourCardNo, bankImg } from '../../utils/appUtils';
import morenlogo from "assets/我的卡包-信用/DEFAULT_LOGO.png";

const BankCard = (props) =>{
  const [count, setCount] = useState(1);
  let {data, onlyVisible} = props;
  if(!data) data={};

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
  const creditArr = bankImg.find((element) => (element.label === (data.bankName))) || { value: morenlogo,style: 'blueBackgroundColor' };
  return (
      <div style={{background: "#fff"}}>

        <div className='bank-card-plan'
             style={{
               display: 'flex',
               justifyContent: 'center',
               alignItems: 'center',
               width: '90vw',
               height:'17vh',
               paddingBottom: '1.667rem',
               color:'white',
               flexDirection: 'column',
               background: `url(${creditArr.background})`,
               backgroundSize: creditArr.background ? 'cover' : '',
             }}>
            <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  width: '90vw',
                  padding: '1.222rem 1.556rem',
                }} >
              <img alt='' src={creditArr && creditArr.value} style={{ width: '3.8rem',height: '3.8rem' }} />
              <div style={{paddingLeft: '1rem', fontSize: '1.333rem' }}>{data.bankName||''}<span>(尾号{data.cardNo&&data.cardNo.substr(data.cardNo.length-4)})</span></div>
              {
                !onlyVisible &&
                <div style={{
                  background: 'white',
                  borderRadius: '1.333rem',
                  marginLeft: 'auto',
                  padding: '0.2rem 0.5rem',
                  color: '#FE4646'
                }} onTouchEndCapture={() => {
                  if (data && data.lastRepayDays===0) {
                    Toast.info("该信用卡已到期，无法添加还款计划")
                  } else if(props.validPlanFlag&&props.validPlanFlag===true){
                    Toast.info("该信用卡有执行中还款计划，无法添加新还款计划")
                  }else {
                    history.push(`/addRepaymentPlan/${props.match.params.addr}/${props.match.params.addred}/${props.match.params.id}`)
                  }
                }}>
                  添加还款计划
                </div>
              }
            </div>
            <div style={{ width: '59%' ,fontWeight: '700', color:'white'}}>

            <div style={{ fontSize: '2.2rem'}}>{data.creditLimit || '0.00'}&nbsp;
              <span style={{ fontSize: '1.333rem',fontWeight: '100',color:'white' }}>额度</span>&nbsp;
              <span style={{marginLeft: '1.5rem' }}>{data.lastRepayDays || '0.00'}&nbsp;
                <span style={{ fontSize: '1.333rem',fontWeight: '100',color:'white'}}>天到期</span>
              </span>
            </div>
            </div>
          </div>

      </div>
  );
};

export default connect()(BankCard);
