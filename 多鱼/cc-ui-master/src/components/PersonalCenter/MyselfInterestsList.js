import React from 'react';
import { connect } from 'dva';
import { ListView } from 'antd-mobile';
// import shanchu from 'assets/计划详情/删除.png';
// import chongzhi from 'assets/计划详情/重置.png';
// import { Link } from 'dva/router';
import './Personal.scss';


// const NUM_ROWS = data.length;

function genData(pIndex = 0, NUM_ROWS) {
  const dataBlob = {};
  for (let i = 0; i < NUM_ROWS; i++) {
    const ii = (pIndex * NUM_ROWS) + i;
    dataBlob[`${ii}`] = `row - ${ii}`;
  }
  return dataBlob;
}

let data = [];

class MyselfInterestsList extends React.Component {

  constructor(props) {
    super(props);
    const dataSource = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2,
    });

    this.state = {
      dataSource,
      isLoading: true,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.data === this.props.data) {
      return;
    } else {
      data = nextProps.data;
      setTimeout(() => {
        this.rData = genData(0, data.length);
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(this.rData),
          isLoading: false,
        });
      }, 600);
      return;
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

    let index = data.length - 1;
    const row = (rowData, sectionID, rowID) => {
      if (index < 0) {
        index = data.length - 1;
      }
      const obj = data[index--];
      return (
        <div key={rowID} style={{
          color: 'black',
          lineHeight: '2.5rem',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
          height: '16%',
          backgroundColor: Math.abs(index) % 2 === 0 ? '#fafafa' : '#f2f2f2'
        }}>
          <div style={{ width: '20%', textAlign: 'center', fontSize: '0.833rem' }}>{obj && obj.userLevelName ? obj.userLevelName : ''}</div>
          <div style={{ width: '20%', textAlign: 'center', fontSize: '0.833rem' }}>{obj && obj.onlineFeeRate ? obj.onlineFeeRate + '%' : ''}</div>
          <div style={{ width: '20%', textAlign: 'center', fontSize: '0.833rem' }}>{obj && obj.offlineFeeRate ? obj.offlineFeeRate + '%' : ''}</div>
          <div style={{ width: '17%', textAlign: 'center', fontSize: '0.833rem' }}>{obj && obj.levelUpRate ? obj.levelUpRate + '%' : ''}</div>
          <div style={{ width: '23%', textAlign: 'center', fontSize: '0.833rem' }}>{obj && obj.desc ? obj.desc : ''}</div>
        </div>
      );
    };

    return (
      <ListView
        ref={el => this.lv = el}
        dataSource={this.state.dataSource}
        // renderHeader={() => <div className='headStyle'>
        //     <img alt='' src={back} onClickCapture={() => { this.props.history.goBack(-1) }} style={{position:'relative', top:'2.5rem', left:'1.167rem', width:'4%'}} onTouchEnd={this.confirm} />
        //         <br/>
        //     <p style={{color:'white', position:'relative', textAlign:'center', fontSize:'1.167rem', top:'-12px'}}>商品列表</p>
        // </div>}
        // renderFooter={() => (<div style={{ padding: 30, textAlign: 'center' }}>
        //     {this.state.isLoading ? 'Loading...' : '我也是有底线的'}
        // </div>)}
        renderRow={row}
        renderSeparator={separator}
        className="packagelist"
        pageSize={4}
        useBodyScroll
        scrollRenderAheadDistance={500}
        style={{ height: '84%' }}
      />

    );
  };
}

const mapStateToProps = (state) => {
  return {
    loading: state.loading.models.application,
  };
}

export default connect(mapStateToProps)(MyselfInterestsList);
