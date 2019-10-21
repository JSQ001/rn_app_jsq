import { useState, useEffect, useReducer, useContext } from 'react';
import List from "antd-mobile/es/list";
import React from "react";
import {connect} from "dva";
import { routerRedux } from 'dva/router';
import cardArr from "../../../utils/bankUtil";
import { globalContext, store} from "../../../index"
import { fourCardNo, bankImg } from '../../../utils/appUtils';
import morenlogo from "assets/我的卡包-信用/DEFAULT_LOGO.png";
import PropTypes from 'prop-types';

const BankCardDetail = (props) =>{
  const [count, setCount] = useState(1);
  let {data} = props;
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
    console.log( store);
    const { dispatch} = store;

    //todo,手机验证码
    dispatch({
      type: 'cust/addDebitCard',
      payload: {}
    });
    dispatch(routerRedux.replace({pathname: '/bindSuccess'}));

  };
  const creditArray = props.creditList ? props.creditList : [];
  const creditArr = bankImg.find((element) => (element.label === (data.bankName))) || { value: morenlogo,style: 'blueBackgroundColor' };

  return (
      <div style={{height: '26vh',background: "#fff"}}>

        <div className='bank-card-plan' style={{background: 'pink'}}>
          <div style={{ width: '15%', textAlign: 'center', marginTop: '-2.5rem' }} >
            <img alt='' src={creditArr && creditArr.value} style={{ width: '2.5rem' }} />
          </div>
          <div style={{ width: '59%' ,fontWeight: '700', color:'white'}}>
            <div style={{ fontSize: '1.333rem' }}>{data.bankName||''}<span>(尾号{data.cardNo&&data.cardNo.substr(data.cardNo.length-4)})</span>
            </div>
            <div style={{ height: '2.5rem', marginTop: '18px', }}>
              <div style={{ fontSize: '18px'}}>{data.creditLimit || '0.00'}&nbsp;
                <span style={{ fontSize: '1.333rem',fontWeight: '100',color:'white' }}>额度</span>&nbsp;
                <span style={{marginLeft: 30 }}>{data.lastRepayDays || '0.00'}&nbsp;
                  <span style={{ fontSize: '1.333rem',fontWeight: '100',color:'white'}}>天到期</span>
                  </span>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
};

BankCardDetail.propTypes={
  data: PropTypes.array.isRequired
};

BankCardDetail.defaultProps={
  data: []
};


export default connect() (BankCardDetail);
