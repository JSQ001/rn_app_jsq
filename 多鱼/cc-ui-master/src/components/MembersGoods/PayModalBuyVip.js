import React, { Component } from 'react';
import { connect, } from 'dva';
import { Modal, WhiteSpace, List,Radio, InputItem, Toast, Button } from 'antd-mobile';
import zhifubaologo from 'assets/支付宝/支付宝logo.png';
import recommend from 'assets/支付宝/recommend.png';
import yue from 'assets/支付宝/wallet 7.png';
import TicketsMoal from '../Tickets/TicketsModal.js';
import { createForm } from 'rc-form';


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

class PayModalBuyVip extends Component {

  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      value: 0,
      money: '',
      visiable: false,
      ticketId: '',
      deductAmt: 0,
      payColor: '#CCCCCC'
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

  componentWillMount() {
     //是否已购买VIP服务
     this.props.dispatch({
      type: 'webshop/fetchVip',
     });
  }

  //余额或是支付宝支付（下单）
  balanceBuy = (value) => {
    this.setState({ money: '',modal: false });
    if (value !== 0) {
      if (this.state.money.length < 6) {
        Toast.info("密码要六位哟，请重新输入！", 2);
        return;
      }
    }
    this.props.dispatch({
      type: 'webshop/buyVip',
      payload: {
        amount: parseFloat(this.props.price),
        payType: value !== 0 ? "WALLET_BAL" : 'THIRD_PARTY',
        transPwd: this.state.money,
        userSecId: Number(this.state.ticketId),
      }
    });
  };



  resultInfo = (e) => {
    this.props.dispatch({
      type: 'webshop/buyVipCancel',
      payload: {
      }
    });
  }


  goBack() {
    this.props.history.push({ pathname: '/editTranPassword' })
  }

  showModalHandler = (e) => {
    this.setState({
      visible: true
    });
  };

  hideModalHandler = (e) => {
      this.setState({
        visible: false
      });
    };

  //选择卡券
  chooseTicket = (tickets) => {
    this.setState({
        ticketId:tickets.id,
        deductAmt: tickets.deductAmt,
        visible: false
    });
  }
  //删除卡券
  deleteTicket = () => {
      this.setState({
          ticketId:'',
          deductAmt: 0,
      });
  }

  render() {
    const { getFieldProps } = this.props.form;
    const { money, value, payColor, modal } = this.state;
    const data = [
      { value: 0, label: '支付宝', img: `${zhifubaologo}`, desc: '数亿用户都在用，安全可托付' },
      { value: 1, label: '余额', img: `${yue}`, desc: '推荐使用' },
    ];
    const price = this.state.deductAmt>0?this.props.price-this.state.deductAmt:this.props.price;
    return (
      <div style={{marginTop: '10vh'}}>
        <div className='querenRepayPlan' style={{ marginTop: '15px' }}
          onClick={this.props.vipFlag && Number(this.props.vipFlag) === 3 ?
          () => {alert('', '您已操作过一次购买，请先取消再购买！', [
              { text: '我已支付不取消', onPress: () => console.log('cancel') },
              { text: '未支付,确认取消', onPress: () => {this.resultInfo(this)}},
            ]) }
            :
            this.showModal('modal')
            }>
          {this.props.vipFlag && Number(this.props.vipFlag) === 3?'支付中-可取消'
          :'立即升级VIP'}
        </div >
        <WhiteSpace />
        <Modal
          popup
          visible={modal}
          //closable
          maskClosable
          onClose={()=>this.setState({modal: false})}
          animationType="slide-up"
        >
          <div style={{ height: '300px' }}>
            <div style={{display: 'flex', justifyContent:'center'}}>
              <div style={{width:'26vw',textAlign:"left",paddingTop:12}}><span onClick={()=>this.setState({modal: false})} className="am-modal-close-x"/></div>
              <div style={{width:'60vw',  textAlign: 'left', height: '45px', lineHeight: '40px', fontSize: '1.333rem', paddingLeft: '15px' }}>请选择支付方式</div>

            </div>
              <List className="pay-list">
              {data.map(i => (
                <RadioItem thumb={i.img} key={i.value} checked={value === i.value} onChange={() => this.onChange(i.value)}>
                  {i.label}
                  <div className={`pay-tips-${i.value}`} style={{ fontSize: '12px' }}>{i.desc}</div>
                </RadioItem>
              ))}
            </List>
            <div style={{ borderBottom:'0.083rem solid #F6F6F6',marginTop:'15px auto',lineHeight:'4.167rem',
                          height: '4.167rem', width: '100%', textAlign: 'right' ,color:'#EE7665', fontWeight:'600',
                          fontSize: '1.333rem'}}>
                            {this.state.ticketId === '' ? <div onTouchEnd={this.showModalHandler} style={{marginRight:'1.167rem'}}>去选择一张抵用券</div>
                            :<div style={{marginRight:'1.167rem'}}>已选择一张抵用券<span style={{color:'#108ee9'}} onTouchEnd={this.deleteTicket}>删除</span></div>}
                        </div>
            <div style={{
              height: '40px',
              width: '60%',
              backgroundColor: '#EE614C',
              borderRadius: '100px',
              margin: '15px auto',
              lineHeight: '38px',
              boxShadow: '0 0.083rem 3px rgba(34, 25, 25, 0.2)',
              color: 'white'
            }}
              onClick={() => {
                value !== 0 ?
                  this.props.isSetPwd && this.props.isSetPwd === true ?
                    /*this.props.walletBal < price ?
                      alert('', '余额不足请查看余额或更换支付方式！', [
                        { text: '取消', onPress: () => console.log('cancel') },
                        { text: '查看余额', onPress: () => this.props.history.push({ pathname: '/myselfWallet/memberGoods/firstPage' }) },
                      ])
                      :*/
                      this.inputRef.focus()
                    :
                    alert('', '您还未设置过交易密码，请先设置交易密码！', [
                      { text: '取消', onPress: () => console.log('cancel') },
                      { text: '前往', onPress: () => { this.props.history.push({ pathname: '/editTranPassword' }) } },
                    ])
                  :
                  this.balanceBuy(value);
                }
              }
            >
              确认支付 ￥{this.state.deductAmt>0?this.props.price-this.state.deductAmt+'(已抵扣'+this.state.deductAmt+'元)':this.props.price}
            </div>

          </div>
        </Modal>
        <Modal
            title={`选择卡券`}
            visible={this.state.visible}
            onOk={this.hideModalHandler}
            maskClosable={false}
            onCancel={this.hideModalHandler}
            style={{
                width: '95%',
                height: '41.167rem',
            }}
            >
            <TicketsMoal ticketType="LEVEL_PROP" callback={this.chooseTicket}/>
            <div style={{ position:'fixed',background:'white',border:'0.083rem solid #7EB74F',margin:'5px auto',width:'95%',fontSize:'14px',lineHeight:'2.5rem',textAlign: 'center',color:'#7EB74F',fontWeight:'700',borderRadius:'15px' }} onTouchEnd={this.hideModalHandler}>关闭</div>
          </Modal>
        <div id="my-keyboard" style={{ display: 'none' }}>
          <InputItem
            type={'money'}
            ref={el => this.inputRef = el}
            clear
            moneyKeyboardWrapProps={moneyKeyboardWrapProps}
            value={money}
            onChange={v => { this.setState({ money: v >= 1000000 ? money : v, },()=>{
              if(v.length===6){
                this.setState({payColor: "rgb(235,94,72)"})
              }
            }) }}
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
                  <div style={{width:'26vw',textAlign:"left"}}><span className="am-modal-close-x"/></div>
                  <div style={{width:'60vw',  textAlign: 'left', height: '45px', lineHeight: '40px', fontSize: '18px', paddingLeft: '15px' }}>输入支付密码</div>
                </div>
                <div style={{
                  height: '6.667rem',
                  width: '100%',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center'
                }} className='moneyKey'>
                    <InputItem
                        {...getFieldProps('money3')}
                        ref={e=>this.pwd=e}
                        type='password'
                        value={money}
                        clear
                        placeholder='多鱼支付密码'
                        onChange={value=>{
                          if(value.length===6){
                            this.setState({payColor: "rgb(235,94,72)"})
                          }
                        }}
                    />
                    <div
                        style={{
                          background: payColor,
                          borderRadius:'0 8px 8px 0',
                          width: '18vw',
                          lineHeight: '46px',
                          height: '46px',
                          textAlign: 'center',
                          color: payColor==='#CCCCCC' ?  '' : 'white'
                        }}
                        onClick={()=>{
                          if(payColor==='#CCCCCC') return;
                          console.log(this.inputRef);
                          this.inputRef.props.onBlur()
                          this.balanceBuy(value);
                        }}
                    >付款</div>
                </div>
              </div>

            }
          >数字键盘</InputItem>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  const { data } = state.cust;
  const { vipFlag} = state.webshop
  return {
    loading: state.loading.models.cust,
    data,
    vipFlag
  };
};
const WrappedPayModalBuyVip = createForm()(PayModalBuyVip);


export default connect(mapStateToProps)(WrappedPayModalBuyVip);
