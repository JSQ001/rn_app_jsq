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

const Shopping = props =>{
  const data= [
    {src: cup1, carouse: []},
    {src: txd1, },
    {src: cup2, },
    {src: cb,},
    {src: kb,},
    {src: kz,},
    {src: txd2, },
    {src: gtj,},
  ];
  data.forEach(item=>item.to ='/product/detail');
  return(
      <div className='shopping-mall'>
        <PageHeader title='多鱼商城'/>
        <div className='banner-main'/>
        <div className='banner-nav'>
          <div className='nav-item'><img src={bh}/>百货</div>
          <div className='nav-item'><img src={mr}/>美容护肤</div>
          <div className='nav-item'><img src={jf}/>家纺</div>
          <div className='nav-item'><img src={bb}/>包包</div>
        </div>

        <MyListView data={data}/>
      </div>
  )
};

export default  Shopping
