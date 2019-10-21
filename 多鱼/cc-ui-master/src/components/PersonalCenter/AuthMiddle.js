import React, {Component} from 'react';
import { Result, Icon,ActivityIndicator } from 'antd-mobile';
import beijin from 'assets/img/login/Dl.png';
import './index.scss';
import '../LoginPage/Login.scss';
import * as storage from '../../utils/browserStorage.js';
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

class AuthMiddle extends Component {

    constructor(props) {
      super(props);
      this.state = {
        cameraStatus: false,
      };
    }

    componentDidMount(){
      this.setState({ cameraStatus: true })
      const obj = storage.get('usr') ? JSON.parse(storage.get('usr')) : '';
      window.ReactNativeWebView.postMessage(`idCardKit:FM${obj !== '' ? obj.userId : 'Error'}@${storage.get('authKey')}`)
      this.timer = setTimeout(
        () => { this.setState({ cameraStatus: false }); },
        2000
        );
    }

    goCamora = () => {
      this.setState({ cameraStatus: true })
      const obj = storage.get('usr') ? JSON.parse(storage.get('usr')) : '';
      window.ReactNativeWebView.postMessage(`idCardKit:FM${obj !== '' ? obj.userId : 'Error'}@${storage.get('authKey')}`)
      this.timer = setTimeout(
      () => { this.setState({ cameraStatus: false }); },
      2000
      );
    }
    componentWillUnmount() {
      this.timer && clearTimeout(this.timer);
    }
    render(){
      const { cameraStatus } = this.state
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
                <span style={{ width: '100px', textAlign: 'center', fontSize: '1.167rem' }}>拍摄结果</span>
              </div>
              <div className='forgetPassbeijin personalAuth' style={{ height: '370px', justifyContent: 'center' }}>
              <Result
                    img={<Icon type="check-circle" className="spe" style={{ fill: '#1F90E6' }} />}
                    title="拍摄成功"
                />
                    <div className='forgetPasstijiao' style={{ margin: '0px 0px 15px 0px' }} onTouchEnd={() => this.goCamora()}>
            继续认证
                  </div>
          <a href='/#/firstPage' style={{  color: 'blue' }}>
            放弃本次认证
                  </a>
              </div>
              <ActivityIndicator
                toast
                animating={cameraStatus ? true : false}
              />
            </div >
          );
    }
}

export default AuthMiddle;
