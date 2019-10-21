import {Link} from "dva/router";
import LiBaoSvg from "assets/svg/libao";
import HomeSvg from "assets/svg/home";
import ShareSvg from "assets/svg/share";
import UserSvg from "assets/svg/user";

import React from "react";

const Footer = (props) =>{

  const {current} = props;

  const style ={};

  style[current] = '#EE614C';

  return (
      <div className='page-footer'>
        <Link to={`/firstPage`} className='one1'>
          <HomeSvg style={{color: style.index}}/>
          <p style={{ color: style.index, }}>首页</p>
        </Link>
        <Link to={`/wonderful`} className='three1'>
          <LiBaoSvg  style={{color: style.wonderful }}/>
          <p style={{ color: style.wonderful}}>精彩</p>
        </Link>
        <Link to={`/share`} className='three1'>
          <ShareSvg  style={{color: style.share }}/>
          <p style={{color: style.share }}>分享</p>
        </Link>
        <Link to={`/personalCenter`} className='three1'>
          <UserSvg style={{ color: style.personal }}/>
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



