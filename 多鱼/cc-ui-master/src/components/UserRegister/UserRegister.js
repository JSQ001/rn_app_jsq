import React from 'react';
import { connect } from 'dva';
import { InputItem, Toast, WhiteSpace } from 'antd-mobile';
// import beijin from 'assets/登录页/背景.png';
import yanzhengma from 'assets/img/regist/ZC_ICO2@3x.png';
import shouji from 'assets/img/regist/ZC_ICO3@3x.png';
import reHeader from 'assets/img/regist/registHeader.png';
import zcBt from 'assets/img/regist/ZC_Bt@3x.png';
import mima from 'assets/img/regist/ZC_ICO1@3x.png';
import './User.css';
import { isPoneAvailable } from '../../utils/appUtils';

//背景
const sectionStyle = {
  width: "100%",
  // backgroundImage: `url(${beijin})`,
  background:'#A7D87F',
  backgroundSize: '100% 100%',
  top: '0px',
  bottom: '0px',
  overflowY: 'auto'
};


const isEmpty = function isEmpty(value) {
  return value === undefined || value === null || value === '';
};

let values = { mobile: '', authCode: '', password: '', recommend: '' };

class UserRegister extends React.Component {

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
    if (isPoneAvailable(values.mobile) === false || isEmpty(values.mobile)) {
      Toast.info("请输入有效的手机号码", 2);
      return;
    }
    const { liked } = this.state;
    if (!liked) {
      return;
    }
    //调用发送短信验证码接口
    this.props.dispatch({
      type: 'application/sendMessage',
      payload: {
        mobile: values.mobile,
        smsType: 'REG'
      }
    });
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





  addUser = (values) => {
    values.recommend = this.props.match.params.recommend;
    if (isEmpty(values.mobile)) {
      Toast.info("请输入手机号", 2);
      return;
    }
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
    this.props.dispatch({
      type: 'cust/register',
      payload: values,
    });
  }

  downApp = () =>{
    const u = navigator.userAgent;
    let downloadUrl;
    if(u.indexOf('Android') > -1 || u.indexOf('Adr') > -1){
      downloadUrl = "https://wmemall.com/release.apk";
    }else{
      downloadUrl = "https://www.fenfa51.com/YTBS2";
    }
    window.location.href=downloadUrl
  }




  render() {
    return (
      <div style={sectionStyle}>
        <img src={reHeader} style={{width:'100%',top:'0px'}} alt=''/>
        <div style={{ textAlign:'center',marginTop: '-90px'}}>
          <img src={zcBt} style={{ width:'63%'}} alt=''/>
          <div style={{ background:'#80B653',color: 'white', fontSize: '1.167rem', width: '63%',margin:'0 auto',display: 'inline-table',marginTop: '13px',borderRadius: '29px'}}>
            <p>购买消费更有会员优惠</p>
          </div>
          <div style={{color: 'white',fontSize:'1.167rem',fontWeight:'Regular',lineHeight: '0.833rem', marginTop: '2.5rem'}}>
            <p>一个APP，还款名下所有信用卡</p>
            <p>一万元最高仅需85元，提额神速</p>
          </div>
        </div>

        <br />
        <div className='registBlock' style={{
          alignItems: 'unset',
          marginBottom: '4.167rem',
          position: 'relative'}}>
          <p style={{ fontSize: '24px', color: '#222222', fontWeight: '600', marginTop: '25px' }}>
            <span style={{ color:'#A7D87F',fontSize:'1.333rem'}}>——</span>&nbsp;&nbsp;&nbsp;新用户注册&nbsp;&nbsp;&nbsp;<span style={{ color:'#A7D87F',fontSize:'1.333rem'}}>——</span>
          </p>
          <div style={{ marginTop: '-75px' }}>
            <InputItem className='register1' labelNumber={2} style={{ fontSize: '1.333rem' }} placeholder="请输入您的手机号" autoCapitalize="off" onChange={(value) => { values.mobile = value }}  >
              <img style={{ width: '26px', height: '26px' }} alt='' src={shouji} />
            </InputItem>
            <div style={{height: '44px', width: '100%',marginTop: '1.167rem'}}>
              <InputItem className='register2' labelNumber={2} style={{ fontSize: '1.333rem'}} placeholder="请输验证码" autoCapitalize="off" onChange={(value) => { values.authCode = value }}>
                <img style={{ width: '26px', height: '26px' }} alt='' src={yanzhengma} />
              </InputItem>
              <p style={{ color: '#FF8B8B', float:'left' }} onTouchEnd={() => this.handleClick(values)}>{this.state.liked ? '获取验证码' : `${this.state.count} 秒后重发`}</p>
            </div>
            <InputItem className='register3' labelNumber={2}style={{ fontSize: '1.333rem' }} placeholder="请输入您的密码" type="password" autoCapitalize="off" onChange={(value) => { values.password = value }}>
              <img style={{ width: '26px', height: '26px' }} alt='' src={mima} />
            </InputItem>
            <WhiteSpace />
          </div>
          <div className='registerButton' onTouchEnd={() => this.addUser(values)}>
            注册
                </div>
          <p style={{ marginTop: '25px',color:'#222222' }}>请先注册账号，然后下载APP即可直接登录</p>
          <div className='registerDowload' onTouchStart={this.downApp.bind(this)} >
            点击下载APP
                </div>
        </div>
      </div>
    );
  };
}

const mapStateToProps = (state) => {
  const { data } = state.application;
  return {
    loading: state.loading.models.application,
    data
  };
}

export default connect(mapStateToProps)(UserRegister);
