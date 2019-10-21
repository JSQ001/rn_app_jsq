import React from 'react';
import { connect } from 'dva';
import { InputItem, WhiteSpace, ActivityIndicator } from 'antd-mobile';
import beijin from 'assets/img/login/Dl.png';
import back from 'assets/忘记密码/rtn-white.png';
import zm from 'assets/实名认证/zm2.png';
import fm from 'assets/实名认证/fm2.png';
import '../LoginPage/Login.scss';
import './index.scss';
import * as storage from '../../utils/browserStorage.js';
import PageHeader from "components/common/layout/page-header";

class PersonalAuth extends React.Component {
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
  goOnFace(){
    //window.ReactNativeWebView.postMessage(`FaceKit:`)
    this.props.history.push({
      pathname: '/faceAuth',
      state: {...this.props.data}
    })
  }
  async goOn() {
    this.setState({ cameraStatus: true });
    const timestamp = new Date().getTime();
    const obj = storage.get('usr') ? JSON.parse(storage.get('usr')) : '';
    storage.put('authKey', timestamp);
    await window.ReactNativeWebView.postMessage(`idCardKit:${obj !== '' ? obj.userId : 'Error'}@${timestamp}`);
    this.timer = setTimeout(
      () => { this.setState({ cameraStatus: false }); },
      2000
    );
    console.log(this.timer)
  }
  getCamera(e) {
    e.preventDefault();
    document.getElementById('camera').click()
  }

  getFileBase64(e) {
    const identification = (v, type) => {
      this.props.dispatch({
        type: 'cust/identification',
        payload: {
          image: v,
          side: type === 0 ? 'front' : 'back'
        }
      });
    }
    const file = e.target.files[0];
    if (!file) return;
    const { imgType } = this.state;
    var reader = new FileReader(),img = new Image();

    var canvas = document.createElement('canvas');
    var context = canvas.getContext('2d');

    // base64地址图片加载完毕后
    img.onload = function () {
      // 图片原始尺寸
      var originWidth = this.width;
      var originHeight = this.height;
      // 最大尺寸限制
      var maxWidth = 1024, maxHeight = 768;
      // 目标尺寸
      var targetWidth = originWidth, targetHeight = originHeight;
      // 图片尺寸超过400x400的限制
      if (originWidth > maxWidth || originHeight > maxHeight) {
          if (originWidth / originHeight > maxWidth / maxHeight) {
              // 更宽，按照宽度限定尺寸
              targetWidth = maxWidth;
              targetHeight = Math.round(maxWidth * (originHeight / originWidth));
          } else {
              targetHeight = maxHeight;
              targetWidth = Math.round(maxHeight * (originWidth / originHeight));
          }
      }
      // canvas对图片进行缩放
      canvas.width = targetWidth;
      canvas.height = targetHeight;
      // 清除画布
      context.clearRect(0, 0, targetWidth, targetHeight);
      // 图片压缩
      context.drawImage(img, 0, 0, targetWidth, targetHeight);
      // canvas转为blob并上传
      const base64 = canvas.toDataURL(file.type || 'image/png')
      identification(base64, imgType);
    };

    reader.onload = function (e) {
      img.src = e.target.result

      const data = this.state.data;
      data[imgType] = e.target.result;

      this.setState({ data });
    }.bind(this);
    reader.readAsDataURL(file);
  }

  componentWillUnmount() {
    this.timer && clearTimeout(this.timer);
  }



  render() {
    const type = this.props.match.params.type;
    const { values, data,cameraStatus } = this.state;
    return (
      <div className='real-name-authentication'>
        <PageHeader
            title='实名认证'
            whiteBack
            style={{background: '#FF503D'}}
        />
        <div className='forgetPassbeijin personalAuth' style={{ height: '50.833rem', justifyContent: 'space-evenly' }}>
          <p style={{ fontSize: '1.333rem', marginTop: '0.833rem' }}>身份证正面</p>
          <img
                id='sfzImg'
                src={data[0]}
                className='sfzImg'
                alt=""
                style={{
                  width: '21.167rem',
                  height: '11.167rem',
                  cursor: 'pointer',
                  marginBottom: '0.833rem',
                  border: '0.083rem solid #cccccc'
                }}
                onLoad={() => {
                  // fire window resize event to change height
                  window.dispatchEvent(new Event('resize'));
                  this.setState({ imgHeight: 'auto' });
                }}
              />
              <p style={{ fontSize: '1.333rem', marginTop: '0.833rem' }}>身份证反面</p>
          <img
            id='sfzImg'
            src={data[1]}
            className='sfzImg'
            alt=""
            style={{ width: '21.167rem', height: '11.167rem', cursor: 'pointer',
            border: '0.083rem solid #cccccc'}}
            onLoad={() => {
              // fire window resize event to change height
              window.dispatchEvent(new Event('resize'));
              this.setState({ imgHeight: 'auto' });
            }}
          />
           <div style={{ width: '100%', position: 'relative' }}>
            <InputItem className='pass'
              value={values.userName} style={{ fontSize: '14px' }}
              autoCapitalize="off"
              // onChange={(value) => { values.userName = value; this.setState({ values }) }}
              >
              姓名
            </InputItem>
            <InputItem className='pass'
              value={values.idCard} style={{ fontSize: '14px' }} autoCapitalize="off"
              // onChange={(value) => { values.idCard = value; this.setState({ values }) }}
              >
              身份证
            </InputItem>
            <WhiteSpace />
          </div>
          {
            type === 'back' ?
            <div className='btn-upload' style={{
              margin: '0px'
               }} onTouchEnd={this.goOnFace.bind(this)}>
              下一步
              </div>
              :
              <div className='btn-upload' style={{
                margin: '0px'
                 }} onTouchEnd={this.goOn.bind(this)}>
                开始拍摄
              </div>
          }

        </div>

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

export default connect(mapStateToProps)(PersonalAuth);
