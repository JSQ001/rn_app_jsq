import React from 'react';
import { connect } from 'dva';
import { Tabs, Badge, Modal } from 'antd-mobile';
import back from 'assets/忘记密码/返回.png';
import MyselfCardPackageList from './MyselfCardPackageList';
import MyselfCardPackageList2 from './MyselfCardPackageList2';
// import { Link } from 'dva/router';
import './AcctCenter.scss';
import BankCardDetail from "../common/bank-card/bank-card-detail";
import BankCardDebit from "../common/bank-card/bank-card-debit";
import PageHeader from "components/common/layout/page-header";


const alert = Modal.alert;
const tabs = [
    { title: <Badge>信用卡</Badge> },
    { title: <Badge>储蓄卡</Badge> },
];

class MyselfCardPackage extends React.Component {

    //初始化查询
    componentWillMount() {
        //初始化查询用户信息
        this.props.dispatch({
            type: 'cust/getUserInfo',
        });

        //信用卡初始化查询
        this.props.dispatch({
          type: 'cust/getCreditCardList',
          payload: {
            pageSize: 20,
            pageNo: 1
          }
        });
        //初始化查询借记卡信息
        this.props.dispatch({
            type: 'cust/getAllDebitCardList',
            payload: {
                pageSize: 10,
                pageNo: 1
            }
        });
    }



    confirm1 = () => {
        this.props.history.push({ pathname: '/editPasswordLogin' })
    }

    confirm2 = () => {
        this.props.history.push({ pathname: '/editTranPassword' })
    }

    confirm3 = () => {
        this.props.history.push({ pathname: '/myselfCommunity' })
    }
    render() {
      const top = 5 +this.props.creditList&&this.props.creditList.length*20;
      const debtTop = 5 +this.props.list&&this.props.list.length*20;
      return (
            <div className="my-package" style={{ background:'#fff', height: '100vh'}}>
                <PageHeader title="我的卡包"/>
                <div>
                    <Tabs tabs={tabs} initialPage={0}>
                        <div style={{width: '90vw', margin: '1.167rem auto'}}>

                          <BankCardDebit {...this.props} data={this.props.creditList} type='credit'/>


                          {/* <Link to={`/addCreditCard/${this.props.match.params.addr}/${this.props.match.params.addred}`}> */}
                            <div style={{
                              background:'#FF503D',
                              textAlign: 'center',
                              margin: `calc(${top}vh) auto 0 auto` ,
                              width:'80%',
                              zIndex: 99999,
                              borderRadius:'35px',
                              border:'0.083rem solid #EE614C',
                              boxShadow: '0 0.083rem 3px rgba(34, 25, 25, 0.2)'
                            }}
                                onClick={() => this.props.data && this.props.data.authStatus && this.props.data.authStatus === 'N' ?
                                    alert('', '您还未进行实名认证，请先实名认证！', [
                                        { text: '取消', onPress: () => console.log('cancel') },
                                        { text: '前往', onPress: () => { this.props.history.push({ pathname: '/personalAuth/first' }) } },
                                    ]) :
                                    this.props.total === 0 ?
                                        alert('', '您还未绑定过储蓄卡呦，请先绑定储蓄卡！', [
                                            { text: '取消', onPress: () => console.log('cancel') },
                                            { text: '确定', onPress: () => { this.props.history.push('/addSavingsCard/personalCenter/personalCenter') } },
                                        ]) :
                                        this.props.history.push({ pathname: `/addCreditCard/${this.props.match.params.addr}/${this.props.match.params.addred}` })}>
                                <span style={{lineHeight:'4.167rem',color: 'white',fontSize:'18px'}}>添加信用卡</span>
                            </div>
                            {/* </Link> */}
                        </div>


                        <div style={{width: '90vw', margin: '1.167rem auto'}}>
                          <BankCardDebit {...this.props} data={this.props.list}/>
                          <div style={{
                            background:'#FF503D',
                            textAlign: 'center',
                            margin: `calc(${debtTop}vh) auto 0 auto` ,
                            width:'80%',
                            zIndex: 99999,
                            borderRadius:'35px',
                            border:'0.083rem solid #EE614C',
                            boxShadow: '0 0.083rem 3px rgba(34, 25, 25, 0.2)'
                          }}
                               onClick={() => this.props.data && this.props.data.authStatus && this.props.data.authStatus === 'N' ?
                                   alert('', '您还未进行实名认证，请先实名认证！', [
                                     { text: '取消', onPress: () => console.log('cancel') },
                                     { text: '前往', onPress: () => { this.props.history.push({ pathname: '/personalAuth/first' }) } },
                                   ]) :
                                   this.props.history.push({ pathname: `/addSavingsCard/${this.props.match.params.addr}/${this.props.match.params.addred}` })}>
                            <span style={{lineHeight:'4.167rem',color:"white",fontSize:'18px'}}>添加储蓄卡</span>
                          </div>
                        </div>

                    </Tabs>
                </div>
            </div>
        );
    };
}

const mapStateToProps = (state) => {
    const { data, list, total,creditList } = state.cust;
    return {
        loading: state.loading.models.cust,
        data,
        list,
        total,
        creditList
    };
}

export default connect(mapStateToProps)(MyselfCardPackage);
