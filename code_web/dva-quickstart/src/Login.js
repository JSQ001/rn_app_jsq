/* esline-disabeld */
import React from 'react';

import { connect } from 'dva';
import { Input, message, Button } from 'antd';

import './styles/login.less';

import axios from 'axios';
import { routerRedux } from 'dva/router';



@connect(({ login, languages, loading }) => ({
  login,
  languages,
  // submitting: loading.effects['login/login'],
}))
export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showResetPasswordStep1: false,
      showResetPasswordStep2: false,
      loading: false,
      username: '',
      password: '',
      loginType: '',
      client_name: '',
      qcodeValue: null,
      qcodeIsExpired: false,
      scanSuccess: false,

      accountWayLogin: true, // 账号登录
      companyWayLogin: false, // 公司登录
      companyWayLoginStep: 1, // 公司登录第一步
      UUID: null,
      isRightPerson: true, // 默认是白名单的人

      login: true, // 登录模块
      phoneEmail: false, // 输入手机号邮箱模块
      confirmCode: false, // 输入验证码模块
      newPassword: false, // 输入新密码模块
      type: 'phone', // 输入是手机号还是邮箱
      phoneNum: null, // 输入的手机号或邮箱地址
      phoneCode: null, // 获得的验证码
      firstPassword: null, // 第一次输入的新密码
      secondPassword: null, // 第二次输入的新密码
      codeTime: 60, // 验证码倒数的时间
      copyInterval: null,
      resetThenLogin: false, // 点击完确认新密码页面渲染出的登录模块

      title: '', // 停机公告：
      content: <div />, // 停机公告：
      effectiveDate: '', // 停机公告：
      endTime: '', // 停机公告：
      visible: false, // 停机公告：
      remindFlag: 1, // 停机公告：
      announceType: 200, // 停机公告：
      isShowedModal: false, // 针对停机预告，与维护公告，只展示一次，就不展示了
    };
    this.group = {};
    this.functionGroup = {};
    this.pageMap = {};
  }


  componentWillUnmount() {
    window.onresize = null;
  }

  componentDidMount() {
    // const scene = document.getElementById('scene');
    // const parallaxInstance = new Parallax(scene, {
    //   calibrateX: true,
    // });

  }

  inputUsernameHandler = evt => {
    this.setState({
      username: evt.target.value,
      loading: false,
    });
  };

  inputPasswordHandler = evt => {
    this.setState({
      password: evt.target.value,
      loading: false,
    });
  };


  login = () => {
    const { username, password } = this.state;

    this.setState({ loading: true });


    const data = {
      scope: 'read write',
      grant_type: 'password',
      username,
      password,
    };

    const formData = new FormData();

    Object.keys(data).map(key => {
      formData.append(key, data[key]);
      return key
    });

    axios({
      url: '/mock/api/oauth/token',
      method: 'POST',
      headers: {
        'x-helios-client': 'web',
        'Content-Type': 'application/x-www-form-urlencoded',
        Accept: 'application/json',
        Authorization:
          'Basic QXJ0ZW1pc1dlYjpuTENud2RJaGl6V2J5a0h5dVpNNlRwUURkN0t3SzlJWERLOExHc2E3U09X',
      },
      data: formData,
    })
      .then(res => {
        console.log(res)
       /* window.sessionStorage.setItem('token', res.data.access_token);
        window.sessionStorage.setItem('refresh_token', res.data.refresh_token);
        window.localStorage.setItem('user', JSON.stringify({ username, password, remember }));*/
       this.setState({loading: false});
       const { dispatch} = this.props;

       if(res){
         dispatch({
           type: 'user/setToken',
           token: res.data.access_token,
         });
         dispatch(
           routerRedux.replace({
             pathname: '/',
           })
         );
       }else {
         message.error('用户名或密码错误！');
         this.setState({ loading: false });
       }

      })
      .catch(e => {
        message.error('用户名或密码错误！');
        this.setState({ loading: false });
      });
  };


  redirect = () => {
    const { dispatch } = this.props;

    this.setState({ submitting: false });

    dispatch(
      routerRedux.replace({
        pathname: '/dashboard',
      })
    );
  };


  rememberChange = (e) => {
    this.setState({ remember: e.target.checked });
  }


  render() {
    const { username, password, loading} = this.state;
    return (
      <div className="login">
        <canvas width="1680" height="609" className="canvas"/>
        <canvas width="1680" height="609" className="canvas"/>
        <canvas width="1680" height="609" className="canvas"/>
        <div className="login-area">
          <div>
            <Input
              size="large"
              placeholder='用户名'
              onChange={this.inputUsernameHandler}
              value={username}
            />
            <br />
            <Input
              size="large"
              type="password"
              placeholder='密码'
              onChange={this.inputPasswordHandler}
              onPressEnter={this.login}
              value={password}
            />
            <br />
            <Button type="primary" size="large" loading={loading} onClick={this.login} >
              登录
            </Button>
            <div className="stop-annonuce-modal-wrap" />
          </div>
        </div>
        <br />
      </div>
    );
  }
}

