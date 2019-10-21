import React, { Component } from 'react';
import { Result, Icon } from 'antd-mobile';
import { connect } from 'dva';
import beijin from 'assets/img/login/Dl.png';
import * as storage from '../../utils/browserStorage';
import './index.scss';
import '../LoginPage/Login.scss';
import PageHeader from "components/common/layout/page-header";
//背景
const sectionStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center'
};

class AuthSuccess extends Component {

  componentDidMount(){
    this.props.dispatch({
      type: 'cust/noticeResult',
      payload: storage.get('authKey')
    })
  }

  render() {
    return (
      <div style={sectionStyle}>
        <PageHeader title='实名认证'/>

        <div className='forgetPassbeijin personalAuth' style={{ height: '370px', justifyContent: 'center' }}>
          <Result
            img={<Icon type="check-circle" className="spe" style={{ fill: '#1F90E6' }} />}
            title="验证成功"
            message="已完成实名认证"
          />
          <div className='forgetPasstijiao' style={{ marginTop: '2.5rem' }} onTouchEnd={() => this.props.history.push('/firstPage')}>
            返回首页
          </div>
        </div>
      </div >
    );
  }
}

const mapStateToProps = (state) => {

}

export default connect(mapStateToProps)(AuthSuccess);
