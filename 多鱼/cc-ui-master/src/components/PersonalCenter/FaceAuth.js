import React from 'react';
import { connect } from 'dva';
import { ActivityIndicator } from 'antd-mobile';
import beijin from 'assets/img/login/Dl.png';
import back from 'assets/忘记密码/rtn-white.png';
import renlian from 'assets/实名认证/renlian.png';
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
class FaceAuth extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cameraStatus: false,
      imgType: 0,
      values: {
        userName: '',
        idCard: '',
        front: '',
        back: ''
      },
    };
  }

  componentDidMount() {
    // 阻止双击放大
    var lastTouchEnd = 0;
    document.addEventListener('touchstart', function (event) {
      if (event.touches.length > 1) {
        event.preventDefault();
      }
    });
    document.addEventListener('touchend', function (event) {
      var now = (new Date()).getTime();
      if (now - lastTouchEnd <= 300) {
        event.preventDefault();
      }
      lastTouchEnd = now;
    }, false);
    document.addEventListener('gesturestart', function (event) {
      event.preventDefault();
    });

  }

  goOnFace(){
    this.setState({ cameraStatus: true });
    const { data: {result} } = this.props;
    window.ReactNativeWebView.postMessage(`FaceKit:${result ? result.realname : ''}@${result ? result.idcard : ''}`)
    this.timer = setTimeout(
      () => { this.setState({ cameraStatus: false }); },
      2000
    );
  }

  componentWillUnmount() {
    this.timer && clearTimeout(this.timer);
  }




  render() {
    const { cameraStatus } = this.state;
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
          <span style={{ width: '100px', textAlign: 'center', fontSize: '1.167rem' }}>实名认证</span>
          <div style={{
            height: '100px',
            position: 'absolute',
            width: '6.667rem',
            left: '0px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }} onClickCapture={() => { this.props.history.goBack(-1)}} >
            <img alt='' src={back} style={{ width: '26px' }} />
          </div>
        </div>
        <div className='forgetPassbeijin personalAuth' style={{ height: '482px', justifyContent: 'space-evenly' }}>
          <p style={{ fontSize: '1.333rem', padding: '0px 0px 5px 0', marginTop: '1.167rem' }}>点击按钮开始人脸识别</p>
          <img
                id='sfzImg'
                src={renlian}
                className='sfzImg'
                alt=""
                style={{
                  width: '21.167rem',
                  cursor: 'pointer',
                  marginBottom: '0.833rem'
                }}
                onLoad={() => {
                  // fire window resize event to change height
                  window.dispatchEvent(new Event('resize'));
                  this.setState({ imgHeight: 'auto' });
                }}
              />
            <div className='forgetPasstijiao' style={{
              margin: '0.833rem 0 0 0'
               }} onTouchEnd={this.goOnFace.bind(this)}>
              进行人脸识别
              </div>
        </div>

        <ActivityIndicator
          toast
          animating={this.props.loading || cameraStatus ? true : false}
        />
      </div >
    );
  };
}

const mapStateToProps = (state) => {
  const { data } = state.cust;
  return {
    loading: state.loading.effects['cust/identification'],
    data
  };
}

export default connect(mapStateToProps)(FaceAuth);
