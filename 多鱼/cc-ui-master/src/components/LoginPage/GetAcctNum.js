import React from 'react';
import { connect } from 'dva';
import { InputItem, Toast } from 'antd-mobile';
import beijin from 'assets/img/login/Dl.png';
import back from 'assets/忘记密码/rtn-white.png';
import erweima from 'assets/账号获取/erweima.jpg';
import './Login.scss';
import copy from 'copy-to-clipboard';

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

class GetAcctNum extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '多鱼life'
    };
  }


  copyText = () => {
    copy(this.state.text);
    return Toast.info("复制成功");
  }

  render() {
    //   let values = {phoneNum: '',VerificationCode:'', password: '', passwordAgain:''};
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
          <span style={{ width: '100px', textAlign: 'center', fontSize: '1.167rem' }}>账号获取</span>
          <div style={{
            height: '100%',
            position: 'absolute',
            width: '100px',
            left: '0px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }} onClickCapture={() => { this.props.history.goBack(-1) }} >
            <img alt='' src={back} style={{ width: '26px' }} />
          </div>
        </div>
        <div className='forgetPassbeijin'>
          <p style={{ marginTop: '40px', color: '#A7D87F', fontSize: '1.167rem' }}>感谢您关注多鱼</p>
          <p style={{ color: '#A7D87F', fontSize: '1.333rem' }}>欢迎您加入交流群获取您的会员资格</p>
          <img alt='' src={erweima} style={{ width: '45%', marginTop: '2.5rem' }} />
          <div >
            <InputItem className='qunhao' style={{ textAlign: 'center', fontSize: '18px', color: '#A7D87F' }} autoCapitalize="off" defaultValue={this.state.text}>
            </InputItem>
          </div>
          <div className='forgetPasstijiao' style={{ marginTop: '35px', fontSize: '18px' }}
            onTouchEnd={this.copyText}
          >
            点击复制群号
          </div>

        </div>
      </div>
    );
  };
}

const mapStateToProps = (state) => {
  return {
    loading: state.loading.models.application,
  };
}

export default connect(mapStateToProps)(GetAcctNum);
