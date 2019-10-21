import { useState, useEffect, useReducer, useContext } from 'react';
import back from "assets/忘记密码/返回.png";
import List from "antd-mobile/es/list";
import {ActivityIndicator, InputItem, ListView, Radio, Toast, Modal} from "antd-mobile";
import React from "react";
import {connect} from "dva";
import {Link, routerRedux} from 'dva/router';
import cardArr from "../../../utils/bankUtil";
import { globalContext, store} from "../../../index"
import { history} from '../../../index'
import { fourCardNo, bankImg,handleBankNo } from '../../../utils/appUtils';
import morenlogo from "assets/我的卡包-信用/DEFAULT_LOGO.png";
import PropTypes from "prop-types";
import shanchu from "assets/img/mine/delete.png";

const BankCardDebit = (props) =>{
  const [count, setCount] = useState(1);
  const {type} = props;

  let dataSource = new ListView.DataSource({
    getRowData: (dataBlob, sectionID, rowID) => {
      return dataBlob[sectionID][rowID]
    },
    getSectionHeaderData: (dataBlob, sectionID) => dataBlob[sectionID],
    rowHasChanged: (row1, row2) => row1 !== row2,
    sectionHeaderHasChanged: (s1, s2) => s1 !== s2,

  });
  dataSource = dataSource.cloneWithRows(props.data);

  const delCard = value => e=>{

      const { dispatch } = props;
      console.log(e,value)
      Modal.alert('', '确定删除该卡片么', [
        { text: '取消', onPress: () => console.log('cancel') },
        {
          text: '确定', onPress: () => {
            dispatch({
              type: 'cust/delCard',
              payload: value,
              types: 'CXK'
            })
          }
        },
      ])
  };

  const handleValidate = ()=>{
    const { dispatch} = store;

    //todo,手机验证码
    dispatch({
      type: 'cust/addDebitCard',
      payload: {}
    });
    dispatch(routerRedux.replace({pathname: '/bindSuccess'}));

  };
  const data = {};


  const onEndReached = ()=>{
    console.log("daodamowei1")
  }

  const row = (rowData, sectionID, rowID) => {
    const { to, src } = rowData;
    const creditArr = bankImg.find((element) => (element.label === (rowData && rowData.bankName))) || { value: morenlogo,style:'blueBackgroundColor' };
    return (
        <div key={rowID} className="bank-card-plan" style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: '90vw',
          height:'auto',
          marginBottom: 20,
          color:'white',
          flexDirection: 'column',
          background: `url(${creditArr.background})`,
          backgroundSize: '100% 100%',
        }}>
          <div style={{
            display: 'flex',
            width: '90vw',
            padding: '1.222rem 1.556rem',
          }} >
            <img alt='' src={creditArr && creditArr.value} style={{ width: '3.8rem',height:'3.8rem' }} />
            <div style={{ display:'flex',alignItems:'center', paddingLeft: '0.833rem', width:'70vw', fontSize: '1.333rem',}}>
              <div style={{width:'67vw'}}>
                {rowData.bankName||''}
                {
                  type === 'credit' && <span>(尾号{rowData.cardNo && rowData.cardNo.substr(rowData.cardNo.length - 4)})</span>
                }
              </div>
              <div style={{  }}>
                <img alt='' src={shanchu} style={{ width: '1.167rem' }} onTouchEnd={delCard(rowData.id)} />
              </div>
            </div>


          </div>
          {
            type === 'credit' ?
              <div style={{width: '90vw'}}>
                  <div style={{ display:'flex', width: '67vw', margin: '0 0 1.167rem 52pt' }}>
                    <div style={{ fontSize: '18px'}}>
                      <span style={{fontSize:20,fontWeight: 500}}>{rowData.creditLimit || '0.00'}&nbsp;</span>
                      <span style={{ fontSize: '1.333rem',fontWeight: '100' }}>额度</span>&nbsp;
                      <span style={{marginLeft: 30 }}>
                  <span style={{fontSize:20,fontWeight: 500}}>{rowData.lastRepayDays || '0.00'}&nbsp;</span>
                  <span style={{ fontSize: '1.333rem',fontWeight: '100'}}>天到期</span></span>
                    </div>
                  </div>
                  <div>
                    <Link to={`/editCreditCard/${props.match.params.addr}/${props.match.params.addred}/${rowData.id}`} className='editInfo'>
                      <div >
                        修改信息
                      </div>
                    </Link>
                    <Link to={`/repaymentPlan/${props.match.params.addr}/${props.match.params.addred}/${rowData.id}`} className='editInfo'>
                      <div >
                        还款计划
                      </div>
                    </Link>
                  </div>
              </div>
            :
              <div style={{
                width:'90vw',
                paddingLeft: '2rem',
                height: '6vh',
                fontSize: '2rem',
                color:'white'
              }}>{handleBankNo(rowData.cardNo && rowData.cardNo)}</div>
          }

        </div>
    );
  };


  return (
      <div className="bank-card-detail" style={{height: '26vh',background: "#fff"}}>
        <ListView
            dataSource={dataSource}
            renderRow={row}
            //renderSeparator={separator}
            pageSize={4}
            useBodyScroll
            scrollRenderAheadDistance={500}
            onEndReached={onEndReached}
            onEndReachedThreshold={10}
        />
      </div>
  );
};
BankCardDebit.propTypes={
  data: PropTypes.array.isRequired
};

BankCardDebit.defaultProps={
  data: [],
  type: 'debit'
};


export default connect() (BankCardDebit);

