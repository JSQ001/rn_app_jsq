import React from 'react';
import { connect } from 'dva';
import {List, Modal, WhiteSpace} from 'antd-mobile';
import back from 'assets/忘记密码/返回.png';
import './AcctCenter.scss';
import PageHeader from "../common/layout/page-header";
import tixian from 'assets/img/index/tixian.png'
import zhuandan from 'assets/img/index/zhangdan.png'
import zhuanzhang from 'assets/img/index/shouyi.png'

const alert = Modal.alert;
const Item = List.Item;

class MyselfWallet extends React.Component {


    componentWillMount() {
        //我的钱包初始化查询
        this.props.dispatch({
            type: 'repayacct/queryBalance',
            payload: {
            }
        });
        //初始化查询借记卡信息
        this.props.dispatch({
            type: 'cust/getAllDebitCardList',
            payload: {
                pageSize: 10,
                pageNo: 1
            }
        });
    }



    //提现
    confirm1 = () => {
        if (this.props.total === 0) {
            alert('', '您还未绑定过储蓄卡呦，请先绑定储蓄卡！', [
                { text: '取消', onPress: () => console.log('cancel') },
                { text: '确定', onPress: () => { this.props.history.push('/addSavingsCard/personalCenter/personalCenter') } },
            ])
        } else {
            this.props.history.push({ pathname: `/balanceWithdrawal/${this.props.match.params.addr}/${this.props.match.params.addred}` })
        }
    }

    //转账
    confirm2 = () => {
        this.props.history.push({ pathname: `/transfer/${this.props.match.params.addr}/${this.props.match.params.addred}` })
    }

    //账单
    confirm3 = () => {
        this.props.history.push({ pathname: `/bill/${this.props.match.params.addr}/${this.props.match.params.addred}` })
    }

    render() {
        return (
            <div style={{background: 'white', height: '100vh' }}>
                <PageHeader whiteBack title="我的余额" style={{color: 'white', background: 'linear-gradient(to right,#FF8679, #FF503D)'}}/>
                <div style={{
                    color: 'white',
                    background: 'linear-gradient(to right,#FF8679, #FF503D)',
                    padding: '1.167rem 2.5rem'
                }}>
                    <div >当前可提现余额</div>
                    <div style={{margin: '1.167rem 0 2.5rem', fontSize: '2.5rem', fontWeight: 600}}>
                      {this.props.dataAcct&&this.props.dataAcct.walletBal?this.props.dataAcct.walletBal.toFixed(2):0.00}
                    </div>
                </div>
                <WhiteSpace style={{background: 'rgb(245,244,249)'}}/>

                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: '0.833rem'
                }} >
                    <div style={{ width: '100%' }}>
                        <List className="my-list">
                            <Item thumb={tixian} style={{ height: '5rem' }} arrow="horizontal" onClickCapture={this.confirm1}>提现</Item>
                            <Item thumb={zhuanzhang} style={{ height: '5rem' }} arrow="horizontal" onClickCapture={this.confirm2}>转账</Item>
                            <Item thumb={zhuandan} style={{ height: '5rem' }} arrow="horizontal" onClickCapture={this.confirm3}>账单</Item>
                        </List>
                    </div>
                </div>
            </div>
        );
    };
}

const mapStateToProps = (state) => {
    const { data } = state.repayacct;
    const { total } = state.cust;
    const { data: dataAcct } = state.repayacct;

  return {
        loading: state.loading.models.repayacct,
        data,
        total,
        dataAcct
    };
}

export default connect(mapStateToProps)(MyselfWallet);
