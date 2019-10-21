import React from 'react';
import { connect } from 'dva';
// import { InputItem, Toast, WhiteSpace  } from 'antd-mobile';
import back from 'assets/忘记密码/返回.png';
import shuaxin from 'assets/我的社群/刷新.png';
import MyselfCommunityList from './MyselfCommunityList';
import './Personal.scss';
import PageHeader from "../common/layout/page-header";




class MyselfCommunity extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }


  //我的社群查询
  componentWillMount() {
    this.props.dispatch({
      type: 'cust/downStatById',
      payload: {
        pageNo: 1,
        pageSize: 10,
      }
    });
  }

  //点击刷新
  fetchCommunity = () => {
    this.props.dispatch({
      type: 'cust/downStatById',
      payload: {
        pageNo: this.props.data && this.props.data.page && this.props.data.page.pageNo ? this.props.data.page.pageNo : 0,
        pageSize: 10,
      }
    });
  }



  render() {
    return (
      <div className="page-content">
        <PageHeader title="我的好友"/>
        <div style={{
            margin: '0 -1.666rem',
            background: '#F5F4F9',
            height: '4.444rem',
            paddingLeft: '1.333rem',
            fontSize: '1.556rem',
            lineHeight: '4.444rem',
            color: '#999999',
            fontFamily: 'PingFangSC',
            fontWeight: 'Regular'
        }}>
          我的好友数（{this.props.teamCnt ? this.props.teamCnt : 0}）
        </div>
        <div>
          <MyselfCommunityList {...this.props} />
        </div>

      </div>
    );
  };
}

const mapStateToProps = (state) => {
  const { teamCnt } = state.cust;

  return {
    loading: state.loading.models.cust,
    teamCnt
  };
}

export default connect(mapStateToProps)(MyselfCommunity);
