import React, { Fragment } from 'react';
import { connect } from 'dva';
import { List, Toast } from 'antd-mobile';
import touxiang from 'assets/img/mine/WDHY_Tx@3x.png';
import wodekabao from 'assets/img/mine/my_pakage.png';
import appcredit from 'assets/img/mine/cridet.png';
import wodeshequn from 'assets/img/mine/my_friend.png';
import perscenter from 'assets/img/mine/member_center.png';
import gerenzhongxin from 'assets/img/index/SY_ICO3_Click@3x.png';
import fenxiang2 from 'assets/img/index/SY_ICO2@3x.png';
import shouye from 'assets/img/index/SY_ICO1@3x.png';

import { Link } from 'dva/router';
import './Personal.scss';
import { userLevel } from '../../utils/appUtils';
import Footer from "../common/footer";
import PageHeader from "components/common/layout/page-header";

const Item = List.Item;

class PersonalCenter extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      authStatus: 'N', //用户是否认证标志
      userLevel: 'USER', //用户级别
    };
  }

  //查询当前会员信息
  componentWillMount() {
    this.props.dispatch({
      type: 'cust/getUserInfo',
    });
    //是否已购买VIP服务
    this.props.dispatch({
      type: 'webshop/fetchVip',
    });
    //查询账户余额
    this.props.dispatch({
      type: 'repayacct/queryBalance',
      payload: {
      }
    });
  }

  componentWillReceiveProps() {
    this.setState({
      authStatus: this.props.data ? this.props.data.authStatus : 'N',
      userLevel: this.props.data ? this.props.data.userLevel : 'USER',
    });
  }


  //我的账户中心
  confirm0 = () => {
    this.props.history.push({ pathname: '/myselfAcctCenter/personalCenter' })
  }
  //会员中心
  confirm1 = () => {
      this.props.history.push({ pathname: '/myselfInterests/personalCenter' })
  }
  //安全中心
  confirm2 = () => {
    this.props.history.push({ pathname: '/saftCenter' })
  }

  //实名认证
  confirm4 = () => {
    if (this.state.authStatus === 'Y') {
      Toast.info('您已实名认证通过，无需重复认证', 2)
    } else {
      this.props.history.push({ pathname: '/personalAuth/first' })

      // window.ReactNativeWebView.postMessage(`idCardKit:`)
    }
  }
  //信用卡申请
  confirm5 = () => {
    this.props.history.push({ pathname: '/credit/card' })

    // Toast.info('即将上线，敬请期待！', 2);
  };


  handleLink = (pathname,state)=>this.props.history.push({pathname,state});

  render() {
    const { location: { pathname } } = this.props.history;
    const user = this.props.data;
    return (
      <Fragment>
        <div className="person-center">
          <div className='person-center-header'>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              marginLeft:'1.7rem',
            }}>
              <img alt='' src={touxiang} style={{ width: '5rem', height: '5rem',}} />
              <div style={{display: 'flex', flexDirection:'column'}}>
                <div style={{
                  color: 'white',
                  fontSize:'1.7rem',
                  marginLeft: '0.778rem',
                  display: 'flex'
                }}>
                  {user?user.userName?user.userName:user.mobile:''}
                  {this.state.authStatus === 'Y' ?
                      <div className="authFlag">
                        <span>已认证</span>
                      </div>
                      :
                      <div className="authFlag" onClick={this.confirm4}>
                        <span>未认证</span>
                      </div>
                  }
                </div>
                <div style={{marginLeft: '0.778rem'}}>{user&&user.mobile}</div>
              </div>
              <div className='perDianjichengweihuiyuan' onClick={()=>this.handleLink('/myselfInterests/personalCenter')} >
                {this.state.userLevel === 'USER' ? '开通会员' :
                    userLevel(this.state.userLevel)}
              </div>
            </div>

            <div className='quanyifenxiang'>
              <div style={{
                    padding: '0 1.778rem ',

              }} onClick={()=>this.handleLink('/myselfTickets/personalCenter', '/personalCenter' )}>
                <p style={{fontSize: '1.6rem'}}>{this.props.dataAcct?this.props.dataAcct.securityCnt:0}</p>
                <span style={{color: 'white', fontSize: '1.65rem'}}>我的卡券</span>
              </div>
              <div onClick={()=>this.handleLink('/myselfRevn/personalCenter/personalCenter')}>
                <p style={{fontSize: '1.6rem'}}>{this.props.dataAcct&&this.props.dataAcct.revenueBal?this.props.dataAcct.revenueBal.toFixed(2):0.00}</p>
                <span style={{color: 'white',fontSize: '1.65rem'}}>我的收益</span>
              </div>
              <div onClick={()=>this.handleLink('/myselfWallet/personalCenter/personalCenter')}>
                <p style={{fontSize: '1.6rem', marginBottom: '0.111rem'}}>{this.props.dataAcct&&this.props.dataAcct.walletBal?this.props.dataAcct.walletBal.toFixed(2):0.00}</p>
                <span style={{color: 'white',fontSize: '1.65rem'}}>我的余额</span>
              </div>
            </div>
          </div>

          <div className='myPackage'>
            <div onClick={()=>this.handleLink('/myselfCardPackage/personalCenter/personalCenter')}>
              <img alt='' src={wodekabao} style={{marginBottom: '0.6rem', width: '3.333rem' }} />
              <p style={{color: '#000', fontSize:'1.5rem'}}>我的卡包</p>
            </div>
            <div onClick={()=>this.handleLink('/myselfCommunity/personalCenter/personalCenter')}>
              <img alt='' src={wodeshequn} style={{marginBottom: '0.6rem', width: '3.333rem' }} />
              <p style={{color: '#000',fontSize:'1.5rem'}}>我的好友</p>
            </div>
            <div onClick={this.confirm1}>
              <img alt='' src={perscenter} style={{marginBottom: '0.6rem', width: '3.333rem' }} />
              <p style={{color: '#000',fontSize:'1.5rem'}}>会员中心</p>
            </div>
            <div onClick={this.confirm5}>
              <img alt='' src={appcredit} style={{marginBottom: '0.6rem', width: '3.333rem' }} />
              <p style={{color: '#000',fontSize:'1.5rem'}}>信用卡申请</p>
            </div>

          </div>

          <div className="person-center-detail">

            <Item style={{ height: '4.417rem', }} arrow="horizontal" onClick={()=>this.handleLink('/myselfCardPackage/personalCenter/personalCenter')}><span style={{fontSize:'1.55rem'}}>还款管理</span></Item>
            <Item style={{ height: '4.417rem', }} arrow="horizontal" onClick={()=>this.handleLink('/myselfOrder')}><span style={{fontSize:'1.55rem'}}>我的订单</span></Item>
            <Item style={{ height: '4.417rem' }} arrow="horizontal" onClick={() => {
              this.props.history.push({
                pathname: `/selfCenter`,
                state: pathname
              })
            }}><span style={{fontSize:'1.55rem'}}>个人中心</span></Item>
            <Item style={{ height: '4.417rem' }}
                  arrow="horizontal"
                  onClick={this.confirm4}>
              <span style={{fontSize:'1.55rem'}}>实名认证</span>
            </Item>

            <Item style={{ height: '4.417rem' }} arrow="horizontal" onClick={()=>this.handleLink('/saftCenter')}><span style={{fontSize:'1.55rem'}}>安全中心</span></Item>
          </div>

        </div>
        <Footer current="personal"/>


      </Fragment>
    );
  };
}

const mapStateToProps = (state) => {
  const { data } = state.cust;
  const { vipFlag } = state.webshop;
  const { data: dataAcct } = state.repayacct;
  return {
    loading: state.loading.models.cust,
    data,
    vipFlag,
    dataAcct
  };
}

export default connect(mapStateToProps)(PersonalCenter);
