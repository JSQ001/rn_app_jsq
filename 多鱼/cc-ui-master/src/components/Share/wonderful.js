import React, { Fragment } from 'react';
import { connect } from 'dva';
import {Carousel, ListView, Toast} from 'antd-mobile';
import './Share.scss';
import { Link } from 'dva/router';
import Footer from "../common/footer";
import {bankImg, hiddenBankCard} from "../../utils/appUtils";
import morenlogo from "assets/我的卡包-信用/DEFAULT_LOGO.png";
import { province } from 'antd-mobile-demo-data';
import vip from 'assets/wonderful/banner3-活动.jpg'
import shop from 'assets/wonderful/banner2-精彩-2.jpg'
//背景
const sectionStyle = {
  width: "100%",
  backgroundColor: 'white',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between'
};


const Share = props=> {

  const separator = (sectionID, rowID) => (
      <div
          key={`${sectionID}-${rowID}`}
          style={{
            backgroundColor: '#F5F5F9',
            // height: 8,
            borderTop: '0.083rem solid #ECECED',
            borderBottom: '0.083rem solid #ECECED',
          }}
      />
  );

  let dataSource = new ListView.DataSource({
    getRowData: (dataBlob, sectionID, rowID) => {
      return dataBlob[sectionID][rowID]
    },
    getSectionHeaderData: (dataBlob, sectionID) => dataBlob[sectionID],
    rowHasChanged: (row1, row2) => row1 !== row2,
    sectionHeaderHasChanged: (s1, s2) => s1 !== s2,

  });
  dataSource = dataSource.cloneWithRows(
      {
        vip: {src: vip, to: '/myselfInterests/personalCenter'},
        shop: {src: shop, to: '/shopping/mall'},
      },['vip','shop']);

  const row = (rowData, sectionID, rowID) => {
    const { to, src } = rowData;
    const creditArr = bankImg.find((element) => (element.label === (rowData && rowData.bankName))) || { value: morenlogo,style:'blueBackgroundColor' };
    return (

          <div key={rowID}
               onClick={()=>{
                 Toast.info('即将上线，敬请期待！', 2) //
               }}
               style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: '100vw',
                  marginBottom: '1.556rem',
                  background: 'white',
          }}>
            <div style={{
              backgroundImage: `url(${src})`,
              width: '34.111rem',
              height: '15.556rem',
              borderRadius: '1rem',
              backgroundSize: '100% 100%',
            }}
            />
           {/* <Link to={rowData.to}>

            </Link>*/}
          </div>
    );
  };

  const onEndReached= ()=>{}

  return(<Fragment>
    <div style={sectionStyle}>
      <div style={{
        margin: '1rem 2rem',
        fontSize: '3rem',
      }}>
        <p>精彩</p>
      </div>
      <ListView
          dataSource={dataSource}

          renderRow={row}
          //renderSeparator={separator}
          className="packagelist"
          pageSize={4}
          useBodyScroll
          scrollRenderAheadDistance={500}
          onEndReached={onEndReached}
          onEndReachedThreshold={10}
      />
    </div>
    <Footer current='wonderful'/>
  </Fragment>)
};

const mapStateToProps = (state) => {
  // const {} = state.cust;
  return {
    loading: state.loading.models.cust,
  };
};

export default connect(mapStateToProps)(Share);
