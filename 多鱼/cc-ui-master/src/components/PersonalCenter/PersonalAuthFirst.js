import React from 'react';
import { connect } from 'dva';
import { ActivityIndicator, Button } from 'antd-mobile';
import back from 'assets/忘记密码/返回.png';
import zm from 'assets/实名认证/zm.png';
import fm from 'assets/实名认证/fm.png';
import '../LoginPage/Login.scss';
import * as storage from '../../utils/browserStorage.js';
import PageHeader from "components/common/layout/page-header";

//背景
const sectionStyle = {
  height: '100vh',
  //backgroundImage: `url(${beijin})`,
  backgroundSize: '100% 100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'space-around',
  backgroundColor: '#effffa'
};
class PersonalAuthFirst extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cameraStatus: false,
      data: [
        zm,
        fm
      ],
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
    const type = this.props.match.params.type
    const obj = storage.get('usr') ? JSON.parse(storage.get('usr')) : '';
    if(type === 'back'){
      this.props.dispatch({
        type: 'cust/idImageQry4FaceId',
        payload: {
          profileId: obj !== '' ? obj.userId : '',
          verfiySeq: storage.get('authKey'),
        }
      });
    }

  }
  componentWillReceiveProps(nextProps) {
    const { values, data } = this.state
    if (nextProps.data !== this.props.data) {
      values.userName = nextProps.data.result ? nextProps.data.result.realname : '';
      values.idCard = nextProps.data.result ? nextProps.data.result.idcard : '';
      values.front = nextProps.data ? nextProps.data.front : '';
      values.back = nextProps.data ? nextProps.data.back : '';
      data[0] = nextProps.data && nextProps.data.front ? nextProps.data.front : data[0];
      data[1] = nextProps.data && nextProps.data.back ? nextProps.data.back : data[1];
      this.setState({ values,data })
    }
  }

  async goOn() {
    this.setState({ cameraStatus: true })
    const timestamp = new Date().getTime();
    const obj = storage.get('usr') ? JSON.parse(storage.get('usr')) : '';
    storage.put('authKey', timestamp)
    await window.ReactNativeWebView.postMessage(`idCardKit:${obj !== '' ? obj.userId : 'Error'}@${timestamp}`)
    this.timer = setTimeout(
      () => { this.setState({ cameraStatus: false }); },
      2000
    );
  }


  componentWillUnmount() {
    this.timer && clearTimeout(this.timer);
  }



  render() {
    const { data,cameraStatus } = this.state;
    return (
      <div style={sectionStyle}>
        <PageHeader title='实名认证'/>
        <div style={{ textAlign: 'center' }}>
          <p style={{ fontSize: '28px', marginTop: '1.167rem' }}>身份证识别服务</p>
          <img
                id='sfzImg'
                src={data[0]}
                className='sfzImg'
                alt=""
                style={{
                  width: '21.167rem',
                  height: '11.167rem',
                  cursor: 'pointer',
                  marginBottom: '0.833rem'
                }}
                onLoad={() => {
                  // fire window resize event to change height
                  window.dispatchEvent(new Event('resize'));
                  this.setState({ imgHeight: 'auto' });
                }}
              />
              <p style={{ fontSize: '0.833rem', marginTop: '1.167rem' }}>即将进行身份证人像面和国徽面的扫描拍摄</p>
              </div>

              <Button type="primary" onTouchEnd={this.goOn.bind(this)} style={{ width: '80vw' }}>开始拍摄</Button>


        <ActivityIndicator
          toast
          animating={this.props.loadingCust || cameraStatus ? true : false}
        />
      </div >
    );
  };
}

const mapStateToProps = (state) => {
  const { identData, data } = state.cust;
  return {
    loading: state.loading.effects['cust/identification'],
    loadingCust: state.loading.models.cust,
    identData,
    data
  };
}

export default connect(mapStateToProps)(PersonalAuthFirst);
