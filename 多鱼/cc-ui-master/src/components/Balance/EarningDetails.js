import React from 'react';
import { connect } from 'dva';
import back from 'assets/忘记密码/返回.png';
import './Balance.css';
import { hiddenPhone } from '../../utils/appUtils'
import PageHeader from "../common/layout/page-header";
import logo from 'assets/img/logo/logo.png'

function timeGet(time) {
    var date = new Date(time + 8 * 3600 * 1000); // 增加8小时
    return date.toJSON().substr(0, 19).replace('T', ' ');
}

class EarningDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    displayText(subUserLevel, userLevel) {
        if (subUserLevel === userLevel && subUserLevel === "USER") {
            return "会员推荐会员享受还款金额0.01%收益"
        } else if (subUserLevel === userLevel && subUserLevel === "DIAMOND") {
            return "状元推荐状元，享受其整个团队还款流水0.01%收益"
        } else if(!subUserLevel){//下级为空
            return "高级会员，享受自我消费差额分润"
        }else {
            return "差额费率分润"
        }
    }

    render() {
        const { location: { states } } = this.props;
        const subMobile = states && states.subMobile ?states.subMobile:states&&states.mobile?states.mobile:"";
        const subRate = states && states.subRate ?states.subRate:states&&states.rate?states.rate:0.00;
        const subTmpRate = states && states.subRate ?states.subRate:states&&states.rate?0.85:0.00;//默认统一计价
        const disRate = states && states.rate ? subTmpRate ? subTmpRate - states.rate: subRate-states.rate:0.00;
        return (
            <div style={{background:'#fff',height: '100vh'}}>
                <PageHeader title="收益明细"/>

                <div className='page-flex-column'>
                  <div>
                    <img style={{width: 50, height: 50}} src={logo} alt=""/>
                  </div>
                  <div style={{margin: 10}}>多鱼</div>
                  <div style={{ fontSize: '2.5rem', fontWeight: 700}}>+{states && states.revenueAmt && states.revenueAmt.toFixed(2) || '100.00'}</div>
                  <div style={{ fontSize: 18,margin: 10,}}>
                     <p style={{
                         display: 'inline-block',
                         background: '#EE614C',
                         width: 20,
                         height: 20,
                         borderRadius: 90,
                         color: 'white'}}>￥</p>
                    <span style={{ marginLeft: 5,color: 'rgb(199,199,199)'}}>获取收益</span>
                  </div>
                </div>

                <div
                    style={{
                    width: '100vw',
                    height: '28vh',
                    justifyContent:'center',
                    paddingTop: '0.833rem',
                    borderTop: '0.083rem solid rgb(218,218,218)',
                    borderBottom: '0.083rem solid rgb(218,218,218)'
                }}>
                  <div style={{paddingLeft: '18px',lineHeight:'35px'}}>
                    【订单金额】：￥{states && states.amount && states.amount.toFixed(2) || 100.00}
                  </div>
                  <div style={{paddingLeft: '26px',lineHeight:'35px'}}>
                    <div style={{ width: '60%', textAlign: 'left', float: 'left' }}>刷卡人：{states && subMobile && hiddenPhone(subMobile)}</div>
                    <div style={{ width: '32%', textAlign: 'right', float: 'left' }}>费率：{states && subRate && subRate.toFixed(2)}%</div>
                  </div>
                  <div style={{paddingLeft: '26px',lineHeight:'35px'}}>
                    <div style={{ width: '60%', textAlign: 'left', float: 'left' }}>收益人：{states && states.mobile && hiddenPhone(states.mobile)}</div>
                    <div style={{ width: '32%', textAlign: 'right', float: 'left' }}>费率：{states && states.rate && states.rate.toFixed(2)}%</div>
                  </div>
                  <div style={{ marginTop:'0.833rem',padding: '26px',lineHeight: '38px', fontSize: '12px' }}>
                    收益计算={states && states.amount && states.amount.toFixed(2)}*
                    {disRate.toFixed(2)}%={states && states.revenueAmt && states.revenueAmt.toFixed(2)}元&nbsp;({this.displayText(states && states.subUserLevel, states && states.userLevel)})
                  </div>
                </div>
                <div style={{ height: '4.167rem', width: '90%', marginLeft: '15px', paddingTop: '15px' }}>
                    <div style={{ marginLeft: '2px',height: '25px', width: '100%', float: 'left', color: '#aaaaaa' }}>
                      【订单编号】：{states && states.orderId}
                    </div>
                    <div style={{marginLeft: '0.833rem', height: '25px', width: '100%', float: 'left', textAlign: 'left', color: '#aaaaaa' }}>
                      订单时间：{states && states.revenueDate && timeGet(states.revenueDate)}
                    </div>

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
export default connect(mapStateToProps)(EarningDetails);

