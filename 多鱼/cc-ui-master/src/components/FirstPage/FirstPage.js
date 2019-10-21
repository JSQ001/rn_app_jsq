import React, { Fragment } from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';
import 'styles/style1/first-page.scss';
import { Toast } from 'antd-mobile';
import { userLevel } from 'utils/appUtils.js';
import AddSvg from 'assets/svg/add'
import CustomServiceSvg from "assets/svg/custom-service";
import Logo from 'assets/img/index/logo.png'
import Footer from "../common/footer";
import SH from 'assets/首页/duoyushenka.png'
import XJ from 'assets/首页/duoyuxinjian.png'
import RZ from 'assets/首页/shiming.png'
import KB from 'assets/首页/duoyukabao.png'
import img from 'assets/img/mine/WDHY_Tx@3x.png';
import banner1 from 'assets/首页/banner1-首页.jpg'
import banner2 from 'assets/首页/首页轮播banner2.jpg'
import banner3 from 'assets/首页/首页轮播banner3.jpg'

const cs = (data) => {
    window._MEIQIA('metadata', {
        name: data?data.userName:'',
        会员等级: data?userLevel(data.userLevel):'',
        tel: data?data.mobile:'',
    })
    window._MEIQIA('showPanel');
}

@connect(state=>{
  return{
    loading: state.loading.models.webshop,
    list: state.webshop.list,
    vipFlag: state.webshop.vipFlag,
    webshop: state.webshop,
    data: state.cust.data||{},
    msgList: state.cust.msgList
  }
})

class FirstPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          msgId: '0',
          carouselList: [banner1,banner2,banner3],
          imgType: '0',
          imgHeight: 'auto',
          navList:[
            {
              img: SH, name: '多鱼申卡', tips:'免费办理，快速高额', url: '/credit/card'
            },
            {
              img: SH, name: '多鱼申卡', tips:'免费办理，快速高额', url: '/credit/card'
            },
            {
              img: SH, name: '多鱼申卡', tips:'免费办理，快速高额', url: '/credit/card'
            },
            {
              img: SH, name: '多鱼申卡', tips:'免费办理，快速高额', url: '/credit/card'
            }
          ],
          userLevel: {

          }
        };
      }
    componentDidMount() {
        this.props.dispatch({
            type: 'cust/getUserInfo',
          });
        //获取热销产品列表
        this.props.dispatch({
            type: 'webshop/fetchGoods',
            payload: {
                pageNo: 0,
                pageSize: 2
            }
        });
        //是否已购买VIP服务
        this.props.dispatch({
            type: 'webshop/fetchVip',
        });
        //获取消息列表
        this.props.dispatch({
            type: 'cust/getUserMsg',
          });
    }

    confirm = () => {
        if (this.props.vipFlag===1) {
            return this.props.history.push({ pathname: `/memberGoodsChoose/firstPage` });
        }else{
            return this.props.history.push({ pathname: `/myselfInterests/personalCenter` });
        }
        // else if(this.props.vipFlag === 0 &&this.props.data.userLevel!=='USER'){
        //     return this.props.history.push({ pathname: `/myselfInterests/personalCenter` });
        // }else {
        //     //vip处理跳转
        //     this.props.dispatch({
        //         type: 'webshop/goVipPage',
        //     });
        // }
    }
    changeAfter = () =>{
        if(this.state.msgId===3){
            this.setState({ msgId: 0 })
        }
    }
    confirmRepay = () => {
        return this.props.history.push({ pathname: `/myselfCardPackage/personalCenter/personalCenter` });
    };


    renderLevel = ()=>{
      const { data,vipFlag} = this.props;
      const userLevelName = userLevel(data.userLevel);
      switch (String(vipFlag)) {
        case '0': {
         return data.userLevel === 'USER' ?  // 最初级用户
             <div className="bannerLevel"> 晋级VIP，获取更多特权!</div>
             :
             <div>
               <div className="bannerLevel">您好{userLevelName}</div>
               <div className="bannerLevel">查看我的特权!</div>
             </div>
        }
        case '1':
          return (
              <div>
                <div className="bannerLevel">您好{userLevelName}</div>
                <div className="bannerLevel">点击获取礼物!</div>
              </div>
          );
        case '2':{
          return (
              <div>
                <div className="bannerLevel" >您好{userLevelName}</div>
                <div className="bannerLevel">获取更多特权!</div>
              </div>
          )
        }
        case '3':{
          return <div className="bannerLevel">继续支付</div>
        }
        default: return <div className="bannerLevel">晋级VIP，获取更多特权!</div>
      }

    };

    render() {
        const { data } = this.props;
        const { msgId, carouselList, slideIndex, imgHeight,imgType } = this.state;
        const msgList = this.props.msgList&&this.props.msgList.length?this.props.msgList:['欢迎来到多鱼APP！','多鱼欢迎你！'];
        return (
            <Fragment>
              {
                data.mobile ?
                    <div className="first-page">
                      <div className="header-area">
                        <img className="logo" src={Logo}/>

                        <div className="head-right" onTouchEnd={()=>cs(data)}>
                          <AddSvg/>
                          <div onTouchEnd={()=>cs(data)}>
                            <CustomServiceSvg style={{marginLeft:'0.15rem'}}/>
                          </div>
                        </div>
                      </div>
                      <div className='page-content'>
                        <div onTouchEnd={this.confirm} className="bannerImg">
                          <div className="bannerTitle">
                            {/*todo//懒加载替换*/}
                            <img src={img} className="user-icon"/>
                            <div className="user-name">{data.userName|| data.mobile }</div>
                            <div className="user-status">{data.authStatus === 'Y' ? "已认证" :'还未认证哦～'}</div>
                          </div>
                          {
                            this.renderLevel()
                          }
                          <div className="bannerShare">天天乐分享，分享快乐生活</div>
                        </div>
                        <div className="repayCredit"  onTouchEnd={this.confirmRepay}>我要还款</div>

                        <div className="thread" />

                        <div className="content-footer">
                          <div className="content-footer-title">更多服务</div>
                          <div className="nav-items">
                            <div>
                              <div className="footer-item" onTouchEnd={()=>{
                                this.props.history.push({ pathname: '/credit/card' })
                              }}>
                                <img className='item-img' src={SH} alt=''/>
                                <div className="footer-item-text">
                                  <div className="text-nav-title">多鱼申卡</div>
                                  <div className="text-nav-tips">免费办理，快速高额</div>
                                </div>
                              </div>
                              <div className="footer-item"  onTouchEnd={()=>{
                                Toast.info('即将上线，敬请期待！', 2);
                              }}>
                                <img className='item-img' src={XJ} alt=''/>
                                <div className="footer-item-text">
                                  <div className="text-nav-title">多鱼信检</div>
                                  <div className="text-nav-tips">快速检测，安全准确</div>
                                </div>
                              </div>
                            </div>


                            <Link to={ data.authStatus === 'N' ? "/personalAuth/first" : "authSuccess"}>
                              <div className="footer-item">
                                <img className='item-img' src={RZ} alt=''/>
                                <div className="footer-item-text">
                                  <div className="text-nav-title">实名认证</div>
                                  <div className="text-nav-tips">实名认证，解锁更多功能</div>
                                </div>
                              </div>
                            </Link>
                            <div className="footer-item" onTouchEnd={()=>{
                              this.props.history.push({ pathname: '/myselfCardPackage/personalCenter/personalCenter' })
                            }}>
                              <img className='item-img' src={KB} alt=''/>
                              <div className="footer-item-text">
                                <div className="text-nav-title">多鱼卡包</div>
                                <div className="text-nav-tips">丰富优惠，乐享生活</div>
                              </div>
                            </div>
                          </div>
                        </div>
                        {/*<div style={{
                        height:'30vh'
                      }}>
                        <Carousel
                            autoplay
                            infinite
                            dots={false}
                            beforeChange={(from, to) => { this.setState({ imgType: to }) }}>
                          {carouselList.map((val, index) => (
                              <Link to={'/shopping/mall'} key={'/shopping/mall'}>
                                <div style={{
                                  display: 'block',
                                  position: 'relative',
                                  top: slideIndex === index ? -10 : 0,
                                  height: imgHeight,
                                  boxShadow: '2px 1px 1px rgba(0, 0, 0, 0.2)',
                                }}>
                                  <img
                                      id='sfzImg'
                                      key={-index}
                                      src={val}
                                      className='sfzImg'
                                      alt=""
                                      style={{ width: '100%', verticalAlign: 'top', cursor: 'pointer', }}
                                      onLoad={() => {
                                        // fire window resize event to change height

                                        window.dispatchEvent(new Event('resize'));
                                        this.setState({ imgHeight: 'auto' });
                                      }}
                                  />
                                </div>
                              </Link>
                          ))}
                        </Carousel>
                      </div>*/}
                      </div>

                      <Footer current='index'/>
                    </div>
                    : null
              }
            </Fragment>
        );
    };
}


export default FirstPage;
