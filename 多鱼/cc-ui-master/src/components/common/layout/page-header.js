import back from "assets/忘记密码/返回.png";
import white from "assets/忘记密码/rtn-white.png";
import React from "react";
import { connect } from 'dva';
import {history} from "../../../index";



const PageHeader = (props)=>{
  const {title, style, whiteBack} = props;
  return (
      <div className='header-area' style={style}>
          <div className='header-area-back' onClickCapture={() => { history.goBack(-1) }}>
            <img alt='' src={whiteBack ? white :back} style={{ width: '2.167rem', zIndex: '200' }} />
          </div>
          <div style={{ fontSize: '2.3rem', color: whiteBack ? 'white': '' }}>{title}</div>
      </div>
  )
};
export default connect()(PageHeader)
