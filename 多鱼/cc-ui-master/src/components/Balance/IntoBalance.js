import React from 'react';
import { connect } from 'dva';
import { InputItem, WhiteSpace, Toast } from 'antd-mobile';
import back from 'assets/忘记密码/返回.png';
import './Balance.css';
import PageHeader from "../common/layout/page-header";

class IntoBalance extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            withdrawalAmount: ''
        };
    }

    componentWillMount() {
        //我的钱包初始化查询
        this.props.dispatch({
            type: 'repayacct/queryBalance',
        });
    }

    //改变转出余额
    changeAmount = () => {
        this.setState({
            withdrawalAmount: this.props.data && this.props.data.revenueBal ? this.props.data.revenueBal : 0.00
        })
    }

    //收益转余额
    profitToBal = () => {
        const { withdrawalAmount } = this.state
        const { data: { revenueBal } } = this.props
        if (withdrawalAmount < 0||withdrawalAmount===0 || withdrawalAmount > revenueBal) {
            Toast.info('金额需大于0元且小于可用余额', 2)
            return
        }
        this.props.dispatch({
            type: 'repayacct/profit2Bal',
            payload: {
                amount: withdrawalAmount
            }
        });
    }



    render() {
        const { withdrawalAmount } = this.state;
        return (
            <div className="jsq" style={{height: '100vh',background:'white'}}>
                <PageHeader whiteBack title="转入余额" style={{background:'#EE614C', color: 'white'}}/>
                <div style={{ height: '136px', backgroundColor: 'white', marginTop: '36px' }}>
                    <p style={{ paddingTop: '13px', marginLeft: '1.833rem',color: 'rgb(187,187,187)' }}>转出金额</p>
                    <div style={{ padding: '0.833rem 1.167rem 0 0', }} className='intoBalance intoBalanceFont'>
                        <InputItem autoCapitalize="off" value={withdrawalAmount}

                            type="money" onChange={(value) => { this.setState({ withdrawalAmount: value }) }}  >
                            <span style={{ fontSize: '36px', fontWeight: 'bold' }}>￥</span>
                        </InputItem>
                        <WhiteSpace />
                    </div>
                    <span style={{ marginLeft: '1.167rem', marginTop: '-2px', color: 'rgb(187,187,187)'}}>
                      可转出金额：
                         <span style={{ color: '#FF8B8B', position: 'absolute'}}>{this.props.data && this.props.data.revenueBal ? this.props.data.revenueBal : 0.00}</span>
                    </span>
                    <span style={{ color: '#FF8B8B', position: 'absolute', right: '1.167rem' }} onClick={this.changeAmount.bind(this)}>全部转出</span>
                </div>
                <div className='querenWithdrawal' onTouchStart={() => this.profitToBal()}>
                    确认转出
            </div>
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

export default connect(mapStateToProps)(IntoBalance);
