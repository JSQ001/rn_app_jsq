import React from 'react';
import { connect } from 'dva';
import { List, WhiteSpace } from 'antd-mobile';
import back from 'assets/忘记密码/返回.png';
import './Balance.css';
import { billType, billStatus, statusX } from '../../utils/appUtils'
import PageHeader from "../common/layout/page-header";
import logo from "assets/img/logo/logo.png";

function timeGet(time) {
  var date = new Date(time + 8 * 3600 * 1000); // 增加8小时
  return date.toJSON().substr(0, 19).replace('T', ' ');
}

class BillDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    const { location: { states } } = this.props
    const type = states && states.transType && billType.find(v => v.value === states.transType)
    const statuss = states && states.status && billStatus.find(v => v.value === states.status)
    const statusx = states && states.status && statusX.find(v => v.value === states.transType)
    return (
      <div className='page-content'>
        <PageHeader title="账单详情"/>

        <div className='page-flex-column'
            style={{marginTop:'2vh',paddingBottom: '5vh'}}
        >
          <div style={{margin: 10, fontSize: 30, fontWeight: 700}}>¥{states && states.revenueAmt && states.revenueAmt.toFixed(2) || '100.00'}</div>
          <span style={{marginLeft: 5,color: 'rgb(199,199,199)'}}>成功</span>

        </div>

        <WhiteSpace style={{height: '14px', background: 'rgb(245,244,249)'}}/>


        <div style={{ height: '240px', backgroundColor: 'white', marginTop: '0.833rem' }}>
          <div style={{ width: '90%', marginLeft: '18px', }}>
            <div className='billDatilsStyle'>
              <div className='billDatilsStyle-div1'>交易金额</div>
              <div className='billDatilsStyle-div2'>{(statusx && states.amount && statusx.label + states.amount.toFixed(2) + '') || '0.00'}</div>
            </div>
            <div className='billDatilsStyle'>
              <div className='billDatilsStyle-div1'>手续费用</div>
              <div className='billDatilsStyle-div2'>{(states && states.feeAmt && states.feeAmt.toFixed(2)) || '0.00'}</div>
            </div>
            <div className='billDatilsStyle'>
              <div className='billDatilsStyle-div1'>账单分类</div>
              <div className='billDatilsStyle-div2'>{(type && type.label) || (states && states.transType)}</div>
            </div>
            <div className='billDatilsStyle'>
              <div className='billDatilsStyle-div1'>交易时间</div>
              <div className='billDatilsStyle-div2'>{states && states.transTime && timeGet(states.transTime)}</div>
            </div>
            <div className='billDatilsStyle'>
              <div className='billDatilsStyle-div1'>订单号</div>
              <div className='billDatilsStyle-div2'>{states && states.id}</div>
            </div>
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

export default connect(mapStateToProps)(BillDetails);
