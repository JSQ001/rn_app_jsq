import React from 'react';
import { connect } from 'dva';
import back from 'assets/忘记密码/rtn-white.png';
import { Link } from 'dva/router';
import './AcctCenter.scss';
import '../PersonalCenter/Personal.scss';
import PageHeader from "../common/layout/page-header";
class MyselfRevn extends React.Component {


    componentWillMount() {
        //我的钱包初始化查询
        this.props.dispatch({
            type: 'repayacct/queryBalance',
            payload: {
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

    render() {
        return (
            <div style={{ color: 'white', paddingBottom: '65px',background:'#F6F6F6'}}>
                <PageHeader whiteBack title="账户收益" style={{background: 'linear-gradient(to right,#FF8679, #FF503D)'}}/>

                <div style={{
                    background: 'linear-gradient(to right,#FF8679, #FF503D)',
                    height: '175px',width:'100vw',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'column',
                    paddingBottom:20
                }}>
                    <div style={{ fontSize: '1.333rem', height:'8vh',lineHeight:'8vh', textAlign: 'center',width: '100vw',color: 'white', }}>当前可提现分润(元)</div>
                    <div style={{ fontSize: '2.5rem',color: 'white'}}>{this.props.data && this.props.data.revenueBal ? this.props.data.revenueBal.toFixed(2) : '0.00'}</div>

                  <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        width: '80vw',
                        justifyContent: 'space-between'
                  }}>
                    <div style={{
                        /*display: 'flex',
                        flexDirection: 'column',*/
                        color: 'white',
                      lineHeight:'2.5rem',fontSize: '1.5rem',marginLeft: '3rem', fontWeight: '500' }}>
                      累计分润<br/>{this.props.data && this.props.data.revenueAmt ? this.props.data.revenueAmt.toFixed(2) : '0.00'}</div>
                    <Link to={`/intoBalance/${this.props.match.params.addr}`}><div className='zhuanruyue'>转入余额</div></Link>
                  </div>
                </div>


                <div style={{ display: 'flex', width:'100vw',height:'100px',marginLeft: 'auto',marginRight: 'auto'}}>
                    <Link to={`/totalEarnings/${this.props.match.params.addr}/${this.props.match.params.addred}`}>
                        <div className='balanceImg' >
                            <ul style={{color: '#000'}}>
                                <li style={{margin: '0.833rem auto'}}>
                                  <span style={{
                                        borderRadius:90,
                                        display: 'inline-block',
                                        width:15,
                                        height: 15,
                                        marginRight: 10,
                                        background: 'rgb(224,49,33)'}}/>
                                  好友还款</li>
                                <li>{this.props.data && this.props.data.repayAmt ? this.props.data.repayAmt.toFixed(2)|| " 0.00" : '0.00'}</li>
                            </ul>
                        </div>
                    </Link>
                    <Link to={`/totalEmploy/${this.props.match.params.addr}/${this.props.match.params.addred}`}>
                        <div  className='revanImg'>
                            <ul style={{color: '#000'}}>
                                <li style={{margin: '0.833rem auto'}}>
                                  <span style={{
                                      marginRight: 10,
                                      borderRadius:90,
                                      display: 'inline-block',
                                      width:15,
                                      height: 15,
                                      background: 'rgb(101,218,65)'}}/>
                                  好友晋升</li>
                                <li>{this.props.data && this.props.data.commAmt ? this.props.data.commAmt.toFixed(2) || '0.00' : '0.00'}</li>
                            </ul>
                        </div>
                    </Link>
                </div>
            <div style={{ paddingTop: '100px' }}>

                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: '0.833rem'
                }}>






                </div>
            </div>
        </div>
        );
    };
}

const mapStateToProps = (state) => {
    const { data } = state.repayacct;
    const { total } = state.cust
    return {
        loading: state.loading.models.repayacct,
        data,
        total
    };
}

export default connect(mapStateToProps)(MyselfRevn);
