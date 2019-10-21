import React from 'react';
import { connect } from 'dva';
import { InputItem, WhiteSpace, Toast, ActivityIndicator,Picker, List } from 'antd-mobile';
import back from 'assets/忘记密码/返回.png';
import './AcctCenter.scss';
import cardArr from '../../utils/bankUtil'
import { seasons } from '../../utils/appUtils';
import PageHeader from "components/common/layout/page-header";


let values = { bankName: '', cardNo: '', creditlimit: '', cycleDay: '', mobile: '', repayDay: '', userName: '' };

const isEmpty = function isEmpty(value) {
  return value === undefined || value === null || value === '';
};


class AddCreditCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cycleDay: '',
      repayDay: ''
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
        Toast.info("请输入信用卡卡号", 2);
        return;
      }

      values.cardNo = values.cardNo.split(" ").join("")
      if (isEmpty(values.bankName)) {
        Toast.info("请输入银行名称", 2);
        return;
      }
      if (isEmpty(values.mobile)) {
        Toast.info("请输入手机号码", 2);
        return;
      }
      values.mobile = values.mobile.split(" ").join("")
      if (isEmpty(values.cycleDay)) {
        Toast.info("请输入账单日期", 2);
        return;
      }
      if (isEmpty(values.repayDay)) {
        Toast.info("请输入还款日期", 2);
        return;
      }
      if (isEmpty(values.creditlimit)) {
        Toast.info("请输入额度信息", 2);
        return;
      }
      this.props.dispatch({
        type: 'cust/addCreditCard',
        payload: {
          values,
          addr: this.props.match.params.addr,
          addred: this.props.match.params.addred
        }
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
    const { bankName, cycleDay, repayDay } = this.state;
    values.userName = this.props.data ? this.props.data.userName : '';
    return (
      <div className="add-credit-card">
        <PageHeader title='添加信用卡'/>

        <div className="add-tips">*请绑定持卡人本人的银行卡</div>
        <div className='add-input-area'>
          <InputItem value={values.userName} onChange={(value) => { values.userName = value }}  >
            <span>持卡人</span>
          </InputItem>
          <WhiteSpace />
          <InputItem placeholder="请输入您的信用卡号码" type='bankCard' onChange={value => this.getBankName(value)}  >
            <span>卡号</span>
          </InputItem>
          <WhiteSpace />
          <InputItem placeholder="请输入信用卡所属银行名称" value={bankName} readOnly>
            <span>银行名称</span>
          </InputItem>
          <WhiteSpace />
          <InputItem placeholder="请输入您信用卡预留的手机号" type='phone' onChange={(value) => { values.mobile = value }} >
            <span>手机号码</span>
          </InputItem>
          <WhiteSpace />
          <Picker
              data={seasons(3100, 31)} cols={1}
              value={cycleDay} onChange={v => { values.cycleDay = v[0]; this.setState({ cycleDay: v }) }}>
              <List.Item arrow="horizontal" >账单日</List.Item>
          </Picker>
          <WhiteSpace />
          <Picker
              data={seasons(3100, 31)} cols={1}
              value={repayDay} onChange={v => { values.repayDay = v[0]; this.setState({ repayDay: v }) }}>
              <List.Item arrow="horizontal" >还款日</List.Item>
          </Picker>
          <WhiteSpace />
          <InputItem placeholder="请输入您信用卡的总额度" onChange={(value) => { values.creditlimit = value }} >
            <span>额度</span>
          </InputItem>
          <WhiteSpace />
        </div>
        <div className='remark'>
          注：同一张卡每天只能绑6次，如失败，请第二天再尝试
        </div>
        <div className='creditBangding' onTouchEnd={this.addCreditCard(values)}>
          绑定
        </div>
        <ActivityIndicator
          toast
          animating={this.props.loading ? true : false}
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

export default connect(mapStateToProps)(AddCreditCard);
