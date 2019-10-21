import React from 'react';
import { connect } from 'dva';
import { InputItem, WhiteSpace, Toast, ActivityIndicator,Radio } from 'antd-mobile';
import back from 'assets/忘记密码/返回.png';
import './AcctCenter.scss';
import { isPoneAvailable } from '../../utils/appUtils';
import cardArr from '../../utils/bankUtil'
import List from "antd-mobile/es/list";
import { routerRedux } from 'dva/router';
import PageHeader from "components/common/layout/page-header";



const isEmpty = function isEmpty(value) {
  return value === undefined || value === null || value === '';
};

let values = { bankName: '', cardNo: '', mobile: '', userName: '' };


class AddSavingsCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bankName: ''
    };
  }

  componentWillMount() {
    //初始化查询当前会员信息
    this.props.dispatch({
      type: 'cust/getUserInfo',
      payload: {

      }
    });
  }



  //修改密码
  addCreditCard = (values) => {
    return (event) => {
      event.preventDefault();
      if (isEmpty(values.userName)) {
        Toast.info("请输入持卡人姓名", 2);
        return;
      }
      if (isEmpty(values.cardNo)) {
        Toast.info("请输入储蓄卡卡号", 2);
        return;
      }

      values.cardNo = values.cardNo.split(" ").join("")
      if (isEmpty(values.bankName)) {
        Toast.info("请输入银行名称", 2);
        return;
      }
      values.cardNo = values.cardNo.split(" ").join("")
      if (isEmpty(values.mobile)) {
        Toast.info("请输入手机号码", 2);
        return;
      }
      values.mobile = values.mobile.split(" ").join("")
      //校验手机号格式是否正确
      if (isPoneAvailable(values.mobile) === false) {
        Toast.info("手机号码输入错误，请重新输入", 2);
        return;
      }

      this.props.dispatch({
        type: 'cust/addDebitCard',
        payload: values
      });
    }
  }
  getBankName = (value) => {
    values.cardNo = value
    value = value.split(" ").join("")
    const newArr = cardArr.filter(v => value.startsWith(v.bin))

    if (newArr && newArr.length === 1) {
      values.bankName = newArr[0].name
      this.setState({ bankName: newArr[0].name })
    }
  }

  render() {
    const { bankName } = this.state;
    values.userName = this.props.data ? this.props.data.userName : '';
    return (
      <div style={{height: '100vh',background: "#fff"}}>
        <PageHeader title='添加储蓄卡'/>
        <div style={{ background: '#EE614C', height: '2.5rem',paddingLeft: '1.333rem', lineHeight: '2.5rem', color: 'white' }}>*请绑定持卡人本人的储蓄卡</div>
        <div style={{ height: '205px', backgroundColor: 'white' }} >
          <List>
            <InputItem moneyKeyboardAlign="right" placeholder="请输入持卡人姓名" value={values.userName} onChange={(value) => { values.userName = value }}  >
              持卡人
            </InputItem>
            <WhiteSpace style={{background: '#fff'}}/>
            <InputItem placeholder="请输入您的储蓄卡号码" type='bankCard' onChange={value => this.getBankName(value)}  >
              <span>卡号</span>
            </InputItem>
            <WhiteSpace style={{background: '#fff'}}/>
            <InputItem placeholder="请输入您的储蓄卡所属银行名称" value={bankName} readOnly>
              <span>银行名称</span>
            </InputItem>
            <WhiteSpace style={{background: '#fff'}}/>
            <InputItem placeholder="请输入您储蓄卡预留的手机号" type='phone' onChange={(value) => { values.mobile = value }} >
              <span>手机号码</span>
            </InputItem>
          </List>
        </div>
        <div style={{display: 'flex', marginLeft: '10vw', marginTop:'2vh'}}>
          <Radio className="my-radio" onChange={e => console.log('checkbox', e)}>同意《*******协议》</Radio>
        </div>
        <div className='creditBangding' onTouchEnd={this.addCreditCard(values)}>绑定</div>
        <ActivityIndicator
          toast
          animating={!!this.props.loading}
        />
      </div>
    );
  };
}

const mapStateToProps = (state) => {
  const { data } = state.cust;
  return {
    loading: state.loading.models.cust,
    data
  };
}

export default connect(mapStateToProps)(AddSavingsCard);
