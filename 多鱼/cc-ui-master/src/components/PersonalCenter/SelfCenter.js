import React from 'react';
import { connect } from 'dva';
import {List, WhiteSpace} from 'antd-mobile';
import back from 'assets/忘记密码/返回.png';
import '../SafeCenter/Safe.css';

const Item = List.Item;

class SelfCenter extends React.Component {

  confirm1 = () => {
    this.props.history.push({ pathname: '/myselfAddr' })
  }

  render() {
    return (
      <div style={{ paddingTop: '8.333rem',background: 'white'}}>
        <div className='headStyle' style={{ height: '8.333rem'}}>
          <div style={{
            height: '100%',
            width: '6.667rem',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'absolute',
            left: '0'
          }} onClickCapture={() => { this.props.history.goBack(-1) }}>
            <img alt='' src={back} style={{ width: '26px', zIndex: '200' }} />
          </div>
          <div style={{ color: '#222222', fontWeight: '500',fontSize: '2.3rem', display: 'inline-block' }}>个人中心</div>
        </div>
        <WhiteSpace style={{background: 'rgb(245,244,249)'}}/>

        <div style={{ height: '53px', background: 'white', marginTop: '3px' }}>
          <List className="my-list">
            <Item style={{ height: '53px', }} arrow="horizontal" onTouchEnd={this.confirm1}>我的地址</Item>
          </List>
        </div>
      </div>
    );
  };
}

const mapStateToProps = (state) => {
  return {
    loading: state.loading.models.application,
  };
}

export default connect(mapStateToProps)(SelfCenter);
