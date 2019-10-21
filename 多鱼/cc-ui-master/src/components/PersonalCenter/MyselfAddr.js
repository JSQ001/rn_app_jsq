import React from 'react';
import { connect } from 'dva';
import { ListView, Modal } from 'antd-mobile';
import back from 'assets/忘记密码/返回.png';
import moren from 'assets/我的地址1/默认.png';
import shanchu from 'assets/我的地址1/删除.png';
import './Personal.scss';
import AddrModal from './AddrModal';
import EditAddrModal from './EditAddrModal';


const alert = Modal.alert;


class MyselfAddr extends React.Component {

  constructor(props) {
    super(props);
    this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = {
      dataSource: this.ds,
    }
    this.listData = []; //数据源
  }

  //查询我的地址信息
  componentWillMount() {
    this.props.dispatch({
      type: 'cust/getAddrList',
      payload: {
        pageNo: 1,
        pageSize: 50
      }
    });
  }




  componentWillReceiveProps(nextProps) {
    if (nextProps.listAddr !== this.props.listAddr) {
      this.listData = nextProps.listAddr ? nextProps.listAddr : [];
      this.setState({
        dataSource: this.ds.cloneWithRows(this.listData)
      })
    }
  }
  //地址删除
  deleteAddr(id) {
    const { dispatch } = this.props
    dispatch({
      type: 'cust/delAddr',
      payload: id
    })
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
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-around',
          alignItems: 'center',
          width: '95vw',
          backgroundColor: '#FFFFFF',
          marginTop: '0.833rem',
          borderRadius: '0.833rem',
          position: 'relative',
          height: '6.667rem'
        }}>
          <img alt='' src={moren} style={{
            width: '45px', position: 'absolute', top: '0px', right: '0px',
            visibility: rowData && rowData.isDefalut && rowData.isDefalut === "Y" ? 'visible' : 'hidden'
          }} />
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '95%',
          }}
            onTouchEnd={() => {
              if (this.props.location.state === '/personalCenter') {
                return;
              } else {
                this.props.history.push({
                  pathname: `${this.props.location.state}`,
                  state: rowData && rowData.addrId ? rowData.addrId : ''
                })
              }
            }}>
            <div style={{ fontSize: '15px', width: '40%' }}>
              姓名：{rowData && rowData.receiverName ? rowData.receiverName : ''}
            </div>
            <div style={{ fontSize: '15px', width: '50%' }}>
              手机:{rowData && rowData.receiverTel ? rowData.receiverTel : ''}
            </div>
            <div style={{ width: '10%' }}>
            </div>
          </div>
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '95%'
          }}>
            <div style={{ width: '90%', display: 'flex' }} onTouchEnd={() => {
              if (this.props.location.state === '/personalCenter') {
                return;
              } else {
                this.props.history.push({
                  pathname: `${this.props.location.state}`,
                  state: rowData && rowData.addrId ? rowData.addrId : ''
                })
              }
            }}>
              <span>地址：</span>
              <p style={{ fontSize: '15px', width: '22.5rem', display: 'inline-block', margin: '0px' }}>{rowData && rowData.address && rowData.city
                && rowData.district && rowData.province ? rowData.province + rowData.city + rowData.district + rowData.address : ''}</p>
            </div>
            <EditAddrModal data={rowData ? rowData : ''} />
            <div style={{ width: '10%' }} onTouchEndCapture={() => {
              alert('', '确认删除该地址？', [
                { text: '取消', onPress: () => console.log('cancel') },
                { text: '确认', onPress: () => this.deleteAddr(rowData.addrId) },
              ])
            }}>
              <img alt='' src={shanchu} style={{ width: '1.167rem' }} />
            </div>
          </div>
        </div>
      );
    };

    return (
      <div style={{ paddingTop: '8.333rem',background: 'white' }}>
        <div className='headStyle' style={{ height: '8.333rem'}}>
          <div style={{
            height: '100%',
            width: '6.667rem',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'absolute',
            left: '0px'
          }} onClickCapture={() => { this.props.history.goBack(-1) }}>
            <img alt='' src={back} style={{ width: '26px', zIndex: '200' }} />
          </div>
          <div style={{ fontSize: '2.3rem', display: 'inline-block' }}>我的地址</div>
        </div>
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
        <AddrModal />
      </div>
    );
  };
}

const mapStateToProps = (state) => {
  const { listAddr, total, pageNo } = state.cust;
  return {
    loading: state.loading.models.application,
    listAddr,
    total,
    pageNo
  };
}

export default connect(mapStateToProps)(MyselfAddr);
