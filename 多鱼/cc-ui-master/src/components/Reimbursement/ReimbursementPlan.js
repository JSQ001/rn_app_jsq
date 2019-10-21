import React from 'react';
import { connect } from 'dva';
// import {InputItem } from 'antd-mobile';
import back from 'assets/忘记密码/返回.png';
import './Reimbursement.scss';


class ReimbursementPlan extends React.Component{
render(){
  return (
        <div>
            <div className='reimbursementhead' >
                    <img alt='' src={back} onClickCapture={() => { this.props.history.goBack(-1) }} style={{position:'relative', top:'24px', left:'1.167rem', width:'17px'}} />
                <br/>
                <p style={{color:'white', position:'relative', textAlign:'center', fontSize:'15px', top:'-13px'}}>还款计划</p>
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

export default connect(mapStateToProps)(ReimbursementPlan);
