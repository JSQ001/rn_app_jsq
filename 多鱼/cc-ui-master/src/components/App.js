import React from 'react';
import { connect } from 'dva';
import { Button, WingBlank, WhiteSpace } from 'antd-mobile';
import './App.css';

const PlaceHolder = ({ className = '', ...restProps }) => (
  <div className={`${className} placeholder`} {...restProps}>Block</div>
);

const WingBlankExample = (props) => (
  <div style={{ padding: '15px 0' }}>
    <WingBlank><PlaceHolder /></WingBlank>

    <WhiteSpace size="lg" />
    <WingBlank size="md"><PlaceHolder /></WingBlank>

    <WhiteSpace size="lg" />
    <WingBlank size="sm"><PlaceHolder /></WingBlank>

    <WhiteSpace size="lg" />
    <WingBlank><Button type="primary" onTouchEnd={() => props.dispatch({ type: 'application/logout' })}>登出</Button></WingBlank>
    <WingBlank><Button type="primary" style={{ marginTop: '5px' }} onTouchEnd={() => window.ReactNativeWebView.postMessage('share')}>分享</Button></WingBlank>
    <WingBlank><Button type="primary" style={{ marginTop: '5px' }} onTouchEnd={() => window.ReactNativeWebView.postMessage('pay')}>支付</Button></WingBlank>
  </div>
);

const mapStateToProps = (state) => {
  return {
    loading: state.loading.models.application,
  };
}

export default connect(mapStateToProps)(WingBlankExample);
