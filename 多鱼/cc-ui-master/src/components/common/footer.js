import {Link} from "dva/router";
import shouye from "assets/img/index/SY_ICO1_Click@3x.png";
import LiBaoSvg from "assets/svg/libao";
import HomeSvg from "assets/svg/home";
import ShareSvg from "assets/svg/share";
import UserSvg from "assets/svg/user";

import React from "react";
import PropTypes from 'prop-types';

import { useState, useEffect, useReducer, useContext } from 'react';

const Footer = (props) =>{
  const [count, setCount] = useState(1);

  const {current} = props;

  const style ={};

  style[current] = '#EE614C';

  return (
      <div className='page-footer'>
        <Link to={`/firstPage`} className='one1'>
          <HomeSvg style={{ fontSize: '.26rem',color: style.index}}/>
          <p style={{ color: style.index, }}>首页</p>
        </Link>
        <Link to={`/wonderful`} className='three1'>
          <LiBaoSvg  style={{ fontSize: '.26rem',color: style.wonderful }}/>
          <p style={{ color: style.wonderful}}>精彩</p>
        </Link>
        <Link to={`/share`} className='three1'>
          <ShareSvg style={{ fontSize: '.26rem',color: style.share }}/>
          <p style={{color: style.share }}>分享</p>
        </Link>
        <Link to={`/personalCenter`} className='three1'>
          <UserSvg style={{ fontSize: '.26rem',color: style.personal }}/>
          <p style={{ color: style.personal }}>会员中心</p>
        </Link>
      </div>
  );
};
Footer.propTypes={

};

Footer.defaultProps={

};

export default Footer;



