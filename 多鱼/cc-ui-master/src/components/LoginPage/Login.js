import React, { Component } from 'react';
import { connect } from 'dva';
import { InputItem, Toast, ActivityIndicator, Picker,List } from 'antd-mobile';
import shouji from 'assets/img/login/Dl_Yh@3x.png';
import beijin from 'assets/img/login/Dl.png';
import mima from 'assets/img/login/Dl_Mm@3x.png';
import './Login.scss';
import { Link } from 'dva/router';
import { useState, useEffect, useReducer, useContext } from 'react';


let values = { username: '', password: '' };

const isEmpty = function isEmpty(value) {
  return value === undefined || value === null || value === '';
};

const login = (values, dispatch) => {

  return (event) => {
    event.preventDefault();
    values = {
      ...values,
      username: values.username.split(" ").join("")
    };

    if (isEmpty(values.username)) {
      Toast.info("用户名不能为空", 2);
      return;
    }

    if (isEmpty(values.password)) {
      Toast.info("密码不能为空", 2);
      return;
    }
    dispatch({
      type: 'application/login',
      payload: values
    });
  }
};



const Login = props => {

  const [username,setUsername] = useState('');
  const [password,setPassword] = useState('');
  const [isPassword,setIsPassword] = useState(true);


  const seasons = [
    [
      {
        label: '+86',
        value: '+86',
      },
    ],
  ];
  console.log(isPassword)
  return (
      <div className='login-index'>
        <div style={{
          width: '90vw',
          height:'25vh',
          color:'#333333',
          margin: '12vh auto 0',

        }}>
          <div className='title'>您好，</div>
          <div className='title'>欢迎来到多鱼</div>
        </div>
        <div className="login-content">


          <div style={{
                  display: 'flex',
                  borderBottom:'1px solid #ebebeb'
          }}>
            <Picker
                data={seasons}
                cascade={false}
                extra="+86"
                // value={this.state.sValue}
                //onChange={v => this.setState({ sValue: v })}
                // onOk={v => this.setState({ sValue: v })}
            >
              <List.Item arrow="down"/>
            </Picker>
            <InputItem className='login-input login-input-phone'
                       style={{ fontSize: '2rem', color:'#333333', borderBottom: '1px solid #ebebeb' }}
                       placeholder="请输入您的手机号"
                       type='phone'
                       autoCapitalize="off"
                       autoComplete="off"
                       onChange={(value) => { values.username = value }}>
            </InputItem>
          </div>
          {
            isPassword &&
            <InputItem
                className='login-input login-input-password'
               style={{ fontSize: '2rem', color:'#333333'}}
               placeholder="请输入您的密码" type="password"
               autoCapitalize="off" autoComplete="off"
               onChange={(value) => { values.password = value }}/>
          }
          <div className='anniu' onClick={login(values, props.dispatch)}>
            {isPassword ? '登录' : '下一步'}
          </div>
          <div className='login-tips'>
            <div>
             {/* {isPassword ? '验证码登录' : '账户密码登录'}*/}
            </div>
            <div className='forgetPassword'>
              <Link to={`/getAcctNum`} className='getAcctNum'  style={{ fontSize: '1.333rem' }}>没有账号?马上注册</Link>
              <Link to={`/forgetPassword`} style={{ marginLeft: '1rem',color: '#FF503D', fontSize: '1.333rem' }}>忘记密码?</Link>
            </div>
          </div>

        </div>
        <ActivityIndicator
          toast
          animating={!!props.loading}
        />
      </div>
    )
};

const mapStateToProps = (state) => {
  return {
    loading: state.loading.models.application,
  };
}

export default connect(mapStateToProps)(Login);
