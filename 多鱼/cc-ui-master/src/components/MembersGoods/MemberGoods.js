import React from 'react';
import { connect } from 'dva';
import back from 'assets/忘记密码/返回.png';
import bijiben2 from 'assets/img/index/SY_YHk@3x.png';
import PayModalBuyVip from './PayModalBuyVip';
import PageHeader from "components/common/layout/page-header";


// const price = '331';
const product = '升级VIP=多种会员商品任选+VIP特权';

class MemberGoods extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dis: '',
      paydis: 'none'
    };
  }


  componentWillMount() {
    //初始化查询该客户是否设置过交易密码
    this.props.dispatch({
      type: 'cust/getTransPwdFlag',
    });

    //初始化查询余额是否足够
    this.props.dispatch({
      type: 'repayacct/queryBalance',
    });
    //获取vip价格
    this.props.dispatch({
      type: 'webshop/fetchVipPrice',
    });
  }

  render() {
    return (
      <div style={{ paddingTop: '5rem' }}>
        <PageHeader title='晋升会员'/>
        <div className="upgrade-member">
          <div className="upgrade-member-money">¥331</div>
          <div className="upgrade-member-tips">VIP升级=会员特权+超级好礼</div>
        </div>
        <PayModalBuyVip title='立即升级VIP' price={this.props.priceObj?this.props.priceObj.vipPrice:331} isSetPwd={this.props.isSetPwdData ? this.props.isSetPwdData : ''} {...this.props}
          status={this.props.match.params.status} walletBal={this.props.data&&this.props.data.walletBal? this.props.data.walletBal: 0.00} />
      </div>
    );
  };
}

const mapStateToProps = (state) => {
  const { isSetPwdData } = state.cust;
  const {data} = state.repayacct;
  const {priceObj} = state.webshop;
  return {
    loading: state.loading.models.cust,
    isSetPwdData,
    data,
    priceObj
  };
}

export default connect(mapStateToProps)(MemberGoods);
