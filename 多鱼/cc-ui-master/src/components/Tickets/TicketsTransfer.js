import React from 'react';
import { connect } from 'dva';
import { InputItem, WhiteSpace, Toast, ActivityIndicator } from 'antd-mobile';
import back from 'assets/忘记密码/返回.png';
import '../Balance/Balance.css';

const isEmpty = function isEmpty(value) {
  return value === undefined || value === null || value === '';
};

class TicketsTransfer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      liked: true,
      checkTitle: '账户验证',
      otherAccount: '',
      userSecId:null
    };
  }

  componentWillMount() {
    this.setState({
      userSecId:this.props.match.params.id
    })
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.data !== this.props.data) {
      if (nextProps.data && nextProps.data.respCode === "000000") {
        this.setState({
          checkTitle: '校验成功'
        });
      } else {
        this.setState({
          checkTitle: '校验失败'
        });
      }
    }
  }

  //校验账户
  checkAcct = () => {
    if (isEmpty(this.state.otherAccount)) {
      return Toast.info("对方账户不能为空", 2);
    }
    this.props.dispatch({
      type: 'repayacct/checkRelMobile',
      payload: this.state.otherAccount.split(" ").join("")
    });
  }

  //转账校验
  transfer = () => {
    if (this.state.checkTitle === '账户验证') {
      return Toast.info("请先进行账户验证", 2);
    }
    if(this.state.checkTitle !== '校验成功'){
      return Toast.info("校验账户失败，请重新输入", 2);
    }
    if(!this.state.userSecId||this.state.userSecId===null){
      Toast.info("无正确的卡券，请在卡券列表选择正确卡券赠送", 2);
      this.props.history.goBack(-1);
    }

    this.props.dispatch({
      type: 'cust/ticketsTransfer',
      payload: {
        userSecId: Number(this.state.userSecId),
        mobile: this.state.otherAccount.split(" ").join(""),
      }
    });
  }


  render() {
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
          <p style={{ fontSize: '1.167rem', display: 'inline-block' }}>卡券赠送</p>
        </div>

        <div style={{ height: '52px', backgroundColor: 'white', marginTop: '0.833rem' }}>
          <div style={{ paddingTop: '0.833rem' }} className='intoBalance'>
            <InputItem placeholder="对方账户" autoCapitalize="off" type='phone' onChange={(value) => { this.setState({checkTitle: '账户验证',otherAccount:value}) }}>
            </InputItem>
            <WhiteSpace />
          </div>
        </div>
        <p style={{
          width: '66px',
          position: 'absolute',
          right: '0px',
          top: '118px',
          color: '#FF8B8B'
        }}
          onTouchEnd={() => this.checkAcct()}>{this.state.checkTitle}</p>
        <div className='querenWithdrawal' onTouchEnd={this.transfer.bind()}>确认赠送</div>



        <ActivityIndicator
          toast
          text='加载中...'
          animating={this.props.loading ? true : false}
        />
      </div>
    );
  };
}

const mapStateToProps = (state) => {
  const { custData } = state.cust;
  const { data } = state.repayacct;
  return {
    loading: state.loading.models.cust,
    data,
    custData
  };
}

export default connect(mapStateToProps)(TicketsTransfer);
