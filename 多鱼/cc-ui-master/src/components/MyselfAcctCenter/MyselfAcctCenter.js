import React from 'react';
import { connect } from 'dva';
import { List } from 'antd-mobile';
import back from 'assets/忘记密码/返回.png';
import wodekabao from 'assets/我的账户中心/我的卡包.png';
import wodeshequn from 'assets/我的账户中心/我的社群.png';
import wodeqianbao from 'assets/我的账户中心/我的钱包.png';
import './AcctCenter.scss';

const Item = List.Item;

class MyselfAcctCenter extends React.Component {

  confirm1 = () => {
    this.props.history.push({ pathname: `/myselfCardPackage/myselfAcctCenter/${this.props.match.params.addr}` })
  }

  confirm2 = () => {
    this.props.history.push({ pathname: `/myselfWallet/myselfAcctCenter/${this.props.match.params.addr}` })
  }

  confirm3 = () => {
    this.props.history.push({ pathname: `/myselfCommunity/myselfAcctCenter/${this.props.match.params.addr}` })
  }

  render() {
    return (
      <div style={{ paddingTop: '100px' }}>
        <div className='headStyle' style={{ height: '100px'}}>
          <div style={{
            height: '100%',
            width: '6.667rem',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'absolute',
            left: '0px'
          }} onClickCapture={() => { this.props.history.goBack(-1) }}>
            <img alt='' src={back} style={{ width: '15px', zIndex: '200' }} />
          </div>
          <p style={{ color: 'white', fontSize: '1.167rem', display: 'inline-block' }} >我的账户中心</p>
        </div>
        <div style={{ height: '159px', backgroundColor: 'white', marginTop: '3px' }}>
          <List className="my-list">
            <Item thumb={wodekabao} style={{ height: '53px', }} arrow="horizontal" onTouchEnd={this.confirm1}>我的卡包</Item>
            <Item thumb={wodeqianbao} style={{ height: '53px' }} arrow="horizontal" onTouchEnd={this.confirm2}>我的钱包</Item>
            <Item thumb={wodeshequn} style={{ height: '53px' }} arrow="horizontal" onTouchEnd={this.confirm3} >我的社群</Item>
          </List>
        </div>
      </div>
    );
  };
}

const mapStateToProps = (state) => {
  return {
    loading: state.loading.models.application,
  };
}

export default connect(mapStateToProps)(MyselfAcctCenter);
