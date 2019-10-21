import React from 'react';
import { connect } from 'dva';
import back from 'assets/忘记密码/返回.png';
import TodayEarningCommList from './TodayEarningCommList';
import './Balance.css';
import PageHeader from "../common/layout/page-header";


class TodayEmploy extends React.Component {


    render() {

        return (
            <div style={{  }}>
                <PageHeader whiteBack title="好友晋升" style={{color: 'white',background: '#EE614C'}}/>
                <div>
                    <TodayEarningCommList id={this.props.match.params.id} />
                </div>
            </div>
        );
    };
}

const mapStateToProps = (state) => {
    return {
        loading: state.loading.models.application,
    };
}

export default connect(mapStateToProps)(TodayEmploy);
