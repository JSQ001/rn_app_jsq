import React from 'react';
import { connect } from 'dva';
import { ListView } from 'antd-mobile';
import guangfayinhang from 'assets/我的卡包-信用/GDB.png';

import './Balance.css';
// import { offset } from '../../utils/page';



// let pageSize = 4;

// const NUM_ROWS = 4;
let pageIndex = 0;

function genData(pIndex = 0, NUM_ROWS) {
  const dataBlob = {};
  for (let i = 0; i < NUM_ROWS; i++) {
    const ii = (pIndex * NUM_ROWS) + i;
    dataBlob[`${ii}`] = `row - ${ii}`;
  }
  return dataBlob;
}

class BankList extends React.Component {

  constructor(props) {
    super(props);
    const dataSource = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2,
    });

    this.state = {
      dataSource,
      isLoading: true,
      totals: 0,
      data: [],
    };
  }

  componentWillMount() {
    //储蓄卡初始化查询
    this.props.dispatch({
      type: 'cust/getDebitCardList',
      payload: {
        pageSize: 10,
        pageNo: 0
      }
    });

  }

  componentWillReceiveProps() {
    this.setState({
      totals: this.props.total ? parseInt(this.props.total) : 0,
      data: this.props.list ? this.props.list : []
    });
  }

  componentDidMount() {
    setTimeout(() => {
      this.rData = genData(0, this.state.totals);
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(this.rData),
        isLoading: false,
      });
    }, 600);
  }

  onEndReached = (event) => {
    if (this.state.isLoading && !this.state.hasMore) {
      return;
    }
    this.setState({ isLoading: true });
    setTimeout(() => {
      //分页查询
      this.props.dispatch({
        type: 'cust/getDebitCardList',
        payload: {
          pageSize: 10,
          pageNo: 1
        }
      });
      this.rData = { ...this.rData, ...genData(++pageIndex) };
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(this.rData),
        isLoading: false,
      });
    }, 1000);
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

    let index = this.state.data.length - 1;
    const row = (rowData, sectionID, rowID) => {
      if (index < 0) {
        index = this.state.data.length - 1;
      }
      const obj = this.state.data[index--];
      return (
        <div key={rowID} style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100vw',
          marginBottom: '0.833rem'
        }}>
          <div className='guangfayinhangCreditCard'>
            <div className='firstRow'
             onTouchEnd={() => {
              this.props.history.push({
                pathname: `${this.props.state}`,
                bankId: obj&&obj.id? obj.id:''
              })
            }} >
              <div className='bankImg' style={{ justifyContent: 'space-around', width: '45%' }}>
                <img alt='' src={guangfayinhang} style={{ width: '40px' }} />
                <div style={{ color: 'white', fontSize: '1.333rem' }}>
                  {obj.bankName}
                </div>
              </div>
            </div>
            <div className='secoundRowJieji'>
              <div style={{ fontSize: '1.833rem', color: 'white', width: '70%' }}>
                {obj.cardNo}
              </div>
              <div style={{ color: '#ffff00de', width: '15%', fontSize:'1.333rem' }}>
                {this.props.id === obj.id? '已选择':''}
              </div>
            </div>
          </div>
        </div>
      );
    };

    return (
      <div>
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
          pageSize={10}
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
  const { list, total, offset } = state.cust;
  return {
    loading: state.loading.models.cust,
    list,
    total,
    offset
  };
}

export default connect(mapStateToProps)(BankList);
