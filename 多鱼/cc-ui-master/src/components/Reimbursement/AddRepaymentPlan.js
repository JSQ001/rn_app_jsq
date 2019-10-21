import React from 'react';
import { connect } from 'dva';
import { InputItem, WhiteSpace, Toast, Picker, List, ActivityIndicator,Modal } from 'antd-mobile';
import back from 'assets/忘记密码/返回.png';
import gaikuang from 'assets/img/mine/rauids.png';
import morenlogo from 'assets/我的卡包-信用/DEFAULT_LOGO.png';
import './Reimbursement.scss';
import './plan.scss'
import arrayTreeFilter from 'array-tree-filter';
import '../App.css';
import { fourCardNo, seasons,bankImg } from '../../utils/appUtils';
import RepayPlanDetailsList from './RepayPlanDetailsList';
import { areaArray } from '../../utils/province';
import * as storage from '../../utils/browserStorage.js';
import '../MyselfAcctCenter/AcctCenter.scss';
import TicketsMoal from '../Tickets/TicketsModal.js'
import PageHeader from "../common/layout/page-header";
import BankCardBasic from "../common/bank-card/bank-card-basic";
import BankCard from "components/MyselfAcctCenter/bankCard";

const isEmpty = function isEmpty(value) {
  return value === undefined || value === null || value === '' || Number.isNaN(value);
};

let values = { repayAmt: '', planDays: '', planLocate: '', cardNo: '' };



class AddRepaymentPlan extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      desc: '生成还款计划',
      flag: '0',
      days: '',
      planLocate: '',
      amount: 0,
      ticketId :'',
      visible: false
    };
  }


  componentWillMount() {
    //初始化查询信用卡信息
    this.props.dispatch({
      type: 'cust/getCreditCardList',
      payload: {
        pageSize: 20,
        pageNo: 1
      }
    });
    if(storage.get('defaultConsumeAddr')&&storage.get('defaultConsumeAddr')!=null){
      this.setState({planLocate: storage.get('defaultConsumeAddr').split('-')})
    }
    this.setState({
      ticketId: this.props.location.ticketId === undefined || this.props.location.ticketId === null ? '' : this.props.location.ticketId
    });
  }

  //选择卡券
  chooseTicket = (id) => {
    this.setState({
      ticketId:id,
      visible: false
    });
  }
  //删除卡券
  deleteTicket = () => {
    this.setState({
      ticketId:'',
    });
  }

  //生成还款计划
  createRepayPlan = () => {
    if (isEmpty(values.repayAmt)) {
      Toast.info("还款金额不能为空", 2);
      return;
    }
    if (isEmpty(values.planDays)) {
      Toast.info("计划天数不能为空", 2);
      return;
    }
    values.planLocate = this.state.planLocate[0] +"-"+ this.state.planLocate[1] +"-"+ this.state.planLocate[2];
    if (isEmpty(values.planLocate)) {
      Toast.info("计划地点不能为空", 2);
      return;
    }
    this.props.dispatch({
      type: 'cust/calcRepayPlan',
      payload: values
    });
    this.setState({
      desc: '重新生成计划',
      flag: '1'
    })
  }


  //确认还款计划处理
  confirmRepayPlan = () => {
    this.props.dispatch({
      type: 'cust/confirmRepayPlan',
      payload: {
        calcData: this.props.calcData ? this.props.calcData : '',
        addr: this.props.match.params.addr,
        addred: this.props.match.params.addred,
        id: this.props.match.params.id,
        userSecId: this.state.ticketId===''?null:Number(this.state.ticketId)
      }
    });
  }
  getSel() {
    const value = this.state.planLocate;
    if (!value) {
      return '';
    }
    const treeChildren = arrayTreeFilter(areaArray, (c, level) => c.value === value[level]);
    return treeChildren.map(v => v.label).join(',');
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


  componentWillUnmount() {
    this.setState({
      days: '',
      planLocate: ''
    })
    values = { repayAmt: '', planDays: '', planLocate: '', cardNo: '' }
  }

  handlePlan = ()=>{}

  render() {
    //定义数组查询对应的信用卡信息
    const { days, planLocate, amount, flag, desc } = this.state;
    const creditArray = this.props.creditList ? this.props.creditList : [];
    const creditArr = creditArray.find((element) => (element.id === Number(this.props.match.params.id)));
    values.cardNo = creditArr && creditArr.cardNo ? creditArr.cardNo.split(" ").join("") : '';
    const bankArr = bankImg.find((element) => (element.label === (creditArr && creditArr.bankName))) || { value: morenlogo,style: 'blueBackgroundColor' };
    return (
        <div className="add-plan" style={{ paddingBottom: 65,background:'#fff'}}>
          <PageHeader title='设置还款计划表'/>
          <div style={{marginBottom: '1rem'}}>
            <BankCard {...this.props} data={creditArr} onlyVisible/>
          </div>

          <div style={{height:12,width:'100vw', background: 'rgb(245,244,249)'}}/>

          <div className='pay-plan'>
            <InputItem
                placeholder="元"
                className='play-item-content'
                autoCapitalize="off"
                onChange={(value) => {
                  values.repayAmt = value;
                  this.setState({ amount: value, days: '',ticketId: '' })
                }}
            >还款金额
            </InputItem>
            <div style={{ width: '100%', borderBottom:'0.083rem solid #F6F6F6' }} className='planSet' onTouchEndCapture={() => {
              if (amount < 10) {
                Toast.info("最低还款金额10元", 2)
              }
            }}>

              <Picker data={seasons(amount, (creditArr && creditArr.lastRepayDays) || 0)} cols={1} title='延长时间利于提升信用卡额度'
                      disabled={amount < 10}
                      value={days} onChange={v => { values.planDays = v[0]; this.setState({ days: v }) }}>
                <List.Item arrow="horizontal" className='play-item-content' >计划天数</List.Item>
              </Picker>
            </div>

            <Picker
                data={areaArray}
                value={planLocate}
                onChange={v => this.setState({ planLocate: v })}
            >
              <List.Item arrow="horizontal" className='play-item-content' extra={this.getSel()} onTouchEnd={() => this.setState({ visibles: true })}>
                还款地点
              </List.Item>
            </Picker>
            {this.state.ticketId === '' ?
                <List.Item arrow="horizontal"  className='play-item-content' onTouchEnd={this.showModalHandler}>
                  抵用券
                </List.Item>
                :
                <List.Item arrow="horizontal">
                  已选择选择一张抵用券<span style={{color:'red'}} onTouchEnd={this.deleteTicket}>删除</span>
                </List.Item>
            }

            <WhiteSpace size="lg" />
          </div>
          <div className='querenRepayPlan' onTouchEnd={this.createRepayPlan.bind(this, values)}>{desc}</div>

          {
            flag !=='0' &&(
                <div style={{width: '90vw',margin:"1.167rem auto"}}>
                  <div style={{
                    width: '90vw',
                    height: '8vh',
                    lineHeight: '8vh',
                    fontSize: 19,
                    borderBottom: '0.083rem solid #ccc'
                  }}>
                      <span style={{
                        display: 'inline-block',
                        position: 'relative',
                        height: 20,
                        width: 4,
                        top: 3,
                        marginRight: 8,
                        background: '#EE614C',
                      }}/>
                    <span>概览</span>
                  </div>
                  <div className="plan-detail">
                    <span>项目</span>
                    <span style={{float: 'right'}}>费用</span>
                  </div>
                  <div className="plan-detail">
                    <span>计划开始时间</span>
                    <span style={{float: 'right'}}> {this.props.calcData && this.props.calcData.startTime ? this.props.calcData.startTime : ''}</span>
                  </div>
                  <div className="plan-detail">
                    <span>计划结束时间</span>
                    <span className="plan-detail-color">{this.props.calcData && this.props.calcData.endTime ? this.props.calcData.endTime : ''}</span>
                  </div>
                  <div className="plan-detail">
                    <span>实际还款金额</span>
                    <span className="plan-detail-color">{this.props.calcData && this.props.calcData.repayAmt ? this.props.calcData.repayAmt.toFixed(2) : ''}</span>
                  </div>
                  <div className="plan-detail">
                    <span>实际消费金额</span>
                    <span className="plan-detail-color">{this.props.calcData && this.props.calcData.consumeAmt ? this.props.calcData.consumeAmt.toFixed(2) : ''}</span>
                  </div>
                  <div className="plan-detail">
                    <span>消费手续费</span>
                    <span className="plan-detail-color">{this.props.calcData && this.props.calcData.consumeFee ? (this.props.calcData.consumeFee-this.props.calcData.paymentFee).toFixed(2) : ''}&nbsp;&nbsp;(85元/万元)</span>
                  </div>
                  <div className="plan-detail">
                    <span>还款笔数费</span>
                    <span className="plan-detail-color">{this.props.calcData && this.props.calcData.paymentFee ? this.props.calcData.paymentFee.toFixed(2) : ''}&nbsp;&nbsp;(1元/笔)</span>
                  </div>
                  <div className="plan-detail">
                    <span>预估获得奖励</span>
                    <span className="plan-detail-color">{this.props.calcData ? this.props.calcData.bonus.toFixed(2) : ''}</span>
                  </div>
                  <div className="plan-detail">
                    <span>最低预留金额</span>
                    <span className="plan-detail-color">{this.props.calcData && this.props.calcData.minRetainAmt ? this.props.calcData.minRetainAmt.toFixed(2) : ''}</span>
                  </div>
                  <div className="plan-detail">
                    <span>计划执行地点</span>
                    <span className="plan-detail-color" style={{float: 'right', }}>{this.props.calcData && this.props.calcData.planLocate ? this.props.calcData.planLocate : ''}</span>
                  </div>
                  <div className='querenRepayPlan' style={{ marginTop: '2.5rem' }}
                       onTouchEnd={this.confirmRepayPlan.bind(this)} >
                    确认还款计划
                  </div>
                  <div style={{
                    backgroundColor: 'white',
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '40px',
                    marginTop: '10px'
                  }}>
                    <div style={{ width: '50%', textAlign: 'center' }}>日期</div>
                    <div style={{ width: '25%', textAlign: 'center' }}>类型</div>
                    <div style={{ width: '25%', textAlign: 'center' }}>金额</div>
                  </div>
                  <div style={{
                    backgroundColor: 'white',
                  }}>
                    <RepayPlanDetailsList data={this.props.calcData && this.props.calcData.details ? this.props.calcData.details : ''} />
                  </div>
                </div>
            )

          }

          <ActivityIndicator toast animating={!!this.props.loading}/>
          <Modal
              className='add-plan-modal'
              title={`选择卡券`}
              visible={this.state.visible}
              animationType='slide-up'
              onOk={this.hideModalHandler}
              onClose={this.hideModalHandler}
              onCancel={this.hideModalHandler}
              style={{width: '100%', height: 'auto'}}
          >
            <TicketsMoal ticketType="REPAY_PROP" repayAmt={values.repayAmt} callback={this.chooseTicket}/>
            {/*<div onTouchEnd={this.hideModalHandler}
                         style={{
                           position:'fixed',
                           background:'white',
                           border:'0.083rem solid #7EB74F',
                           margin:'5px auto',
                           width:'95%',
                           fontSize:'14px',
                           lineHeight:'2.5rem',
                           textAlign: 'center',
                           color:'#7EB74F',
                           fontWeight:'700',
                           borderRadius:'15px'
                         }}
                    >关闭</div>*/}
          </Modal>
        </div>
    );
  };
}

const mapStateToProps = (state) => {
  const { creditList, calcData } = state.cust;
  return {
    loading: state.loading.models.cust,
    creditList,
    calcData
  };
}

export default connect(mapStateToProps)(AddRepaymentPlan);
