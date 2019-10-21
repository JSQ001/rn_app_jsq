import React from 'react';
import { connect } from 'dva';
import {Modal, WhiteSpace} from 'antd-mobile';
import back from 'assets/忘记密码/rtn-white.png';
import './Reimbursement.scss';
import Ring3 from './Ring3';
import PlanDetailsList from './PlanDetailsList';
import '../MyselfAcctCenter/AcctCenter.scss';
import PageHeader from '../common/layout/page-header'

const alert = Modal.alert;


class PlanDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    componentWillMount() {
        this.props.dispatch({
            type: 'repayacct/getRepayDetails',
            payload: {
                planId: this.props.match.params.id,
                pageNo: 1,
                pageSize: 100
            }
        });
    }

    endPlan = () => {
        const { dispatch } = this.props
        alert('', '确定终止该还款计划么？', [
            { text: '取消', onPress: () => console.log('cancel') },
            {
                text: '确定', onPress: () => {
                    dispatch({
                        type: 'repayacct/endPlan',
                        payload: this.props.match.params.id,
                        cardId: this.props.match.params.cardId
                    })
                }
            },
        ])
    }


    render() {
        const { detailsPlan, detailsList } = this.props;
        const flag = detailsList.some(v => v.detailStatus === 'FAIL' && v.planType === 'CONSUME');
        return (
            <div style={{background: '#fff'}}>
                <PageHeader title="还款计划详情"/>
                <div style={{ background: '#EE614C', height: '2.5rem',paddingLeft: '1.333rem', lineHeight: '2.5rem', color: 'white' }}>{detailsPlan && detailsPlan.planLocate ? detailsPlan.planLocate : ''}</div>

                <div className='planDetail'>
                    <div style={{ height: '15rem',textAlign: 'center', margin: '15px auto',width:'50%'}}>
                    <div>
                      <Ring3 percent={detailsPlan && detailsPlan.repayedAmt!==null && detailsPlan.totalRepayAmt!==null ? (detailsPlan.repayedAmt / detailsPlan.totalRepayAmt * 100).toFixed(2) : 't'} />
                    </div>
                    <div style={{ marginTop: '-95px', color: '#EE614C' }}>
                      <p>已还款</p>
                      <p style={{ marginTop: '-5px' }}>{detailsPlan && detailsPlan.repayedAmt && detailsPlan.repayedAmt.toFixed(2)}</p>
                    </div>
                  </div>
                    <div style={{ display: 'flex',height: '18vh', backgroundColor: 'white',width:'100vw' }}>
                        <div style={{ width: '30vw', textAlign: 'left',marginLeft:'18px' }}>
                            <p style={{ color: '#bebebe' }}>完成还款时间</p>
                            <p>{detailsPlan && detailsPlan.lastRepayDate ? detailsPlan.lastRepayDate : ''}</p>
                        </div>
                        <div style={{ width: '30vw', textAlign: 'left',marginLeft:'18px' }}>
                            <p style={{ color: '#bebebe' }}>总手续费</p>
                            <p>{detailsPlan && detailsPlan.totalFee ? detailsPlan.totalFee.toFixed(2) : ''}</p>
                        </div>
                        <div style={{ width: '30vw', textAlign: 'left' }}>
                            <p style={{ color: '#bebebe' }}>还款总金额</p>
                            <p>{detailsPlan && detailsPlan.totalRepayAmt ? detailsPlan.totalRepayAmt.toFixed(2) : '123'}</p>
                        </div>
                    </div>

                </div>

                <WhiteSpace style={{height: '1vh', marginTop: '5vw', background:'rgb(250,250,250)'}} />
                <div className='planDetailDesc'>
                    <div className='planDescTitle'>
                        <div style={{width:'70%',float:'left'}}><p/><span>还款计划</span></div>
                        {
                            flag ?
                                <div style={{ float:'left',width:'30%'}} onClickCapture={(() => this.endPlan())}>
                                    <p style={{ textAlign:'center',width:'6.667rem',lineHeight:'24px',height:'24px',borderRadius:'1.167rem',background:'white',border: '0.083rem solid #FF8E8E',color:'#FF8E8E'}}>终止</p>
                                </div>
                                :
                                null
                        }

                    </div>
                    <div style={{
                        backgroundColor: 'white',
                        width: '100%',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: '65px'
                    }}>
                        <div style={{ width: '40%', textAlign: 'center' }}>日期</div>
                        <div style={{ width: '20%', textAlign: 'center' }}>类型</div>
                        <div style={{ width: '20%', textAlign: 'center' }}>金额</div>
                        <div style={{ width: '20%', textAlign: 'center' }}>状态</div>
                    </div>
                    <div style={{
                        backgroundColor: 'white',
                    }}>
                        <PlanDetailsList cardId={this.props.match.params.cardId} />
                    </div>
                </div>


            </div>
        );
    };
}

const mapStateToProps = (state) => {
    const { detailsList, detailstotal, detailsPageNo, detailsPlan } = state.repayacct;
    return {
        loading: state.loading.models.repayacct,
        detailsList, detailstotal, detailsPageNo, detailsPlan
    };
}

export default connect(mapStateToProps)(PlanDetails);
