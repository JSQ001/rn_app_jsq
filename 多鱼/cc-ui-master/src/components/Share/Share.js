import React, { Fragment } from 'react';
import { connect } from 'dva';
import { Carousel } from 'antd-mobile';
import gerenzhongxin from 'assets/img/index/SY_ICO3@3x.png';
import fenxiang2 from 'assets/img/index/SY_ICO2_Click@3x.png';
import shouye from 'assets/img/index/SY_ICO1@3x.png';

import haoyou from 'assets/share/微信登录@3x.png';
import pengyouquan from 'assets/share/编组 2@3x.png';
import linkPic from 'assets/share/编组 3@3x.png';
import loadPic from 'assets/share/编组 4@3x.png';
import yy1 from 'assets/share/banner1.jpg';
import yy2 from 'assets/share/banner2.jpg';
import yy3 from 'assets/share/banner3.jpg';
import yy5 from 'assets/share/WechatIMG83.jpeg';
import './Share.scss';
import { Link } from 'dva/router';
import * as storage from '../../utils/browserStorage.js';
import Footer from "../common/footer";

//背景
const sectionStyle = {
  width: "100%",
  backgroundColor: 'white',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
};


class Share extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 60,
      liked: true,
      imgType: '0',
    };
  }

  componentDidMount() {
    this.props.dispatch({
      type: 'cust/getQrPoster',
      payload: {
        userId: this.props.user.userId,
        num: 0
      }
    });
    // 阻止双击放大
    var lastTouchEnd = 0;
    document.addEventListener('touchstart', function (event) {
      if (event.touches.length > 1) {
        event.preventDefault();
      }
    });
    document.addEventListener('touchend', function (event) {
      var now = (new Date()).getTime();
      if (now - lastTouchEnd <= 300) {
        event.preventDefault();
      }
      lastTouchEnd = now;
    }, false);

    document.addEventListener('gesturestart', function (event) {
      event.preventDefault();
    });

  }

  render() {
    const obj = storage.get('usr') ? JSON.parse(storage.get('usr')) : '';
    const { imgType } = this.state;
    const data=[yy1,yy2,yy3];
    return (
      <Fragment>
        <div style={sectionStyle} className="page-share">
          <div style={{
            margin: '1rem 2rem',
            fontSize: '3rem',
          }}>
            分享
          </div>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            background:'white',
            margin: '0 auto',
            //borderRadius:'18px',
           // padding: '0.083rem'
          }}>

            <img src={yy5} style={{height: '64vh'}} alt=""/>
           {/* <Carousel
                autoplay
                slideWidth={0.80}
                dotStyle={{ marginTop: '1.167rem' }}
                initialSlide={imgType}
                cellSpacing={20}
                infinite
                dots={false}
                //afterChange={index => this.setState({ slideIndex: index })}
                beforeChange={(from, to) => { this.setState({ imgType: to }) }}>
                {data.map((val, index) => (
                    <div style={{
                      display: 'block',
                      position: 'relative',
                      top: this.state.slideIndex === index ? -10 : 0,
                      height: this.state.imgHeight,
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

                ))}
            </Carousel>*/}
          </div>
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            color:'#333333',
            fontSize:'1.5rem',
            //height: '5.333rem',
            lineHeight: '5.333rem',
            position: 'fixed',
            width: '100vw',
            bottom: '8.333rem',
          }}>
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              width: '50%',
              cursor: 'pointer'
            }} onTouchEndCapture={
              () => window.ReactNativeWebView.postMessage(`shareToSession:https://wmemall.com/cust/cust/getQrPoster/${obj.userId}/${this.state.imgType}`)
            }>
              <img src={haoyou} style={{width: '3.778rem', height:'3.778rem'}} alt='' />
              <p style={{ margin: '-1.333rem 0px', fontSize: '1.5rem'}}>微信好友</p>
            </div>
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              width: '50%',
              cursor: 'pointer'
            }} onTouchStart={
              () => window.ReactNativeWebView.postMessage(`shareToTimeline:https://wmemall.com/cust/cust/getQrPoster/${obj.userId}/${this.state.imgType}`)
            }>
              <img src={pengyouquan} style={{width: '3.778rem', height:'3.778rem'}} alt='' />
              <p style={{ margin: '-1.333rem 0px',fontSize: '1.5rem' }}>朋友圈</p>
            </div>
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              width: '50%',
              cursor: 'pointer'
            }} onTouchStart={
              () => window.ReactNativeWebView.postMessage(`shareToTimeline:https://wmemall.com/cust/cust/getQrPoster/${obj.userId}/${this.state.imgType}`)
            }>
              <img src={linkPic} style={{width: '3.778rem', height:'3.778rem'}} alt='' />
              <p style={{ margin: '-1.333rem 0px' ,fontSize: '1.5rem'}}>邀请链接</p>
            </div>

            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              width: '50%',
              cursor: 'pointer'
            }} onTouchStart={
              () => window.ReactNativeWebView.postMessage(`shareToTimeline:https://wmemall.com/cust/cust/getQrPoster/${obj.userId}/${this.state.imgType}`)
            }>
              <img src={loadPic} style={{width: '3.778rem', height:'3.778rem'}} alt='' />
              <p style={{ margin: '-1.333rem 0px',fontSize: '1.5rem'}}>下载图片</p>
            </div>
          </div>
        </div>
        <Footer current='share'/>
      </Fragment>
    );
  };
}

const mapStateToProps = (state) => {
  // const {} = state.cust;
  return {
    user: state.cust.usr,
    shareImg: state.cust.shareImg,
    loading: state.loading.models.cust,
  };
}

export default connect(mapStateToProps)(Share);
