import React from 'react';
import { connect } from 'dva';
import { InputItem, Toast, ActivityIndicator,Picker, List } from 'antd-mobile';
import back from 'assets/忘记密码/返回.png';
import morenlogo from 'assets/我的卡包-信用/DEFAULT_LOGO.png';
import './Reimbursement.scss';
import { fourCardNo,bankImg, haveYear } from '../../utils/appUtils';
import '../MyselfAcctCenter/AcctCenter.scss';
import BankCard from "../MyselfAcctCenter/bankCard";
import PageHeader from "components/common/layout/page-header";


let values = { cvn2: '', cardExpire: '', mobile: '', messageCode: '' };

let bankInfo = {};

const isEmpty = function isEmpty(value) {
  return value === undefined || value === null || value === '';
};

class ConfirmRepayPlan extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 60,
      liked: true,
      haveYearD: ''
    };
  }

  componentWillMount() {
    //初始化查询信用卡信息
    this.props.dispatch({
      type: 'cust/getCreditCardList',
      payload: {
        pageSize: 20,
        pageNo: 1
      }
    });



    //初始化查询当前登录用户信息
    this.props.dispatch({
      type: 'cust/getUserInfo',
    });
  }

  componentWillUnmount(){
    values = { cvn2: '', cardExpire: '', mobile: '', messageCode: '' };
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
      type: 'payment/bindCard4Code',
      payload: {
        bankName: bankInfo.bankName,
        cardNo: bankInfo.cardNo.split(" ").join(""),
        cardExpire: values.cardExpire,
        channelId: this.props.match.params.channlId,
        cvn2: values.cvn2,
        idCard: this.props.data && this.props.data.idCard ? this.props.data.idCard : '',
        merchantNo: this.props.match.params.merchantNo,
        mobile: values.mobile.split(" ").join(""),
        userName: this.props.data && this.props.data.userName ? this.props.data.userName : '',
      }
    });
    this.countDown();
  };


  countDown() {
    if(this.props.stopFlag&&this.props.stopFlag==='0'){
      this.setState({
        count: 60,
        liked: true,
      });
      return;
    }
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


  //权限确认
  confirm = (values) => {
    if (isEmpty(values.cvn2)) {
      Toast.info("请输入安全码", 2);
      return;
    }
    if (isEmpty(values.cardExpire)) {
      Toast.info("请输入有效期", 2);
      return;
    }
    if (isEmpty(values.mobile)) {
      Toast.info("请输入手机号", 2);
      return;
    }
    values.mobile = values.mobile.split(" ").join("")
    if (isEmpty(values.messageCode)) {
      Toast.info("请输入验证码", 2);
      return;
    }
    this.props.dispatch({
      type: 'payment/bindCard4Comfirm',
      payload: {
        channelId: this.props.confirmData && this.props.confirmData.channelId ? this.props.confirmData.channelId : '',
        merchantNo: this.props.match.params.merchantNo,
        messageCode: values.messageCode,
        paymentSeq: this.props.confirmData && this.props.confirmData.paymentSeq ? this.props.confirmData.paymentSeq : '',
      },
      id: this.props.match.params.id
    });
  }


  render() {
    const {haveYearD} = this.state

    //定义数组查询对应的信用卡信息
    const creditArray = this.props.creditList ? this.props.creditList : [];
    const creditArr = creditArray.find((element) => (element.id === Number(this.props.match.params.id)));
    bankInfo = creditArr;

    values.cardNo = creditArr && creditArr.cardNo ? creditArr.cardNo.split(" ").join("") : '';
    const bankArr = bankImg.find((element) => (element.label === (creditArr && creditArr.bankName))) || { value: morenlogo,style: 'blueBackgroundColor' };
    return (
      <div style={{ paddingBottom: '65px',background:'#fff'}}>
        <PageHeader title='设置还款计划'/>
        <BankCard data={creditArr} onlyVisible/>
        <div style={{ margin: '35px auto',paddingTop: '5vh', borderTop:'0.083rem solid #ccc', position: 'relative',width:'95%' }}>
          <InputItem style={{textAlign:'left', height: 36,border: '0.083rem solid #ccc' }} placeholder="信用卡背后CVN2后的三位数字" autoCapitalize="off" onChange={(value) => { values.cvn2 = value }}  >
            <span>安全码</span>
          </InputItem>
          <Picker
                data={haveYear()}
                title = '选择有效期'
                cols ={2}
                cascade={false}
                value={haveYearD}
                onChange={v => { values.cardExpire = v[1] + v[0]; this.setState({ haveYearD: v })}}>
                <List.Item  arrow="horizontal" >有效期</List.Item>
            </Picker>
          <InputItem style={{textAlign:'left', height: 36,border: '0.083rem solid #ccc' }} placeholder="请输入银行预留手机号" type='phone' autoCapitalize="off" onChange={(value) => { values.mobile = value }}  >
            <span>手机号码</span>
          </InputItem>
          <InputItem style={{textAlign:'left', height: 36,border: '0.083rem solid #ccc' }} placeholder="请输入验证码" autoCapitalize="off" onChange={(value) => { values.messageCode = value }}  >
            <span>验证码</span>
          </InputItem>
          <p style={{ color: '#FF8E8E', position: 'absolute', right: '23px', top: '24.6vh' }} onTouchEnd={() => this.handleClick()}>{this.state.liked ? '获取验证码' : `${this.state.count} 秒后重发`}</p>
        </div>

        <div className='querenRepayPlan'
          style={{ width: '300px', height: '40px', margin: '0 auto', fontSize: '18px', lineHeight: '38px', marginTop: '5rem', }}
          onTouchEnd={() => this.confirm(values)}>
          确认
            </div>
        <ActivityIndicator
          toast
          animating={!!this.props.loadingpayment}
        />
      </div>
    );
  };
}

const mapStateToProps = (state) => {
  const { creditList, data } = state.cust;
  const { confirmData,stopFlag } = state.payment;
  return {
    loading: state.loading.models.cust,
    loadingpayment: state.loading.models.payment,
    creditList,
    data,
    confirmData,
    stopFlag
  };
}

export default connect(mapStateToProps)(ConfirmRepayPlan);
