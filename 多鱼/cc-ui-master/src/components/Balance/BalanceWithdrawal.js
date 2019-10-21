import React from 'react';
import { connect } from 'dva';
import { Modal,InputItem, WhiteSpace, Toast, ActivityIndicator } from 'antd-mobile';
import back from 'assets/忘记密码/返回.png';
import dizhiqianjin from 'assets/商品详情页/地址前进.png'
import { fourCardNo,bankImg } from '../../utils/appUtils';
import morenlogo from 'assets/我的卡包-信用/DEFAULT_LOGO.png';
import './Balance.css';
import { isNumber,isZeroOrInterger,isFourNumber } from '../../utils/appUtils';
import PageHeader from "../common/layout/page-header";
// import * as storage from '../../utils/browserStorage.js';

let values = { withdrawalAmount: '', };
let dataValues = { bankName: '', cardNo: '', id: '' };
let strAddr = {}
const alert = Modal.alert;

const isIPhone = new RegExp('\\biPhone\\b|\\biPod\\b', 'i').test(window.navigator.userAgent);
let moneyKeyboardWrapProps;
if (isIPhone) {
    moneyKeyboardWrapProps = {
        onTouchEnd: e => e.preventDefault(),
        onClick: e => e.preventDefault(),
    };
}


class BalanceWithdrawal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            bankName: '',
            cardNo: '',
            bankId: '1',
            money: '',
            balance: ''
        };
    }

    //初始化查询银行卡信息
    componentWillMount() {
        this.props.dispatch({
            type: 'cust/getDebitCardList',
            payload: {
                pageSize: 10,
                pageNo: 1
            }
        });
        //余额初始化查询
        this.props.dispatch({
            type: 'repayacct/queryBalance',
        });

        //初始化查询该客户是否设置过交易密码
        this.props.dispatch({
            type: 'cust/getTransPwdFlag',
        });

        this.setState({
            bankId: this.props.location.bankId === undefined || this.props.location.bankId === null ? '1' : this.props.location.bankId
        });
    }


    checkoutbank = (data) => {
        if (this.props.match.params.id === null) {
            dataValues.bankName = data[0].bankName;
            dataValues.cardNo = data[0].cardNo;
            dataValues.id = data[0].id;
            return;
        } else {
            dataValues.bankName = data[this.props.match.params.id].bankName;
            dataValues.cardNo = data[this.props.match.params.id].cardNo;
            dataValues.id = data[this.props.match.params.id].id;
            return;
        }
    }

    //提现验证
    withdraw = () => {
        if (this.props.isSetPwdData && this.props.isSetPwdData === true) {
            if (values.withdrawalAmount < 10 ||
                (this.props.data && this.props.data.walletBal>=0 && values.withdrawalAmount > Number(this.props.data.walletBal))) {
                Toast.info('提现金额需大于10元且小于可用余额', 1)
            }else {
                this.inputRef.focus()
            }
        }else{
            alert('', '您还未设置过交易密码，请先设置交易密码！', [
                { text: '取消', onPress: () => console.log('cancel') },
                { text: '前往', onPress: () => { this.props.history.push({ pathname: '/editTranPassword' }) } },
              ])
        }
    }

    //提现
    withdrawConfirm = () => {
        const { money } = this.state
        if(money.length!==6){
            Toast.info('请输入六位数字密码', 1)
            this.setState({ money: '' })
            return;
        }
        this.props.dispatch({
            type: 'cust/withdraw',
            payload: {
                amount: values.withdrawalAmount,
                cardNo: strAddr.cardNo,
                password: money
            }
        });
        this.setState({ money: '' })
    }

    render() {
        const { money,balance } = this.state;
        const { location: { pathname } } = this.props.history;
        const addrArray = this.props.list || [];
        strAddr = addrArray.find((element) => (element.id === this.state.bankId))
            || addrArray.find((element) => (element.isDefault === 'Y'))
            || addrArray[0];

        const bankArr = bankImg.find((element) => (element.label === (strAddr && strAddr.bankName))) || { value: morenlogo,style: 'blueBackgroundColor' };

        return (
            <div style={{  }}>
                <PageHeader title='提现' whiteBack style={{color: 'white', background: '#EE614C'}}/>
                <WhiteSpace size="xs" />

                <div style={{
                    height: '100px',
                    backgroundColor: 'white',
                    marginTop: '0.833rem',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}
                    onTouchEnd={() => {
                        this.props.history.push({
                            pathname: `/chooseBankCard`,
                            state: pathname,
                            id: strAddr && strAddr.id ? strAddr.id : ''
                        })
                    }}>
                    <div style={{ width: '25%', textAlign: 'center' }}>
                        <img alt='' src={bankArr.value} style={{ width: '62px' }} />
                    </div>
                    <div style={{ width: '50%' }}>
                        <p>{strAddr && strAddr.bankName ? strAddr.bankName : ''}</p>
                        <p>尾号{strAddr && strAddr.cardNo ? fourCardNo(strAddr.cardNo) : ''}的储蓄卡</p>
                    </div>
                    <div style={{ width: '25%', textAlign: 'center' }}>
                        <img alt='' src={dizhiqianjin} style={{ width: '15px' }} />
                    </div>
                </div>
              <p style={{color: 'rgb(198,198,200)',marginLeft: '1.167rem' }}>提现手续费2元/笔</p>

                <div style={{ height: '136px', backgroundColor: 'white', marginTop: '0.833rem' }}>
                    <div style={{ paddingTop: '0.833rem' }} className='intoBalance intoBalanceFont'>
                        <InputItem autoCapitalize="off" value={balance} onChange={(value) => {
                            const v = this.props.data
                            && this.props.data.walletBal && !Number.isNaN(this.props.data.walletBal) ? this.props.data.walletBal.toFixed(2) : 0
                            if((isNumber(value) || isZeroOrInterger(value)) && isFourNumber(value)){
                                if( Number(value) > Number(v)){
                                    this.setState({ balance: v })
                                    values.withdrawalAmount = v
                                }else{
                                    this.setState({ balance: value })
                                    values.withdrawalAmount = value
                                }
                            }
                         }}
                            type="digit">
                            <span style={{ fontSize: '36px', fontWeight: 'bold' }}>￥</span>
                        </InputItem>
                <WhiteSpace />
            </div>
            <p style={{ marginLeft: '1.167rem', marginTop: '-2px', }}>可用余额
              <span style={{ marginLeft: 10,color: 'rgb(237,122,105)' }}>
                  {this.props.data
                  && this.props.data.walletBal && !Number.isNaN(this.props.data.walletBal) ?
                      this.props.data.walletBal.toFixed(2) : '0.00'}元&nbsp;<span>（提现金额都不得低于10元）</span>
              </span>
            </p>
            </div >
            <div className='querenWithdrawal' onClickCapture={this.withdraw.bind(this)} style={{ cursor: 'pointer' }}>
                确认提现
            </div>
            <div style={{ display: 'none' }}>
                <InputItem
                    type={'money'}
                    ref={el => this.inputRef = el}
                    // onVirtualKeyboardConfirm={v => console.log('onVirtualKeyboardConfirm:', v)}
                    clear
                    moneyKeyboardWrapProps={moneyKeyboardWrapProps}
                    value={money}
                    onChange={v => { this.setState({ money: v >= 1000000 ? money : v }) }}
                    onVirtualKeyboardConfirm={() => this.withdrawConfirm()}
                    moneyKeyboardHeader={
                        <div style={{
                            height: '12.5rem',
                            display: 'flex',
                            width: '100%',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                            <div style={{
                                height: '4.167rem',
                                display: 'flex',
                                width: '100%',
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}>
                                <p style={{ fontSize: '18px' }}>输入支付密码</p>
                            </div>
                            <div style={{
                                height: '6.667rem',
                                width: '100%',
                                display: 'flex',
                                justifyContent: 'space-evenly',
                                alignItems: 'center'
                            }} className='moneyKey'>
                                <InputItem type='password' moneyKeyboardWrapProps={moneyKeyboardWrapProps} disabled value={money.toString() && money.toString().charAt(0)} />
                                <InputItem type='password' moneyKeyboardWrapProps={moneyKeyboardWrapProps} disabled value={money.toString() && money.toString().charAt(1)} />
                                <InputItem type='password' moneyKeyboardWrapProps={moneyKeyboardWrapProps} disabled value={money.toString() && money.toString().charAt(2)} />
                                <InputItem type='password' moneyKeyboardWrapProps={moneyKeyboardWrapProps} disabled value={money.toString() && money.toString().charAt(3)} />
                                <InputItem type='password' moneyKeyboardWrapProps={moneyKeyboardWrapProps} disabled value={money.toString() && money.toString().charAt(4)} />
                                <InputItem type='password' moneyKeyboardWrapProps={moneyKeyboardWrapProps} disabled value={money.toString() && money.toString().charAt(5)} />
                            </div>
                        </div>

                    }
                >数字键盘</InputItem>
            </div>
            <ActivityIndicator
                toast
                text='加载中...'
                animating={this.props.loading ? true : false}
            />
            </div >
        );
    };
}

const mapStateToProps = (state) => {
    const { list,isSetPwdData } = state.cust;
    const { data } = state.repayacct;
    return {
        loading: state.loading.models.cust,
        list,isSetPwdData,
        data
    };
}

export default connect(mapStateToProps)(BalanceWithdrawal);
