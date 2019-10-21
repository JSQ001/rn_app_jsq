import React from 'react';
import { connect } from 'dva';
import { Carousel } from 'antd-mobile';
import fanhui from 'assets/商品详情页/返回.png';
import dizhiqianjin from 'assets/商品详情页/地址前进.png';
import back from 'assets/忘记密码/返回.png';
// import diannao from 'assets/商品详情页/笔记本.jpg';
import PayTypeModal from './PayTypeModal';




class GoodsDetails extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      dis: '',
      paydis: 'none',
      goodsPrice: '',
      goodsName: '',
      goodsDesc: '',
      data: [],
      id: '',
    };
  }


  componentWillMount() {
    //查询商品详情信息
    this.props.dispatch({
      type: 'webshop/fetchGoodsDetails',
      payload: {
        goodsId: this.props.match.params.id
      }
    });
    //查询所有的地址信息
    this.props.dispatch({
      type: 'cust/getAddrList',
      payload: {
        pageNo: 1,
        pageSize: 10
      }
    });
    //初始化查询该客户是否设置过交易密码
    this.props.dispatch({
      type: 'cust/getTransPwdFlag',
    });
    //初始化查询余额是否足够
    this.props.dispatch({
      type: 'repayacct/queryBalance',
    });
  }

  componentDidMount() {
    this.setState({
      id: this.props.location.state === undefined || this.props.location.state === null ? '' : this.props.location.state
    });
  }



  componentWillReceiveProps() {
    this.setState({
      goodsPrice: this.props.data ? this.props.data.goodsPrice : '',
      goodsName: this.props.data ? this.props.data.goodsName : '',
      goodsDesc: this.props.data ? this.props.data.goodsDesc : '',
      data: this.props.data && this.props.data.introUrls ? this.props.data.introUrls : []
    })
  }

  //改变display
  changeDis = () => {
    this.setState({
      dis: 'none',
      paydis: ''
    });
  }

  render() {
    const { location: { pathname } } = this.props.history;
    const addrArray = this.props.listAddr ? this.props.listAddr : [];
    const strAddr = this.state.id !== '' && addrArray ? addrArray.find((element) => (element.addrId === this.state.id)) :
      addrArray.find((element) => (element.isDefalut === 'Y')) || addrArray[0];
    return (
      <div>
        <div style={{
          position: 'fixed',
          display: 'flex',
          width: '100px',
          height: '100px',
          justifyContent: 'center',
          zIndex: '1000',
          alignItems: 'center'
        }} onClickCapture={() => { this.props.history.goBack(-1) }}>
          <img alt='' src={fanhui} style={{ width: '45px', position: 'absolute' }} />
          <img alt='' src={back} style={{ position: 'absolute', width: '13px' }} />
        </div>
        <Carousel
          autoplay={true}
          infinite
        >
          {this.state.data.map((val, index) => (
            <img
              key={-index}
              src={val}
              alt=""
              style={{ width: '100%', verticalAlign: 'top' }}
              onLoad={() => {
                // fire window resize event to change height
                window.dispatchEvent(new Event('resize'));
                this.setState({ imgHeight: 'auto' });
              }}
            />
          ))}
        </Carousel>
        <div style={{ height: 'fit-content', backgroundColor: 'white', marginTop: '-28px' }}>
          <p style={{ fontSize: '2.5rem', paddingLeft: '15px', paddingTop: '15px', color: '#ebc073' }}>￥&nbsp;{this.state.goodsPrice}</p>
          <div style={{ marginTop: '-18px' }}>
            <p style={{ fontSize: '15px', marginLeft: '24px' }}>
              {this.state.goodsName}</p>
            <p style={{ fontSize: '15px', marginTop: '-8px', marginLeft: '24px' }}>
              {this.state.goodsDesc}</p>
          </div>
        </div>
        <br />
        <div style={{
          height: 'fit-content',
          backgroundColor: 'white',
          color: 'black',
          marginTop: '-5px',
          display: 'flex',
          alignItems: 'center'
        }} onClick={() => {
          this.props.history.push({
            pathname: `/myselfAddr`,
            state: pathname
          })
        }}>
          <div style={{ width: '92%' }}>
            <span style={{ position: 'relative', top: '1.833rem', left: '1.167rem', color: '#b9b9b9' }}>联系</span>
            <span style={{ position: 'relative', top: '1.833rem', left: '43px' }}>姓名：{strAddr && strAddr.receiverName ? strAddr.receiverName : ''}</span>
            <span style={{ position: 'relative', top: '1.833rem', left: '84px' }}>手机：{strAddr && strAddr.receiverTel ? strAddr.receiverTel : ''}</span>
            <p style={{ marginTop: '42px', marginLeft: '70px' }}>地址：{strAddr && strAddr.address ? strAddr.province+strAddr.city+strAddr.district+strAddr.address : ''}</p>
          </div>
          <img style={{ width: '14px', height: '25px' }} alt='' src={dizhiqianjin} />
        </div>
        <PayTypeModal price={this.state.goodsPrice} goodId={this.props.match.params.id} addrData={strAddr || []}
          isSetPwd={this.props.isSetPwdData ? this.props.isSetPwdData : ''} {...this.props}
          walletBal={this.props.balan && this.props.balan.walletBal ? this.props.balan.walletBal : 0.00} />
      </div>

    );
  };
}

const mapStateToProps = (state) => {
  const { data } = state.webshop;
  const { listAddr, isSetPwdData } = state.cust;
  const { data: balan } = state.repayacct;
  return {
    loading: state.loading.models.webshop,
    data,
    listAddr, isSetPwdData,
    balan
  };
}

export default connect(mapStateToProps)(GoodsDetails);
