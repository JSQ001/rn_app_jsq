import React from 'react';
import { connect } from 'dva';
import { Picker, List } from 'antd-mobile';
import back from 'assets/忘记密码/返回.png';
import BillList from './BillList';
import './Balance.css';
import { billType, billStatus } from '../../utils/appUtils'
import PageHeader from "../common/layout/page-header";


class Bill extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      billTypeValue: '',
      billStatusValue: '',
    };
  }

  //初始化查询每日收益信息
  componentWillMount() {
    this.props.dispatch({
      type: 'payment/getBillCheckList',
      payload: {
        pageSize: 15,
        pageNo: 1,
        transType: '',
        status: ''
      }
    });
  }

  confirm = () => {
    this.props.history.push({ pathname: `/billDetails/${this.props.match.params.addr}` })
  }



  render() {
    const { billTypeValue, billStatusValue } = this.state
    return (
      <div className="page-content">
        <PageHeader title='账单'/>

        <div style={{
          height: '55px',
          backgroundColor: 'white',
          display: 'flex',
          justifyContent: 'space-evenly',
          alignItems: 'center',
          zIndex: '100',
          position: 'fixed',
          top: '75px',
          width: '100%',
          borderBottom: '0.083rem solid #f5f5f9'
        }}>
          <div style={{ width: '50%' }} >

            <Picker extra={<span/>} data={billType} cols={1}
              value={billTypeValue} onChange={v => { this.setState({ billTypeValue: v }) }}>
              <List.Item  arrow="down" >订单类型</List.Item>
            </Picker>
          </div>
          <div style={{ width: '50%' }} >

            <Picker extra={<span/>} data={billStatus} cols={1}
              value={billStatusValue} onChange={v => { this.setState({ billStatusValue: v }) }}>
              <List.Item  arrow="down" >订单状态</List.Item>
            </Picker>
          </div>

        </div>
        <BillList
          addr={this.props.match.params.addr}
          addred={this.props.match.params.addred}
          transType={billTypeValue}
          billStatus={billStatusValue}
          {...this.props}
        />
      </div>
    );
  };
}

const mapStateToProps = (state) => {
  return {
    loading: state.loading.models.application,
  };
}

export default connect(mapStateToProps)(Bill);
