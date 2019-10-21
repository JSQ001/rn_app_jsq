import React from "react";
import PageHeader from "../common/layout/page-header";
import './index.css'
import bh from 'assets/shopping-mall/4.png'
import jf from 'assets/shopping-mall/3.png'
import mr from 'assets/shopping-mall/5.png'
import bb from 'assets/shopping-mall/6.png'
import MyListView from '../common/my-listview'
import cup2 from "assets/shopping-mall/商城banner/4.美心杯.jpg";
import cup1 from "assets/shopping-mall/商城banner/5.感温保温壶.jpg";
import txd1 from "assets/shopping-mall/商城banner/3.剃须刀3头.jpg";
import txd2 from "assets/shopping-mall/商城banner/1.banner-剃须刀.jpg";
import cb from "assets/shopping-mall/商城banner/2.铁壶茶具.jpg";
import kb from "assets/shopping-mall/商城banner/7.包.jpg";
import kz from "assets/shopping-mall/商城banner/6.筷子.jpg";
import gtj from "assets/shopping-mall/商城banner/8.挂烫机.jpg";
import { Carousel} from 'antd-mobile'
import { useState, useEffect, useReducer, useContext } from 'react';

const ProductDetail = props =>{
  const {} = props;
  const [msgId,setMsgId] = useState(0);

  return(
      <div className='product-detail'>
        <PageHeader title='商品详情'/>

           <div className="product-main-picture">
              <Carousel
                  autoplay
                  infinite
                  dots={false}
                  slideWidth={0.8}
                  swipeSpeed={5000}
                  autoplayInterval={5000}
                  initialSlide={msgId}
                  beforeChange={(from, to) => { setMsgId( to ) }}
                 >
                  {['123','131'].map((val, index) => (
                      <span key={index}>{val}</span>
                  ))}
              </Carousel>
           </div>
      </div>
  )
};

export default  ProductDetail
