import React from "react";
import back from "assets/img/index/back.png";
import {history} from "@/index";

const CreditCard = props =>{

  return(
      <div className='credit-card'>
        <img alt=''
             onClickCapture={() => { history.goBack(-1) }}
             src={back}
             style={{
                width: '3.6rem',
                position: 'absolute',
             }}
        />
          <iframe
              framespacing="0"
              space="0"
              frameBorder="0"
              width="100%"
              height="1000"
              marginHeight="0"
              src={"https://web.yunjuhe.vip/credit/list/v1.0/500588"}/>
      </div>
      )
};

export default  CreditCard
