import React, { Component } from 'react';
import { connect, } from 'dva';
import { Modal, WhiteSpace, List, Radio, InputItem, Toast } from 'antd-mobile';
import zhifubaologo from 'assets/支付宝/支付宝logo.png';
import tuijianbiaoqiao from 'assets/支付宝/推荐标签.png';
import yue from 'assets/支付宝/余额.png';

const RadioItem = Radio.RadioItem;
const alert = Modal.alert;

const isIPhone = new RegExp('\\biPhone\\b|\\biPod\\b', 'i').test(window.navigator.userAgent);
let moneyKeyboardWrapProps;
if (isIPhone) {
  moneyKeyboardWrapProps = {
    onTouchEnd: e => e.preventDefault(),
    onClick: e => e.preventDefault(),
  };
}


// function closest(el, selector) {
//     const matchesSelector = el.matches || el.webkitMatchesSelector || el.mozMatchesSelector || el.msMatchesSelector;
//     while (el) {
//       if (matchesSelector.call(el, selector)) {
//         return el;
//       }
//       el = el.parentElement;
//     }
//     return null;
//   }




class PayTypeModal extends Component {

  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      value: 0,
      money: ''
    };
  }


  showModal = key => (e) => {
    e.preventDefault(); // 修复 Android 上点击穿透
    this.setState({
      [key]: true,
    });
  }
  onClose = key => () => {
    this.setState({
      [key]: false,
    });
  }

  onChange = (value) => {
    this.setState({
      value,
    });
  };


  //余额支付
  balanceBuy = (value) => {
    this.setState({
      money: '',
    });
    if (value !== 0) {
      if (this.state.money.length < 6) {
        Toast.info("密码要六位哟，请重新输入！", 2);
        return;
      }
    }
    this.props.dispatch({
      type: 'webshop/buyGoods',
      payload: {
        goodsId: this.props.goodId,
        amount: parseFloat(this.props.price),
        transPwd: this.state.money,
        address: this.props.addrData ? this.props.addrData.address : '',
        cnt: '1',
        postCode: '',
        receiverName: this.props.addrData ? this.props.addrData.receiverName : '',
        receiverTel: this.props.addrData ? this.props.addrData.receiverTel : '',
        payType: value !== 0 ? 'WALLET_BAL' : 'THIRD_PARTY',
      }
    });
  }

  goPay() {
    const { value, modal } = this.state;
    console.log(this.props.walletBal)
    if (value !== 0) {
      if (this.props.isSetPwd && this.props.isSetPwd === true) {
        if (this.props.walletBal < this.props.price) {
          alert('', '余额不足请查看余额或更换支付方式！', [
            { text: '取消', onPress: () => console.log('cancel') },
            { text: '查看余额', onPress: () => this.props.history.push({ pathname: '/myselfWallet/memberGoods/firstPage' }) },
          ])
        } else {
          this.inputRef.focus()
        }
      } else {
        alert('', '您还未设置过交易密码，请先设置交易密码！', [
          { text: '取消', onPress: () => console.log('cancel') },
          { text: '前往', onPress: () => { this.props.history.push({ pathname: '/editTranPassword' }) } },
        ])
      }
    } else {
      this.balanceBuy(value)
    }
    if (modal) {
      this.setState({ modal: false })
    }
  }



  render() {
    const { money, value } = this.state;
    const data = [
      { value: 0, label: '支付宝', img: `${zhifubaologo}`, desc: '数亿用户都在用，安全可托付' },
      { value: 1, label: '余额', img: `${yue}`, desc: '推荐使用' },
    ];
    return (
      <div>
        <div className='querenRepayPlan' style={{ marginTop: '15px' }} onClick={this.showModal('modal')}>
          立即购买
        </div >
        <WhiteSpace />
        <Modal
          popup
          visible={this.state.modal}
          onClose={this.onClose('modal')}
          animationType="slide-up"
        >
          <div style={{ height: '22.5rem' }}>
            <div style={{ textAlign: 'left', height: '45px', lineHeight: '40px', fontSize: '1.333rem', paddingLeft: '15px' }}>请选择支付方式</div>
            <List >
              {data.map(i => (
                <RadioItem thumb={i.img} key={i.value} checked={value === i.value} onChange={() => this.onChange(i.value)}
                >
                  {i.label} <img alt='' src={tuijianbiaoqiao} style={{ width: '4.167rem' }} />
                  <div style={{ fontSize: '12px' }}>{i.desc}</div>
                </RadioItem>
              ))}
            </List>
            <div style={{
              height: '40px',
              width: '50%',
              backgroundColor: '#009bde',
              borderRadius: '100px',
              margin: '0 auto',
              marginTop: '15px',
              lineHeight: '38px',
              color: 'white'
            }}
              onClick={this.goPay.bind(this)}

            >
              确认支付 ￥{this.props.price}
            </div>

          </div>
        </Modal>
        <div style={{ display: 'none' }}>
          <InputItem
            type={'money'}
            ref={el => this.inputRef = el}
            // onVirtualKeyboardConfirm={v => console.log('onVirtualKeyboardConfirm:', v)}
            clear
            moneyKeyboardWrapProps={moneyKeyboardWrapProps}
            value={money}
            onChange={v => { this.setState({ money: v >= 1000000 ? money : v }) }}
            onVirtualKeyboardConfirm={this.balanceBuy.bind(this, 2)}
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
      </div>
    );
  }
}
export default connect()(PayTypeModal);
