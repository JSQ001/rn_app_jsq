import React, { Component } from 'react';
import { Result, Icon } from 'antd-mobile';
import beijin from 'assets/img/login/Dl.png';
import './index.scss';
import '../LoginPage/Login.scss';
//背景
const sectionStyle = {
  height: '100vh',
  backgroundImage: `url(${beijin})`,
  backgroundSize: '100% 100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center'
};

class PayFail extends Component {

  render() {
    return (
      <div style={sectionStyle}>
        <div style={{
          height: '55px',
          color: 'white',
          fontSize: '1.167rem',
          width: '100%',
          position: 'absolute',
          top: '0px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <span style={{ width: '100px', textAlign: 'center', fontSize: '1.167rem' }}>支付结果</span>
          {/* <div style={{
                  height: '55px',
                  position: 'absolute',
                  width: '55px',
                  left: '0px',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center'
                }} onClickCapture={() => { this.props.history.goBack(-1) }} >
                  <img alt='' src={back} style={{ width: '14px' }} />
                </div> */}
        </div>
        <div className='forgetPassbeijin personalAuth' style={{ height: '370px', justifyContent: 'center' }}>
          <Result
            img={<Icon type="cross-circle-o" className="spe" style={{ fill: '#1F90E6' }} />}
            title="支付失败"
            message="本次支付失败，请重新支付"
          />
          <div className='forgetPasstijiao' style={{ marginTop: '2.5rem' }} onTouchEnd={() => this.props.history.push('/firstPage')}>
            返回首页
                  </div>
        </div>
      </div >
    );
  }
}

export default PayFail;
