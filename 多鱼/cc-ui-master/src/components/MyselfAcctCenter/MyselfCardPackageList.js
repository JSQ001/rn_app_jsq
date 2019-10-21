import React from 'react';
import { connect } from 'dva';
import { ListView, Modal } from 'antd-mobile';
import morenlogo from 'assets/我的卡包-信用/DEFAULT_LOGO.png';
import shanchu from 'assets/img/mine/delete.png';
import './AcctCenter.scss';
import { Link } from 'dva/router';
import { fourCardNo, bankImg } from '../../utils/appUtils';


const alert = Modal.alert;


class MyselfCardPackageList extends React.Component {

  constructor(props) {
    super(props);
    this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = {
      dataSource: this.ds,
    }
  }

  componentWillMount() {
    //信用卡初始化查询
    this.props.dispatch({
      type: 'cust/getCreditCardList',
      payload: {
        pageSize: 20,
        pageNo: 1
      }
    });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.creditList !== this.props.creditList) {
      this.listData = nextProps.creditList ? nextProps.creditList : [];
      this.setState({
        dataSource: this.ds.cloneWithRows(this.listData)
      })
    }
  }


  //跳转
  confirm = () => {
    this.props.history.push({ pathname: '/firstPage' })
  }

  delCard = (id) => {
    const { dispatch } = this.props
    alert('', '确定删除该卡片么', [
      { text: '取消', onPress: () => {}},
      {
        text: '确定', onPress: () => {
          dispatch({
            type: 'cust/delCard',
            payload: id,
            types: 'XYK'
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
      const creditArr = bankImg.find((element) => (element.label === (rowData && rowData.bankName))) || { value: morenlogo,style: 'blueBackgroundColor' };

      return (
        <div key={rowID} style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100vw',
          marginBottom: '0.833rem'
        }}>
          <div className={creditArr && creditArr.style}>
            <div className='firstRow'>
              <div className='bankImg' style={{ width: rowData&&rowData.bankName&&rowData.bankName.length>4? '72%' :'60%'}}>
                <img alt='' src={creditArr && creditArr.value}
                  style={{ width: '40px', float: 'left' }} />
                <div style={{ fontSize: '1.333rem' }}>
                  {rowData.bankName}
                  <span>(尾号{fourCardNo(rowData.cardNo)})</span>
                </div>
              </div>
              <div style={{ width: '15%' }}>
                <img alt='' src={shanchu} style={{ width: '1.167rem' }} onTouchEnd={() => this.delCard(rowData.id)} />
              </div>
            </div>
            <div className='secoundRow'>
              <div style={{ width: '50%', textAlign: 'center', fontSize: '1.833rem' }}>
                {rowData.creditLimit}&nbsp;<span style={{ fontSize: '1.333rem' }}>额度</span>
              </div>
              <div style={{ width: '50%', textAlign: 'center', fontSize: '1.833rem' ,borderLeft: '2px solid #F6F6F6'}}>
                {rowData && rowData.lastRepayDays ? rowData.lastRepayDays : '0'}&nbsp;<span style={{ fontSize: '1.333rem' }}>天到期</span>
              </div>
            </div>
            <div className='thirdRow'>
              <Link to={`/editCreditCard/${this.props.addr}/${this.props.addred}/${rowData.id}`} className='editInfo'>
                <div >
                  修改信息
                </div>
              </Link>
              <Link to={`/repaymentPlan/${this.props.addr}/${this.props.addred}/${rowData.id}`} className='editInfo'>
                <div >
                  还款计划
                </div>
              </Link>
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
          // renderFooter={() => (<div style={{ padding: 10, textAlign: 'center' }}>
          //     {this.state.isLoading ? 'Loading...' : '我也是有底线的'}
          // </div>)}
          renderRow={row}
          renderSeparator={separator}
          className="packagelist"
          pageSize={4}
          useBodyScroll
          scrollRenderAheadDistance={500}
          onEndReached={() => this.onEndReached}
          onEndReachedThreshold={0.1}
        />

      </div>
    );
  };
}

const mapStateToProps = (state) => {
  const { creditList, creditTotal, creditPageNo } = state.cust;
  return {
    loading: state.loading.models.cust,
    creditList,
    creditTotal,
    creditPageNo
  };
}

export default connect(mapStateToProps)(MyselfCardPackageList);
