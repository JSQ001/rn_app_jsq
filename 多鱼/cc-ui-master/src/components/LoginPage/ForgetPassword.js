import React from 'react';
import { connect } from 'dva';
import { InputItem, Toast, WhiteSpace } from 'antd-mobile';
import beijin from 'assets/img/login/Dl.png';
import shouji from 'assets/img/regist/ZC_ICO3@3x.png';
import yanzhengma from 'assets/img/regist/ZC_ICO2@3x.png';
import mima from 'assets/img/regist/ZC_ICO1@3x.png';
import zaicimima from 'assets/img/regist/ZC_ICO1@3x.png';
import back from 'assets/忘记密码/rtn-white.png';
import './Login.scss';
import { isPoneAvailable } from '../../utils/appUtils';

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


const isEmpty = function isEmpty(value) {
  return value === undefined || value === null || value === '';
};

let values = { mobile: '', authCode: '', password: '', passwordAgain: '', type: '' };


class ForgetPassword extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 60,
      liked: true,
    };
  }

  //点击出现倒计时
  handleClick = (values) => {
    //校验手机号格式是否正确
    values.mobile = values.mobile.split(" ").join("")
    if (isPoneAvailable(values.mobile) === false || isEmpty(values.mobile)) {
      Toast.info("请输入有效的手机号码", 2);
      return;
    }
    //调用发送短信验证码接口
    this.props.dispatch({
      type: 'cust/sendMessage',
      payload: {
        mobile: values.mobile,
        smsType: 'PWD'
      }
    });
    const { liked } = this.state;
    if (!liked) {
      return;
    }
    this.countDown();
  };


  countDown() {
    const { count } = this.state;
    if (count === 1) {
      this.setState({
        count: 60,
        liked: true,
      });
    } else {
      this.setState({
        count: count - 1,
        liked: false,
      });
      setTimeout(this.countDown.bind(this), 1000);
    }
  }



  //修改密码
  editPassword = (values) => {
    if (isEmpty(values.mobile)) {
      Toast.info("请输入手机号", 2);
      return;
    }
    values.mobile = values.mobile.split(" ").join("")
    if (isEmpty(values.authCode)) {
      Toast.info("请输入验证码", 2);
      return;
    }

    if (isEmpty(values.password)) {
      Toast.info("请输入密码", 2);
      return;
    }
    if(values.password.length<6){
      Toast.info("密码长度至少是6位", 2);
      return;
    }
    if (isEmpty(values.passwordAgain)) {
      Toast.info("请再次输入密码", 2);
      return;
    }
    //判断两次密码是否输入一致
    if (values.password !== values.passwordAgain) {
      Toast.info("两次密码输入不一致，请重新输入", 2);
      return;
    }
    this.props.dispatch({
      type: 'cust/editPassword',
      payload: {
        mobile: values.mobile,
        authCode: values.authCode,
        password: values.password,
        type: 'F'
      }
    });
  }


  render() {
    return (
      <div style={sectionStyle}>
        <div style={{
          height: '100px',
          color: 'white',
          fontSize: '1.167rem',
          width: '100%',
          position: 'absolute',
          top: '0px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <span style={{ width: '100px', textAlign: 'center', fontSize: '1.167rem' }}>忘记密码</span>
          <div style={{
            height: '100%',
            position: 'absolute',
            width: '100px',
            left: '0px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }} onTouchStartCapture={() => { this.props.history.goBack(-1) }} >
            <img alt='' src={back} style={{ width: '26px' }} />
          </div>
        </div>
        <div className='forgetPassbeijin controlLable'>
          <p style={{ color: '#A7D87F', fontSize: '1.333rem', padding: '2.5rem 0px 14px 0' }}>请填写账号信息并设置新密码</p>
          <div style={{ width: '100%', position: 'relative' }}>
            <InputItem className='pass' style={{ fontSize: '14px' }} type='phone' placeholder="请输入您的手机号" autoCapitalize="off" onChange={(value) => { values.mobile = value }}  >
              <img alt='' src={shouji} />
            </InputItem>
            <InputItem className='pass' style={{ fontSize: '14px' }} placeholder="请输入验证码" autoCapitalize="off" onChange={(value) => { values.authCode = value }}>
              <img alt='' src={yanzhengma} />
            </InputItem>
            <p style={{ color: '#FF8B8B', width: '95px', position: 'absolute', right: '25px', top: '57px' }} onTouchEnd={() => this.handleClick(values)}>{this.state.liked ? '获取验证码' : `${this.state.count} 秒后重发`}</p>
            <InputItem className='pass' style={{ fontSize: '14px' }} placeholder="请输入您的密码" type="password" autoCapitalize="off" onChange={(value) => { values.password = value }}>
              <img alt='' src={mima} />
            </InputItem>
            <InputItem className='pass' style={{ fontSize: '14px' }} placeholder="请再次确认您的密码" type="password" autoCapitalize="off" onChange={(value) => { values.passwordAgain = value }}>
              <img alt='' src={zaicimima} />
            </InputItem>
            <WhiteSpace />
          </div>
          <div className='forgetPasstijiao' onTouchEnd={this.editPassword.bind(this, values)}>
            确定
            </div>
        </div>
      </div>
    );
  };
}

const mapStateToProps = (state) => {
  // const {} = state.cust;
  return {
    loading: state.loading.models.cust,
  };
}

export default connect(mapStateToProps)(ForgetPassword);
