import React from 'react';
import { connect } from 'dva';
import { InputItem, WhiteSpace, Toast,Picker, List } from 'antd-mobile';
import back from 'assets/忘记密码/返回.png';
import './AcctCenter.scss';
import { hiddenBankCard,seasons } from '../../utils/appUtils';
import PageHeader from "components/common/layout/page-header";



const isEmpty = function isEmpty(value) {
  return value === undefined || value === null || value === '';
};


class EditCreditCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      values: {
        cycleDay: [], repayDay: [], creditlimit: '', id: ''
      }
    };
  }

  componentWillMount() {
    //信用卡初始化查询
    this.props.dispatch({
      type: 'cust/getCreditCardList',
      payload: {
        pageSize: 20,
        pageNo: 1,
      }
    });
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.creditList !== this.props.creditList) {
      const { values } = this.state
      const creditArray = nextProps.creditList ? nextProps.creditList : '';
      const arr = creditArray.find((element) => (element.id === Number(this.props.match.params.id)));
      values.cycleDay = [(arr && arr.cycleDay)] || []
      values.repayDay = [(arr && arr.repayDay)] || []
      values.creditlimit = (arr && arr.creditLimit) || ''
      this.setState({
        values
      })
    }
  }

  //修改信用卡
  editCreditCard = () => {
    const { values } = this.state
    values.id = this.props.match.params.id;
    if (isEmpty(values.cycleDay[0])) {
      Toast.info("请输入账单日期", 2);
      return;
    }
    if (isEmpty(values.repayDay[0])) {
      Toast.info("请输入还款日期", 2);
      return;
    }
    if (isEmpty(values.creditlimit)) {
      Toast.info("请输入额度信息", 2);
      return;
    }
    values.cycleDay = values.cycleDay[0];
    values.repayDay = values.repayDay[0];
    this.props.dispatch({
      type: 'cust/updCreditCard',
      payload: values
    });
  }

  render() {
    const { values } = this.state;
    const creditArray = this.props.creditList ? this.props.creditList : '';
    const arr = creditArray.find((element) => (element.id === Number(this.props.match.params.id)));
    return (
      <div style={{  }}>
        <PageHeader title='修改信用卡'/>
        <div style={{ height: '40px', marginLeft: '1.167rem', lineHeight: '37px', color: '#9e9e9e' }}>*请修改持卡人本人的银行卡</div>
        <div style={{ height: '148px', backgroundColor: 'white' }} >
          <InputItem value={arr && arr.userName ? arr.userName : ''} disabled  >
            <span>持卡人</span>
          </InputItem>
          <WhiteSpace />
          <InputItem value={arr && arr.cardNo ? hiddenBankCard(arr.cardNo) : ''} type='bankCard' disabled >
            <span>卡号</span>
          </InputItem>
          <WhiteSpace />
          <InputItem value={arr && arr.bankName ? arr.bankName : ''} disabled >
            <span>银行名称</span>
          </InputItem>
          <WhiteSpace />
        </div>
        <div style={{ height: '148px', backgroundColor: 'white', marginTop: '15px' }}>
          <Picker
              data={seasons(3100, 31)}
              cols={1}
              value={values && values.cycleDay}
              onChange={v => { values.cycleDay =v;this.setState({ values }) }}
              >
              <List.Item arrow="horizontal" >账单日</List.Item>
          </Picker>
          <WhiteSpace />
          <Picker
              data={seasons(3100, 31)}
              cols={1}
              value={values && values.repayDay} onChange={v => { values.repayDay = v; this.setState({ values }) }}>
              <List.Item arrow="horizontal" >还款日</List.Item>
          </Picker>
          <WhiteSpace />
          <InputItem value={values && values.creditlimit} placeholder="请输入您信用卡的总额度" onChange={(value) => { values.creditlimit = value; this.setState({ values }) }} >
            <span>额度</span>
          </InputItem>
          <WhiteSpace />
        </div>
        <div className='creditBangding' onTouchEnd={this.editCreditCard.bind(this, values)}>
          修改
        </div>
      </div>
    );
  };
}

const mapStateToProps = (state) => {
  const { creditList } = state.cust;
  return {
    loading: state.loading.models.cust,
    creditList
  };
}

export default connect(mapStateToProps)(EditCreditCard);
