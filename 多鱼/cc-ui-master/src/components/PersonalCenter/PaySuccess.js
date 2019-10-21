import React, {Component} from 'react';
import { Result, Icon } from 'antd-mobile';
import beijin from 'assets/img/login/Dl.png';
import './index.scss';
import '../LoginPage/Login.scss';
import back from "assets/忘记密码/返回.png";
import {connect} from "dva";
//背景
const sectionStyle = {
    height: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'white',
  };

@connect(state=>{
  return {
    payResult:state.payment.payResult,
    loading: state.loading.models.webshop,
    list: state.webshop.list,
    vipFlag: state.webshop.vipFlag ,
    data: state.cust.data,
    msgList: state.cust.msgList
  }
})
class PaySuccess extends Component {

    render(){
        return (
            <div style={sectionStyle}>
              <div style={{
                height: '55px',
                fontSize: '1.167rem',
                width: '100%',
                position: 'absolute',
                top: '0px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
              }}>
                <div style={{
                  height: '100%',
                  width: '6.667rem',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  position: 'absolute',
                  left: '0px'
                }} onClickCapture={() => { this.props.history.goBack(-1) }}>
                  <img alt='' src={back} style={{ width: '26px', zIndex: '200' }} />
                </div>
                <div style={{ width: '100px', textAlign: 'center', fontSize: '1.167rem' }}>支付完成</div>
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
              <div className='personalAuth' style={{ height: '370px', justifyContent: 'center' }}>
              <Result
                    img={<Icon type="check-circle" className="spe" style={{ fill: '#EE614C' }} />}
                    title="支付成功"
                    message={`${this.props.payResult.amount || ''}`}
                />
                <div className='pay-success' onTouchEnd={() => this.props.history.push({ pathname: `/memberGoodsChoose/firstPage` })}>完成</div>
                <div className='return-store' onTouchEnd={() => this.props.history.push({ pathname: `/memberGoodsChoose/firstPage` })}>返回商城</div>
              </div>
            </div >
          );
    }
}

export default PaySuccess;
