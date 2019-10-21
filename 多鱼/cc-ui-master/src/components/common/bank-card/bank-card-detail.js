import { useState, useEffect, useReducer, useContext } from 'react';
import back from "assets/忘记密码/返回.png";
import List from "antd-mobile/es/list";
import {ActivityIndicator, InputItem, ListView, Radio, Toast, WhiteSpace} from "antd-mobile";
import React from "react";
import {connect} from "dva";
import {Link, routerRedux} from 'dva/router';
import cardArr from "../../../utils/bankUtil";
import { globalContext, store} from "../../../index"
import { history} from '../../../index'
import { fourCardNo, bankImg } from '../../../utils/appUtils';
import morenlogo from "assets/我的卡包-信用/DEFAULT_LOGO.png";
import PropTypes from "prop-types";

const BankCardDetail = (props) =>{
  const [count, setCount] = useState(1);

  let dataSource = new ListView.DataSource({
    getRowData: (dataBlob, sectionID, rowID) => {
      return dataBlob[sectionID][rowID]
    },
    getSectionHeaderData: (dataBlob, sectionID) => dataBlob[sectionID],
    rowHasChanged: (row1, row2) => row1 !== row2,
    sectionHeaderHasChanged: (s1, s2) => s1 !== s2,

  });
  dataSource = dataSource.cloneWithRows(props.data);

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
  const data = {};

  const creditArray = props.creditList ? props.creditList : [];
  const creditArr = bankImg.find((element) => (element.label === (data.bankName))) || { value: morenlogo,style: 'blueBackgroundColor' };

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
          width: '100vw',
          marginBottom: '0.833rem'
        }}>

          <div style={{ width: '15%', textAlign: 'center', marginTop: '-2.5rem' }} >
              <img alt='' src={creditArr && creditArr.value} style={{ width: '2.5rem' }} />
          </div>
          <div style={{ width: '59%' ,fontWeight: '700', color:'white'}}>
            <div style={{ fontSize: '1.333rem' }}>{rowData.bankName||''}<span>(尾号{rowData.cardNo&&rowData.cardNo.substr(rowData.cardNo.length-4)})</span>
            </div>
            <div style={{ height: '2.5rem', marginTop: '18px', }}>
              <div style={{ fontSize: '18px'}}>{rowData.creditLimit || '0.00'}&nbsp;
                <span style={{ fontSize: '1.333rem',fontWeight: '100',color:'white' }}>额度</span>&nbsp;
                <span style={{marginLeft: 30 }}>{rowData.lastRepayDays || '0.00'}&nbsp;
                  <span style={{ fontSize: '1.333rem',fontWeight: '100',color:'white'}}>天到期</span>
                </span>
              </div>
            </div>
          </div>

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
BankCardDetail.propTypes={
  data: PropTypes.array.isRequired
};

BankCardDetail.defaultProps={
  data: []
};


export default connect() (BankCardDetail);

