import React from 'react';
import { connect } from 'dva';
import back from 'assets/忘记密码/返回.png';
import TodayEarningList from './TodayEarningList';
import './Balance.css';
import PageHeader from "../common/layout/page-header";
import {Picker, List} from 'antd-mobile'
import { createForm } from 'rc-form';

class TodayEarning extends React.Component {

    render() {
      const { getFieldProps } = this.props.form;
      const data=[{time: 1, money:1}]
      return (
            <div style={{background: 'white', height: '100vh'}}>
                <PageHeader whiteBack title="好友还款" style={{background:'#EE614C', color: 'white'}}/>
               {/* <div className="jsq" style={{display:'flex',paddingBottom: '0.833rem', background: '#EE614C'}}>
                  <div style={{width: '46vw'}}>
                    <Picker
                        extra={<span/>}
                        //data={[{label:1,value:1}]}
                        title="Areas"
                        {...getFieldProps('district', {
                          initialValue: ['340000', '341500', '341502'],
                        })}
                        onOk={e => console.log('ok', e)}
                        onDismiss={e => console.log('dismiss', e)}
                    >
                      <List.Item arrow="down" ><span style={{color:'white'}}>近三个月</span></List.Item>
                    </Picker>
                  </div>

                  <Picker extra={<span/>}
                          //data={[{label:1,value:1}]}
                          title="Areas"
                          {...getFieldProps('district', {
                            initialValue: ['340000', '341500', '341502'],
                          })}
                          onOk={e => console.log('ok', e)}
                          onDismiss={e => console.log('dismiss', e)}
                  >
                    <List.Item arrow="down"><span style={{color:'white'}}><span style={{color:'white'}}>全部状态</span></span></List.Item>
                  </Picker>
                  <Picker extra={<span/>}
                         // data={[{label:1,value:1}]}
                          title="Areas"
                          {...getFieldProps('district', {
                            initialValue: ['340000', '341500', '341502'],
                          })}
                          onOk={e => console.log('ok', e)}
                          onDismiss={e => console.log('dismiss', e)}
                  >
                    <List.Item arrow="down"><span style={{color:'white'}}>全部类型</span></List.Item>
                  </Picker>
              </div>
*/}
               {/* <div style={{display:'flex',}}>
                  <div style={{
                    width: '100vw',
                    height: '5vh',
                    padding:'1.167rem 0 0.833rem 15px',
                    borderBottom: '0.083rem solid rgb(238,238,238)'
                  }}>九月
                  </div>
                </div>*/}
                <div>
             {/* {
                data.map(item=>(
                    <div style={{display:'flex'}}>
                      <div style={{
                        width: '10vw',
                        textAlign: 'center',
                        lineHeight: '42px',
                      }} >{item.time}</div>
                      <div style={{marginLeft: '74vw'}}>
                        <List.Item arrow="horizontal">{item.money}</List.Item>
                      </div>
                    </div>

                ))
              }*/}
            </div>
                <div>
                    <TodayEarningList id={this.props.match.params.id} {...this.props} />
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
const TodayEarningWrapper = createForm()(TodayEarning);

export default connect(mapStateToProps)(TodayEarningWrapper);
