import React from 'react';
import { connect } from 'dva';
import { Toast, Modal } from 'antd-mobile';
import levelFlag from 'assets/img/vip/HY_Zs@3x.png';
import flag1 from 'assets/img/vip/HY_ICO1@2x.png';
import flag2 from 'assets/img/vip/HY_ICO2@2x.png';
import flag3 from 'assets/img/vip/HY_ICO3@2x.png';
import flag4 from 'assets/img/vip/HY_ICO4@2x.png';
import lihe from 'assets/img/goods/cuxiaolihe.png';
import {userLevel} from '../../utils/appUtils.js';
import 'styles/style1/myself-interests.scss'
import PageHeader from "../common/layout/page-header";

class MyselfInterests extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      levelList:[
        {code: 'USER', name: '初入江湖', cost:'0元', rate:'0.85%', tips1:'10元/万元', tips2: '-' },
        {code: 'VIP', name: '江湖新秀', cost:'99元', rate:'0.68%', tips1:'17元/万元', tips2: '-' },
        {code: 'SILVER', name: '江湖少侠', cost:'129元', rate:'0.65%', tips1:'20元/万元', tips2:'3元/万元' },
        {code: 'GOLD', name: '江湖大侠', cost:'159元', rate:'0.62%', tips1:'23元/万元', tips2: '6元/万元' },
        {code: 'KING', name: '一派掌门', cost:'189元', rate:'27元/万元', tips1:'27元/万元', tips2:'10元/万元' },
        {code: 'DIAMOND', name: '武林盟主', cost:'219元', rate:'0.56%', tips1:'29元/万元', tips2: '12元/万元' },
      ],
    };
  }
  componentWillMount() {
    const { dispatch } = this.props;
    // dispatch({
    //   type: 'cust/getUserLevel',
    // });
    dispatch({
      type: 'cust/getUserInfo',
    });
    //是否已购买VIP服务
    dispatch({
      type: 'webshop/fetchVip',
    });

    //获取vip价格
    this.props.dispatch({
      type: 'webshop/fetchVipPrice',
    });
  }

  confirm = () => {
    if (this.props.vipFlag===2) {
        return Toast.info('您已成功晋升VIP，无需重复购买！！', 1);
    } else if (this.props.vipFlag === 1) {
        return this.props.history.push({ pathname: `/memberGoodsChoose/firstPage` });
    } else {
        if(this.props.data.userLevel!=='USER'){
          return Toast.info('您已成功晋升VIP，无需重复购买！！', 1);
        }else{
          //vip处理跳转
          this.props.dispatch({
              type: 'webshop/goVipPage',
          });
        }
    }
  }

  showModalHandler = (e) => {
    this.setState({
      visible: true
    });
  };

  hideModalHandler = (e) => {
    this.setState({
      visible: false
    });
  };

  render() {
    const { levelList }  = this.state;
    const user = this.props.data;
    const userLevelName =  user?userLevel(user.userLevel):'';
    const userName = user?user.userName ? user.userName : user.mobile:'';

    return (
      !user ? null :
      <div className="my-daily-promotion">
        <PageHeader style={{background: '#EDDACA'}} title="晋升VIP"/>

        <div className="bannerImgin">
              <div className="bannerCard">
                <img alt='' src={levelFlag}
                     style={{
                          width: '2rem',
                          height:'2rem',
                          zIndex: '200',
                          verticalAlign: 'middle'
                     }} />{userLevelName}
                <div style={{marginLeft:'auto',fontSize:'1.5rem',color: '#ECCFA0',paddingRight:'0.8rem'}} onTouchEnd={this.showModalHandler}>付费声明</div>

              </div>
              <div className="bannerLevelCard">
                  <div style={{margin: '1rem 0'}}>尊敬的{userName}<br/>
                    <span>
                      {
                        user&&user.userLevel === 'USER' ?
                            '开通会员您可以获得更多权益'
                            :
                            '您的VIP特权如下'
                      }
                    </span>
                  </div>
                  <span>￥</span>
                  <span style={{fontSize: '2.8rem'}}>{this.props.priceObj?this.props.priceObj.vipPrice:331}</span>

              </div>
              <div className="bannerPrice">
              </div>
        </div>
        <div className="bannerNext">
            <div className="bannerFirstTitle">会员权益</div>
            <div className="banner-content">
              <div className="banner-item"><img alt='' src={flag1} /><br/>还款优惠</div>
              <div className="banner-item"><img alt='' src={flag2} /><br/>推荐奖励</div>
              <div className="banner-item"><img alt='' src={flag3} /><br/>分润奖励</div>
              <div className="banner-item"><img alt='' src={flag4} /><br/>专属礼品</div>
            </div>
        </div>

        <div className="bannerCom" style={{marginTop: '2.5rem'}}>
            <div className="bannerFirstTitle">VIP权益1</div>
            <div className="bannerFirstDesc">还款享受更优惠的手续费</div>
            <div className="banner-1-content" style={{background: 'white'}}>
              {
                levelList.map(item=>
                  <div key={item.code}
                       className="banner-1-item"
                       style={{
                         background: user.userLevel === item.code ?
                             'linear-gradient(#433749, #1A1B27)' : 'white'
                       }}
                  >
                    <span className="banner-item-name">{item.name}</span>
                    <br/>
                    <span style={{color: user.userLevel === item.code ? 'white' : ''}}>{item.rate}</span>
                  </div>
                )
              }
            </div>
        </div>

        <div className="bannerCom" style={{marginTop: '2.5rem'}}>
          <div className="bannerFirstTitle">VIP权益2</div>
          <div className="bannerFirstDesc">推荐更多好友可以获得推荐奖励</div>
          <div className="banner-1-content" style={{background: 'white'}}>
            {
              levelList.map(item=>
                  <div key={item.code}
                       className="banner-1-item"
                       style={{
                         background: user.userLevel === item.code ?
                             'linear-gradient(#433749, #1A1B27)' : '',
                       }}
                  >
                    <span className="banner-item-name">{item.name}</span>
                    <br/>
                    <span style={{color: user.userLevel === item.code ? 'white' : ''}}>{item.cost}</span>
                  </div>)
            }
          </div>
        </div>

        <div className="bannerCom" style={{marginTop: '2.5rem'}}>
            <div className="bannerFirstTitle">VIP权益3</div>
            <div className="bannerFirstDesc">好友还款可以获得更多利润奖励</div>
            <div className="banner-3-content">
              <table>
                <tbody>
                  <tr className="table-header">
                    <th>等级</th>
                    <th colSpan="2">分润奖励</th>
                  </tr>
                  <tr>
                    <td/>
                    <td>初入江湖</td>
                    <td>江湖新秀</td>
                  </tr>
                  {
                    levelList.map(item=>(
                        <tr key={item.code}>
                          <td>{item.name}</td>
                          <td>{item.tips1}</td>
                          <td>{item.tips2}</td>
                        </tr>
                    ))
                  }
                </tbody>

              </table>
            </div>

        </div>

        <div className="bannerCom" style={{marginTop: '2.5rem'}}>
            <div className="bannerFirstTitle">VIP权益4</div>
            <div className="bannerFirstDesc">可以选择一款属于自己的专属礼品</div>
            <div className="selfGift">
                 <div className="banner-4-content">
                   <div className="banner-4-tips">完成支付后</div>
                   <div className="banner-4-tips" style={{width: '70%'}}> 可以选择一件专享礼品</div>
                 </div>
                 <div className="banner-4-icon">
                   <img className="banner-4-img" src={lihe}/>
                 </div>
            </div>
        </div>
        {/* {this.props.vipFlag!==2?
          <div className='toPay'>
            <div className='toPayBtn' onTouchEnd={this.confirm}>
                {  this.props.vipFlag===1?<span>点击选择礼品!</span>
                              :this.props.vipFlag===0&&this.props.data.userLevel==='USER'?<span>去支付（331元）</span>
                              :<span>已获得更高权益</span>}

            </div>
          </div>
        :''} */}
        {this.props.vipFlag===1?
          <div className='toPay'>
            <div className='toPayBtn' onTouchEnd={this.confirm}>
             <span>点击选择礼品!</span>
            </div>
          </div>
          :this.props.vipFlag===0&&this.props.data.userLevel==='USER'?
            <div className='toPay'>
              <div className='toPayBtn' onTouchEnd={this.confirm}>
                <span>去支付（{this.props.priceObj?this.props.priceObj.vipPrice:331}元）</span>
              </div>
            </div>
          :this.props.vipFlag===3?
            <div className='toPay'>
              <div className='toPayBtn' onTouchEnd={this.confirm}>
                <span>查看支付进度</span>
              </div>
            </div>
            :''
        }

        <Modal
          visible={this.state.visible}
          onOk={this.hideModalHandler}
          maskClosable={false}
          onCancel={this.hideModalHandler}
          style={{
            width: '86%',
            height: '200px',
          }}
        >
          <div>
              <div style={{ fontSize:'1.167rem',lineHeight:'40px',textAlign: 'center',fontWeight:'700' }}>付费声明</div>
              <div style={{ margin:'1.167rem auto',width:'60%',fontSize:'14px',lineHeight:'2.5rem',textAlign: 'left'}}>因商品性质特殊，支付成功后，不提供退款服务</div>
              <div style={{ border:'0.083rem solid #FF503D',margin:'15px auto',width:'40%',fontSize:'14px',lineHeight:'2.5rem',textAlign: 'center',color:'#FF503D',fontWeight:'700',borderRadius:'15px' }} onTouchEnd={this.hideModalHandler}>我知道了</div>
            </div>
        </Modal>
      </div>
    );
  };
}

const mapStateToProps = (state) => {
  const { data } = state.cust;
  const { vipFlag,priceObj } = state.webshop;
  return {
    loading: state.loading.models.cust,
    data,
    vipFlag,
    priceObj
  };
}

export default connect(mapStateToProps)(MyselfInterests);
