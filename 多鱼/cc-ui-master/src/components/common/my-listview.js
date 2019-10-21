import React, { Fragment } from 'react';
import { connect } from 'dva';
import {Carousel, ListView} from 'antd-mobile';
import { Link } from 'dva/router';
import Footer from "../common/footer";
import {bankImg, hiddenBankCard} from "../../utils/appUtils";
import morenlogo from "assets/我的卡包-信用/DEFAULT_LOGO.png";
import { province } from 'antd-mobile-demo-data';
import vip from 'assets/wonderful/banner3-活动.jpg'
import shop from 'assets/wonderful/banner2-精彩-2.jpg'

const MyListView = props=> {

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
  dataSource = dataSource.cloneWithRows(props.data);
  const row = (rowData, sectionID, rowID) => {
    const { to, src } = rowData;
    const creditArr = bankImg.find((element) => (element.label === (rowData && rowData.bankName))) || { value: morenlogo,style:'blueBackgroundColor' };
    return (
        <div key={rowID} style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100vw',
          marginBottom: '0.833rem'
        }}>
          <Link to={to}>
            <div style={{
              backgroundImage: `url(${src})`,
              width: '90vw',
              height: '30vh',
              borderRadius: 12,
              backgroundSize: '100% 100%',
            }}
            />
          </Link>
        </div>
    );
  };

  const onEndReached =(param)=> {
    console.log(param)
  }

  return(<Fragment>
    <div className="my-list-view">
      <ListView
          dataSource={dataSource}
          renderRow={row}
          //renderSeparator={separator}
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

export default connect(mapStateToProps)(MyListView);
