import React from 'react';
import { connect } from 'dva';
import { ListView } from 'antd-mobile';
import './User.css';


const data = [
  {
    img: 'https://zos.alipayobjects.com/rmsportal/dKbkpPXKfvZzWCM.png',
    title: '1',
    des: '华为笔记本',
    price: '331'
  },
  {
    img: 'https://zos.alipayobjects.com/rmsportal/XmwCzSeJiqpkuMB.png',
    title: '2',
    des: '苹果手机',
    price: '331'
  },
  {
    img: 'https://zos.alipayobjects.com/rmsportal/hfVtzEhPzTUewPm.png',
    title: '3',
    des: '华为手机',
    price: '331'
  },
];


const NUM_ROWS = data.length;
let pageIndex = 0;

function genData(pIndex = 0) {
  const dataBlob = {};
  for (let i = 0; i < NUM_ROWS; i++) {
    const ii = (pIndex * NUM_ROWS) + i;
    dataBlob[`${ii}`] = `row - ${ii}`;
  }
  return dataBlob;
}

class Demo extends React.Component {
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

  componentDidMount() {
    setTimeout(() => {
      this.rData = genData();
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
    let index = data.length - 1;
    const row = (rowData, sectionID, rowID) => {
      if (index < 0) {
        index = data.length - 1;
      }
      const obj = data[index--];
      return (
        <div key={rowID} style={{ padding: '0 15px' }}>
          <div style={{ display: '-webkit-box', padding: '15px 0' }}>
            <img style={{ height: '64px', marginRight: '15px' }} src={obj.img} alt="" />
            <div style={{ lineHeight: 1, marginTop: '12px', }}>
              <div style={{ marginBottom: '8px', fontWeight: 'bold' }}>{obj.des}</div>
              <div style={{ fontWeight: 'bold', marginTop: '15px', fontSize: '12px' }}>{obj.des}</div>
              <div style={{ marginLeft: '200px', marginTop: '-48px' }}><span style={{ fontSize: '25px', color: '#e4b664' }}>{obj.price}</span>元</div>
              <div className='clickBuy'>
                点击购买
              </div>
            </div>
          </div>
        </div>
      );
    };
    return (
      <ListView
        ref={el => this.lv = el}
        dataSource={this.state.dataSource}
        // renderHeader={() => <span></span>}
        renderFooter={() => (<div style={{ padding: 30, textAlign: 'center' }}>
          {this.state.isLoading ? 'Loading...' : '我也是有底线的'}
        </div>)}
        renderRow={row}
        renderSeparator={separator}
        className="am-list"
        pageSize={4}
        useBodyScroll
        scrollRenderAheadDistance={500}
        onEndReached={() => this.onEndReached}
        onEndReachedThreshold={10}
      />
    );
  }
}

const mapStateToProps = (state) => {
  return {
    loading: state.loading.models.application,
  };
}

export default connect(mapStateToProps)(Demo);
