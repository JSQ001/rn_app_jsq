import React from 'react';
import { connect } from 'dva';
import { InputItem } from 'antd-mobile';
import back from 'assets/忘记密码/返回.png';
import zhaopian from 'assets/客服/照片.png';
import xiangji from 'assets/客服/相机.png';
import biaoqing from 'assets/客服/表情.png';
import yuyin from 'assets/客服/语音.png';
import { Link } from 'dva/router';




const CustService = (props) => {
  return (
    <div>
      <div className='custServiceHead'>
        <Link to={`/login`}>
          <img alt='' src={back} style={{ position: 'relative', top: '52px', left: '1.167rem', width: '17px' }} />
        </Link>
        <br />
        <p style={{ color: 'white', position: 'relative', textAlign: 'center', fontSize: '15px', top: '7px' }}>客服</p>
      </div>
      <div style={{ height: '44.167rem', textAlign: 'center', }}>
        <div style={{ width: '80%', height: '100px', marginLeft: '38px', borderBottom: '0.083rem solid rgba(174, 174, 174, 0.3)', borderTop: '0.083rem solid rgba(174, 174, 174, 0.3)', marginTop: '25px' }}>
          <p style={{ color: 'rgba(174, 174, 174, 0.94)' }}>抱歉，现在没有客服人员在线</p>
          <p style={{ color: 'rgba(174, 174, 174, 0.94)' }}>你可以留下你的联系方式，我们会尽快联系你~</p>
        </div>
      </div>
      <div style={{ height: '100px', backgroundColor: 'white' }}>
        <InputItem placeholder="输入消息..."  ></InputItem>
        <div style={{ marginTop: '15px' }}>
          <span style={{ width: '25%', textAlign: 'center' }}><img style={{ width: '7%', marginLeft: '15px' }} alt='' src={biaoqing} /></span>
          <span style={{ width: '25%', textAlign: 'center' }}><img style={{ width: '7%', marginLeft: '35px' }} alt='' src={zhaopian} /></span>
          <span style={{ width: '25%', textAlign: 'center' }}><img style={{ width: '7%', marginLeft: '35px' }} alt='' src={xiangji} /></span>
          <span style={{ width: '25%', textAlign: 'center' }}><img style={{ width: '5%', marginLeft: '35px' }} alt='' src={yuyin} /></span>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    loading: state.loading.models.application,
  };
}

export default connect(mapStateToProps)(CustService);
