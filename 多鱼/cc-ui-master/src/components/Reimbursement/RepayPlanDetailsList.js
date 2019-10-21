import React from 'react';
import { connect } from 'dva';
import { ListView } from 'antd-mobile';
import './Reimbursement.scss';

class RepayPlanDetailsList extends React.Component {

  constructor(props) {
    super(props);
    this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = {
      dataSource: this.ds,
    }
    this.listData = []; //数据源
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.data !== this.props.data) {
      this.listData = nextProps.data ? nextProps.data : [];
      this.setState({
        dataSource: this.ds.cloneWithRows(this.listData)
      })
    }
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
          height: '4.167rem',
          color: 'black',
          lineHeight: '2.5rem',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: '95%'
        }}>
          <div style={{ width: '50%', textAlign: 'center' }}>{rowData && rowData.planTime ? rowData.planTime : ''}</div>
          <div style={{ width: '25%', textAlign: 'center' }}>{rowData && rowData.planType && rowData.planType === 'REPAY' ? <span style={{ color: 'red' }}>还款</span> : <span style={{ color: '#c9c92b' }}>消费</span>}</div>
          <div style={{ width: '25%', textAlign: 'right' }}>{rowData && rowData.amount && rowData.planType && rowData.planType === 'REPAY' ? '+' + rowData.amount.toFixed(2) : '-' + rowData.amount.toFixed(2)}</div>
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
          onEndReached={() => this.onEndReached}
          onEndReachedThreshold={10}
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

export default connect(mapStateToProps)(RepayPlanDetailsList);
