import React from 'react';
import { connect } from 'dva';
import { InputItem, WhiteSpace, Toast, ActivityIndicator } from 'antd-mobile';
import back from 'assets/忘记密码/返回.png';
import './Balance.css';
import * as storage from '../../utils/browserStorage.js';
import PageHeader from "../common/layout/page-header";

// let values = { otherAccount: '', transferAmount: '', authCode: '' };

const isEmpty = function isEmpty(value) {
  return value === undefined || value === null || value === '';
};

class Transfer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 60,
      liked: true,
      checkTitle: '账户验证',
      otherAccount: '',
      transferAmount: '',
      authCode:''
    };
  }


  //点击出现倒计时
  handleClick = () => {

    // const {sendMsg} = this.props;
    const { liked } = this.state;
    if (!liked) {
      return;
    }
    //调用发送短信验证码接口
    this.props.dispatch({
      type: 'cust/sendMessage',
      payload: {
        mobile: storage.get('username'),
        smsType: 'TRX'
      }
    });
    this.countDown();
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.data !== this.props.data) {
      if (nextProps.data && nextProps.data.respCode === "000000") {
        this.setState({
          checkTitle: '校验成功'
        });
      } else {
        this.setState({
          checkTitle: '校验失败'
        });
      }
    }
  }


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

  //校验账户
  checkAcct = () => {
    if (isEmpty(this.state.otherAccount)) {
      return Toast.info("对方账户不能为空", 2);
    }
    // values.otherAccount = values.otherAccount.split(" ").join("")
    this.props.dispatch({
      type: 'repayacct/checkRelMobile',
      payload: this.state.otherAccount.split(" ").join("")
    });
  }

  //转账校验
  transfer = () => {
    if (this.state.checkTitle === '账户验证') {
      return Toast.info("请先进行账户验证", 2);
    }
    if(this.state.checkTitle !== '校验成功'){
      return Toast.info("校验账户失败，请重新输入", 2);
    }
    if (isEmpty(this.state.authCode)) {
      return Toast.info("验证码不能为空", 2);
    }
    if (isEmpty(this.state.transferAmount)) {
      return Toast.info("转账金额不能为空", 2);
    }
    if (this.state.transferAmount > 331 || this.state.transferAmount < 0) {
      return Toast.info("转账金额必须大于0且小于331", 2);
    }
    this.props.dispatch({
      type: 'repayacct/transfer',
      payload: {
        authCode: this.state.authCode,
        mobile: this.state.otherAccount.split(" ").join(""),
        amount: this.state.transferAmount
      }
    });
  }


  render() {
    return (
      <div className="transfer" style={{ height: '100vh', }}>
        <PageHeader title='转账' whiteBack style={{color: 'white', background: '#EE614C'}}/>

        <div style={{ height: '52px', backgroundColor: 'white', marginTop: '0.833rem' }}>
          <div style={{ paddingTop: '0.833rem' }} className='intoBalance'>
            <InputItem placeholder="对方账户" autoCapitalize="off" type='phone' onChange={(value) => { this.setState({checkTitle: '账户验证',otherAccount:value}) }}>
            </InputItem>
            <WhiteSpace />
          </div>
        </div>
        <div style={{ height: '90px', backgroundColor: 'white', marginTop: '0.833rem' }}>
          <div style={{ paddingTop: '0.833rem' }} className='intoBalance'>
            <InputItem className="transfer-account" style={{ borderBottom: '0.083rem solid'}} placeholder="请输入金额" autoCapitalize="off"
              type="money" onChange={(value) => { this.setState({transferAmount:value}) }}  >
              <span style={{ fontSize: '36px', fontWeight: 'bold' }}>￥</span>
            </InputItem>
            <WhiteSpace />
          </div>
          <p style={{ marginLeft: '1.167rem', marginTop: '-2px',color: 'rgb(159,159,159)' }}>注：单笔转账最多331，验证码每天最多获取10条</p>
        </div>
        <div style={{ height: '54px', backgroundColor: 'white', marginTop: '0.833rem' }}>
          <div style={{ paddingTop: '0.833rem' }} className='intoBalance'>
            <InputItem placeholder="请输入验证码" autoCapitalize="off" onChange={(value) => { this.setState({authCode:value}) }} >
            </InputItem>
            <WhiteSpace />
          </div>
        </div>
        <p style={{
          width: '66px',
          position: 'absolute',
          right: '0px',
          top: '98px',
          color: '#FF8B8B'
        }}
          onTouchEnd={() => this.checkAcct()}>{this.state.checkTitle}</p>
        <p style={{
          width: '82px',
          position: 'absolute',
          right: '0px',
          top: '263px',
          color: '#FF8B8B'
        }}
          onTouchEnd={() => this.handleClick()}>{this.state.liked ? '获取验证码' : `${this.state.count} 秒后重发`}</p>
        <div className='querenWithdrawal' onTouchEnd={this.transfer.bind()}>
          确认转账
                </div>

        <ActivityIndicator
          toast
          text='加载中...'
          animating={this.props.loading ? true : false}
        />
      </div>
    );
  };
}

const mapStateToProps = (state) => {
  const { data } = state.repayacct;
  return {
    loading: state.loading.models.repayacct,
    data
  };
}

export default connect(mapStateToProps)(Transfer);
