import React from 'react';
import { connect } from 'dva';
import back from 'assets/忘记密码/返回.png';
import TotalEmployList from './TotalEmployList';
import './Balance.css';




class TotalEmploy extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }


  render() {
    return (
      <div style={{ paddingTop: '100px' }}>
        <div className='headStyle' style={{ height: '100px'}}>
          <div style={{
            height: '100%',
            width: '6.667rem',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'absolute',
            left: '0px'
          }} onClickCapture={() => { this.props.history.goBack(-1) }}>
            <img alt='' src={back} style={{ width: '26px', zIndex: '200' }} />
          </div>
          <p style={{ fontSize: '1.167rem', display: 'inline-block' }}>每日晋升</p>
        </div>
        <div>
          <TotalEmployList addr={this.props.match.params.addr} addred={this.props.match.params.addred} />
        </div>
      </div>
    );
  };
}

const mapStateToProps = (state) => {
  const { data } = state.cust;
  return {
    loading: state.loading.models.cust,
    data
  };
}

export default connect(mapStateToProps)(TotalEmploy);
