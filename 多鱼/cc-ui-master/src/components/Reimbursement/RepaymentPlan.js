import React from 'react';
import { connect } from 'dva';
import back from 'assets/忘记密码/返回.png';
import {ListView, Toast, WhiteSpace} from 'antd-mobile';
import morenlogo from 'assets/我的卡包-信用/DEFAULT_LOGO.png';
import './Reimbursement.scss';
import Ring from './Ring';
import { fourCardNo, getPlanStatus,bankImg } from '../../utils/appUtils';
import '../MyselfAcctCenter/AcctCenter.scss';
// import button from 'assets/登录页/按钮.png'
import BankCard from '../MyselfAcctCenter/bankCard'
import PayPlan from "../MyselfAcctCenter/payPlan";
import PageHeader from "components/common/layout/page-header";
function timeGet(time) {
  var date = new Date(time + 8 * 3600 * 1000); // 增加8小时
  return date.toJSON().substr(0, 19).replace('T', ' ');
}

class RepaymentPlay extends React.Component {


  constructor(props) {
    super(props);

    this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = {
      dataSource: this.ds,
      currentCard: {},
    };

    this.listData = []; //数据源
    this.len = null; //数据的个数
    this.count = null; //当前数据总页数
    this.pageSize = 6; //每次渲染的个数
    this.page = 1; //当前页数,
  }

  componentDidMount() {
    //初始化查询信用卡信息
    this.props.dispatch({
      type: 'cust/getCreditCardList',
      payload: {
        pageSize: 20,
        pageNo: 1
      },
      id: this.props.match.params.id
    });

    //初始化查询还款计划列表
    this.props.dispatch({
      type: 'repayacct/getRepayPlanList',
      payload: {
        pageNo: 1,
        pageSize: 6
      }
    });

  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.list !== this.props.list) {
      this.listData = nextProps.list ? this.listData.concat(nextProps.list) : this.listData;
      this.len = nextProps.total ? parseInt(nextProps.total) : 0;
      this.count = Math.ceil(this.len / this.pageSize);
      if (this.setData().length > 0) {
        this.setState({
          dataSource: this.ds.cloneWithRows(this.setData())
        })
      }
    }
  }

  setData() {
    let num = this.page * this.pageSize; //获取要渲染的个数
    if (num > this.len) num = this.len; //如果到最后一页 num 大于 len 那么num等于len 防止空数据

    let data = [];
    for (let i = 0; i < num; i++) {
      data.push(this.listData[i]);
    }
    return data;
  }


  onEndReached = (item) => {
    if (this.state.isLoading) {
      return;
    }
    //如果page<count 那么我们让page++ 重新设置dataSource
    if (this.page < this.count) {
      const creditArray = this.props.creditList ? this.props.creditList : [];
      this.page++;
      //分页查询
      this.props.dispatch({
        type: 'repayacct/getRepayPlanList',
        payload: {
          pageNo: this.page,
          pageSize: 6,
          cardNo: (creditArray && creditArray.find((element) => (element.id === Number(this.props.match.params.id)))) || {}
        }
      });
    } else {
      return false;
    }
  }

  //跳转首页
  confirm = () => {
    this.props.history.push({ pathname: '/firstPage' })
  };


  render() {
    //定义数组查询对应的信用卡信息
    const creditArray = this.props.creditList ? this.props.creditList : [];
    const creditArr = creditArray.find((element) => (element.id === Number(this.props.match.params.id)));
    const bankArr = bankImg.find((element) => (element.label === (creditArr && creditArr.bankName))) || { value: morenlogo,style: 'blueBackgroundColor' };

    const {creditList, match: {params}} = this.props;
    const currentCard = ( creditList||[]).find(item=>String(item.id) === String(params.id));
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
      console.log(rowData)
      return (
        <div style={{
          width: '90vw',
          //height: '14.167rem',
          display: 'flex',
          margin: '0 auto'
        }} onClickCapture={() => {
          if (rowData.planStatus === 'CANCEL') {
            return
          }
          this.props.history.push(`/planDetails/${this.props.match.params.addr}/${this.props.match.params.addred}/${rowData && rowData.planId ? rowData.planId : ''}/${this.props.match.params.id}`)
        }}>
          <div style={{ width: '100%' }}>
            <div>
              <div className={rowData.planStatus === 'RUNNING' || rowData.planStatus === 'TODO'? 'tuoyuan3':rowData.planStatus === 'END'? 'tuoyuan2' : 'tuoyuan1'} />
              <span style={{
                width: '40vw',
                marginLeft: '1rem',
                fontSize: '1.565rem',
                fontWeight: 'bold'
              }}>
              {getPlanStatus(rowData && rowData.planStatus ? rowData.planStatus : '')}
            </span>
            </div>

            <div style={{ paddingTop: '15px', marginLeft: '2.05rem', fontSize: '1.565rem', fontWeight: 'bold' }}>{rowData && rowData.planLocate ? rowData.planLocate : ''}</div>
            <div style={{ marginLeft: '2.05rem', paddingTop: '8px', fontSize: '13px',color:'#666666' }}>计划金额:<span style={{marginLeft:10}}>{rowData && rowData.planAmt ? rowData.planAmt.toFixed(2) : ''}</span></div>
            <div style={{ marginLeft: '2.05rem', paddingTop: '6px', fontSize: '13px',color:'#666666' }}>执行时间:<span style={{marginLeft:10}}>{rowData && rowData.startTime ? timeGet(rowData.startTime) : ''}-{rowData && rowData.endTime ? timeGet(rowData.endTime) : ''}</span></div>
            <div style={{ marginLeft: '2.05rem', paddingTop: '6px', fontSize: '13px',color:'#666666' }}>创建时间:<span style={{marginLeft:10}}>{rowData && rowData.createDate ? rowData.createDate : ''}</span></div>
          </div>
          <div >
            <Ring percent={(rowData && rowData.repayedAmt && rowData.planAmt && (rowData.repayedAmt / rowData.planAmt * 100)) || 0}>
              <div style={{
                fontSize: '12px',
                color: '#FF8E8E',
                position: 'absolute',
                top: '50%',
                left: '50%',
                marginTop: '-17px',
                transform: 'translateX(-50%)',
                height: '34px',
                textAlign: 'center',
                fontWeight: '700'
              }}>
                <div style={{ marginBottom: '8px' }}>已还款</div>
                <div>{rowData && rowData.repayedAmt && rowData.repayedAmt.toFixed(2)}</div>
              </div>
            </Ring>
          </div>
        </div>
      );
    };
    const {dataSource} = this.state;
    return (
      <div className="repay-plan" style={{ paddingBottom: '65px',background:'#fff', height: '100vh'}}>
        <PageHeader title="还款计划列表"/>
        <div style={{paddingBottom: '1rem'}}>
          <BankCard {...this.props} data={currentCard}/>
        </div>

        <WhiteSpace style={{background: 'rgb(245,244,249)'}}/>
       <div className='plan-my-list'>
         <ListView
             ref={el => this.lv = el}
             dataSource={dataSource}
             renderFooter={() => (<div style={{ padding: 30, textAlign: 'center' }}>
               {this.state.isLoading ? '加载中' : '已经到底了'}
             </div>)}
             renderRow={row}
             renderSeparator={separator}
             className="plan-am-list"
             pageSize={6}
             useBodyScroll
             initialListSize={6}
             scrollRenderAheadDistance={500}
             onEndReached={this.onEndReached}
             onEndReachedThreshold={10}
             style={{ marginTop: '0.833rem' }}
         />
       </div>
      </div>
    );
  };
}

const mapStateToProps = (state) => {
  const { list, total, pageNo,validPlanFlag } = state.repayacct;
  const { creditList } = state.cust;
  return {
    loading: state.loading.models.repayacct,
    list,
    total,
    pageNo,
    creditList,
    validPlanFlag
  };
}

export default connect(mapStateToProps)(RepaymentPlay);
