import React from 'react';
import { connect } from 'dva';
import { ListView, Modal } from 'antd-mobile';
import morenlogo from 'assets/我的卡包-信用/DEFAULT_LOGO.png';
import shanchu from 'assets/img/mine/delete.png';
import './AcctCenter.scss';
import { hiddenBankCard, bankImg } from '../../utils/appUtils';

const alert = Modal.alert;


let pageSize = 30;



class MyselfCardPackageList2 extends React.Component {

  constructor(props) {
    super(props);
    this.ds = new ListView.DataSource({
      getRowData: (dataBlob, sectionID, rowID) => dataBlob[rowID],
      getSectionHeaderData: (dataBlob, sectionID) => dataBlob[sectionID],
      rowHasChanged: (row1, row2) => row1 !== row2,
      sectionHeaderHasChanged: (s1, s2) => s1 !== s2,

    });
    this.state = {
      dataSource: this.ds,
    }
  }

  componentWillMount() {
    //储蓄卡初始化查询
    this.props.dispatch({
      type: 'cust/getDebitCardList',
      payload: {
        pageSize: pageSize,
        pageNo: 1
      }
    });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.list !== this.props.list) {
      this.listData = nextProps.list ? nextProps.list : [];
      this.setState({
        dataSource: this.ds.cloneWithRows(this.listData)
      })
    }
  }



  //设置银行卡默认
  chooseDefault = (id) => {
    alert('', '确定设置此卡片为默认么？', [
      { text: '取消', onPress: () => {} },
      {
        text: '确定', onPress: () => {
          this.props.dispatch({
            type: 'cust/setDefaultCard',
            payload: id
          });
        }
      },
    ])
  }

  //跳转
  confirm = () => {
    this.props.history.push({ pathname: '/firstPage' })
  }
  delCard = (id) => {
    const { dispatch } = this.props
    alert('', '确定删除该卡片么', [
      { text: '取消', onPress: () => console.log('cancel') },
      {
        text: '确定', onPress: () => {
          dispatch({
            type: 'cust/delCard',
            payload: id,
            types: 'CXK'
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
      const creditArr = bankImg.find((element) => (element.label === (rowData && rowData.bankName))) || { value: morenlogo,style:'blueBackgroundColor' };
      return (
        <div key={rowID} style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100vw',
          marginBottom: '0.833rem'
        }}>
          <div className={creditArr && creditArr.style}>
            <div className='firstRow' >
              <div className='bankImg' style={{ justifyContent: 'space-around', width: '45%' }}>
                <img alt='' src={creditArr && creditArr.value}
                  style={{ width: '40px' }} />
                <div style={{  fontSize: '1.333rem' }}>
                  {rowData && rowData.bankName}
                </div>
              </div>
              <div style={{ width: '15%' }}>
                <img alt='' src={shanchu} style={{ width: '1.167rem' }} onTouchEnd={() => this.delCard(rowData.id)} />
              </div>
            </div>


            <div className='secoundRowJieji'>
              <div style={{ fontSize: '1.833rem',  width: '70%' }}>
                {rowData && hiddenBankCard(rowData.cardNo)}
              </div>
              <div style={{ fontSize:'1.333rem', width: '30%' }}>
                {
                  rowData && rowData.isDefault === 'Y' ?
                    <p style={{ color: 'white', background:'#A7D87F',borderRadius:'1.167rem',width: '70%'  }}>已默认</p>
                    :
                    <p  style={{ color: '#A7D87F', background:'white',border:'0.083rem solid #A7D87F',borderRadius:'1.167rem',width: '70%'  }} onTouchEndCapture={() => this.chooseDefault(rowData.id)}>选择默认</p>
                }

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
  const { list, total, offset } = state.cust;
  return {
    loading: state.loading.models.cust,
    list,
    total,
    offset
  };
}

export default connect(mapStateToProps)(MyselfCardPackageList2);
