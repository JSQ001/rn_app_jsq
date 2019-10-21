import React from 'react';
import { connect } from 'dva';
import { Carousel,Toast } from 'antd-mobile';
import dizhiqianjin from 'assets/商品详情页/地址前进.png';
import back from 'assets/忘记密码/返回.png';


class VipGoodsDetails extends React.Component {

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

  //vip领取商品
  chooseVipGoods = (values) =>{
    if(!values||!values.receiverName||!values.receiverName||!values.address){
      Toast.info("请添加收货地址", 2);
      return;
    }
    this.props.dispatch({
      type: 'webshop/chooseVipGoods',
      payload: {
        cnt: '1',
        goodsId: this.props.match.params.id,
        receiverName: values.receiverName,
        receiverTel: values.receiverTel,
        postCode: values.postCode,
        address: values.address
      }
    });
  }


  render() {
    const { location: { pathname } } = this.props.history;
    const addrArray = this.props.listAddr ? this.props.listAddr : [];
    const strAddr = this.state.id !== '' && addrArray  ? addrArray.find((element) => (element.addrId === this.state.id)) :
      addrArray.find((element) => (element.isDefalut === 'Y')) || addrArray[0];
    return (
      <div style={{ paddingTop: '100px' }}>
        <div className='headStyle' style={{ height: '100px'}}>
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
            <p style={{ fontSize: '1.167rem', display: 'inline-block' }}>选择礼物</p>
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
          <p style={{ fontSize: '1.833rem', paddingLeft: '15px', paddingTop: '15px', fontWeight: '600',color: '#222222' }}>&nbsp;{this.state.goodsName}</p>
          <div style={{ marginTop: '-18px' }}>
            <p style={{ fontSize: '15px', marginLeft: '1.167rem' }}>
              {this.state.goodsDesc}</p>
          </div>
        </div>
        <div style={{
          height: '145px',
          backgroundColor: 'white',
          color: 'black',
          marginTop: '-5px',
          alignItems: 'center'
        }} onClick={() => {
          this.props.history.push({
            pathname: `/myselfAddr`,
            state: pathname
          })
        }}>
          <div style={{ width: '92%' }}>
            <p style={{  fontSize: '1.833rem', paddingLeft: '15px', paddingTop: '15px',lineHeight:'2.5rem', fontWeight: '600',color: '#222222',borderBottom: '0.083rem solid #F6F6F6' }}>收货信息</p>
          </div>
          <div style={{ width: '100%',marginTop:'-1.333rem',verticalAlign:'middle',height:'5rem'}}>
            <div style={{ width: '5px',height:'5rem',marginLeft: '15px',float:'left',background:'#FF8B8B',lineHeight:'5rem'}}/>
            <div style={{ width: '88%',textAlign:'left',marginLeft: '3px',float:'left'}}>
              {strAddr && strAddr.receiverName ?
                <div><span style={{ fontWeight:'600',fontSize:'1.333rem',lineHeight:'2.5rem' }}>{strAddr && strAddr.receiverName ? strAddr.receiverName : ''}</span>
                    <span style={{ fontWeight:'600',fontSize:'1.333rem',lineHeight:'2.5rem' }}>{strAddr && strAddr.receiverTel ? strAddr.receiverTel : ''}</span><br/>
                    <span style={{ lineHeight:'2.5rem' }}>{strAddr && strAddr.address ? strAddr.province+strAddr.city+strAddr.district+strAddr.address : ''}</span>
                </div>
                :<div style={{height:'5rem',lineHeight:'5rem'}}>添加收货地址</div>
              }
            </div>
            <div style={{ width: '5%',float:'left',lineHeight:'5rem'}}>
              <img style={{ width: '14px', height: '25px' }} alt='' src={dizhiqianjin} />
            </div>
          </div>

        </div>
        <div style={{
              height: '40px',
              width: '90%',
              backgroundColor: '#A7D87F',
              borderRadius: '100px',
              margin: '0 auto',
              marginTop: '15px',
              lineHeight: '38px',
              color: 'white',
              textAlign:'center',
              marginBottom: '40px'
            }}
            onTouchStart={this.chooseVipGoods.bind(this, strAddr)}>
          确认礼物
        </div>
      </div>

    );
  };
}

const mapStateToProps = (state) => {
  const { data } = state.webshop;
  const { listAddr } = state.cust;
  return {
    loading: state.loading.models.webshop,
    data,
    listAddr
  };
}

export default connect(mapStateToProps)(VipGoodsDetails);
