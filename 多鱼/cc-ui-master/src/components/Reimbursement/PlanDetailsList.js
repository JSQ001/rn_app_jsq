import React from 'react';
import { connect } from 'dva';
import { ListView, Modal } from 'antd-mobile';
import shanchu from 'assets/计划详情/删除.png';
import chongzhi from 'assets/计划详情/重置.png';
// import { Link } from 'dva/router';
import './Reimbursement.scss';
import { getPlanStatus } from '../../utils/appUtils';

const alert = Modal.alert;


function timeGet(time) {
  var date = new Date(time + 8 * 3600 * 1000); // 增加8小时
  return date.toJSON().substr(0, 19).replace('T', ' ');
}

class PlanDetailsList extends React.Component {

  constructor(props) {
    super(props);
    this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = {
      dataSource: this.ds,
    }
  }



  componentWillReceiveProps(nextProps) {
    if (nextProps.detailsList !== this.props.detailsList) {
      this.listData = nextProps.detailsList ? nextProps.detailsList : [];
      this.setState({
        dataSource: this.ds.cloneWithRows(this.listData)
      })
    }
  }

  reflish = (detailId, planId) => {
    const { dispatch } = this.props
    alert('', '确定重新执行该还款计划么？', [
      { text: '取消', onPress: () => console.log('cancel') },
      {
        text: '确定', onPress: () => {
          dispatch({
            type: 'repayacct/reflishOrder',
            payload: detailId,
            planId
          })
        }
      },
    ])
  }
  delete = (groupId, planId) => {
    const { dispatch } = this.props
    alert('', '确定删除该还款计划么？', [
      { text: '取消', onPress: () => console.log('cancel') },
      {
        text: '确定', onPress: () => {
          dispatch({
            type: 'repayacct/delPlanDt',
            payload: {
              groupId, planId
            },
            cardId: this.props.cardId
          })
        }
      },
    ])
  }
  render() {
    const separator = (sectionID, rowID) => (
      <div
        key={`${sectionID}-${rowID}`}
        style={{
          backgroundColor: '#F5F5F9',
          // height: 8,
          borderTop: '0.083rem solid #ECECED',
          borderBottom: '0.083rem solid #ECECED',
        }}
      />
    );

    const row = (rowData, sectionID, rowID) => {
      return (
        <div key={rowID} style={{
          height: '65px',
          color: 'black',
          lineHeight: '2.5rem',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%'
        }}>
          <div style={{ width: '40%', textAlign: 'center' }}>{timeGet(rowData.planTime)}</div>
          <div style={{ width: '20%', textAlign: 'center' }}>{rowData.planType === 'REPAY' ? <span style={{ color: 'red' }}>还款</span> : <span style={{ color: '#c9c92b' }}>消费</span>}</div>
          <div style={{ width: '20%', textAlign: 'center' }}>{rowData.planType === 'REPAY' && rowData.amount ? '+' + rowData.amount.toFixed(2) : '-' + rowData.amount.toFixed(2)}</div>
          <div style={{ width: '20%', textAlign: 'center', display: 'flex', justifyContent: 'space-evenly', alignItems: 'center' }}>
            <span >{getPlanStatus(rowData.detailStatus)}</span>
            {
              getPlanStatus(rowData.detailStatus) === '待执行' && rowData.planType === 'REPAY' ?
                <img alt='' src={shanchu} style={{ width: '18px' }} onClickCapture={() => { this.delete(rowData.groupId, rowData.planId) }} />
                :
                getPlanStatus(rowData.detailStatus) === '失败' && rowData.planType === 'CONSUME' ?
                  <img alt='' src={chongzhi} style={{ width: '18px' }} onClickCapture={() => { this.reflish(rowData.detailId, rowData.planId) }} />
                  :
                  ''
            }

          </div>

        </div>
      );
    };

    return (
      <div>
        <ListView
          ref={el => this.lv = el}
          dataSource={this.state.dataSource}
          renderRow={row}
          renderSeparator={separator}
          className="packagelist"
          pageSize={4}
          useBodyScroll
          scrollRenderAheadDistance={500}
        />

      </div>
    );
  };
}

const mapStateToProps = (state) => {
  const { detailsList, detailstotal, detailsPageNo } = state.repayacct;
  return {
    loading: state.loading.models.repayacct,
    detailsList,
    detailstotal,
    detailsPageNo
  };
}



export default connect(mapStateToProps)(PlanDetailsList);
