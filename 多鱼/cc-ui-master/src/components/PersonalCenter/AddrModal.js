import React, { Component } from 'react';
import { connect, } from 'dva';
import { Modal, InputItem, WhiteSpace, Checkbox, Picker, List, Flex, Toast } from 'antd-mobile';
import arrayTreeFilter from 'array-tree-filter';
import { areaArray } from '../../utils/province';
import { isPoneAvailable } from '../../utils/appUtils';
import '../App.css';

const AgreeItem = Checkbox.AgreeItem;

const isEmpty = function isEmpty(value) {
  return value === undefined || value === null || value === '';
};

let values = { addrType: 'OTHER', address: '', district: '', city: '', postCode: '', province: '', receiverName: '', receiverTel: '', isDefalut: '' };
class AddrModal extends Component {

  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      visibles: false,
      pickerValue: [],
      isChecked: false
    };
  }

  addAddr = (values) => {
    if (isEmpty(values.receiverName)) {
      return Toast.info('收货人姓名不能为空', 2);
    }
    if (isEmpty(values.receiverTel)) {
      return Toast.info('收货人手机号不能为空', 2);
    }
    values.receiverTel = values.receiverTel.split(" ").join("")
    //手机号校验
    if (isPoneAvailable(values.receiverTel) === false) {
      return Toast.info('手机号格式错误', 2);
    }
    if (this.state.pickerValue.length === 0) {
      return Toast.info('收货地区不能为空', 2);
    }
    if (isEmpty(values.address)) {
      return Toast.info('详细地址不能为空', 2);
    }
    //将地区分开
    values.province = this.state.pickerValue[0];
    values.city = this.state.pickerValue[1];
    values.district = this.state.pickerValue[2];
    values.isDefalut = this.state.isChecked === false ? 'N' : 'Y';
    //添加地址接口
    this.props.dispatch({
      type: 'cust/addAddr',
      payload: values
    });
    this.setState({pickerValue: []});
    //关闭modal
    this.hideModalHandler();
  }

  showModalHandler = (e) => {
    this.setState({
      visible: true
    });
  };

  hideModalHandler = (e) => {
    this.setState({
      visible: false
    });
  };

  //是否默认
  changeChecked = (e) => {
    const check = e.target.checked;
    this.setState({
      isChecked: check
    });
  }

  getSel() {
    const value = this.state.pickerValue;
    if (!value) {
      return '';
    }
    const treeChildren = arrayTreeFilter(areaArray, (c, level) => c.value === value[level]);
    return treeChildren.map(v => v.label).join(',');
  }

  render() {
    return (
      <div className='addrModal'>
        <span onTouchEnd={this.showModalHandler}>
          {this.props.children}
        </span>
        <div className='querenRepayPlan' style={{ marginTop: '4.167rem' }} onTouchEnd={this.showModalHandler} >
          新增
                </div>
        <Modal
          // title={`新增地址`}
          visible={this.state.visible}
          onOk={this.addAddr}
          maskClosable={false}
          onCancel={this.hideModalHandler}
          style={{
            width: '86%',
            height: '41.167rem',
          }}
        >
          <div>
            <div style={{ paddingBottom: '25px', fontSize: '18px', marginTop: '40px', color: 'black' }}>
              新增地址
              </div>
            <div>
              <InputItem placeholder="请输入您的姓名" autoCapitalize="off" onChange={(value) => { values.receiverName = value }}  >
                <span>姓名</span>
              </InputItem>
              <InputItem placeholder="请输入您的手机号" type='phone' autoCapitalize="off" onChange={(value) => { values.receiverTel = value }}  >
                <span>手机号</span>
              </InputItem>

              <Picker
                visible={this.state.visibles}
                data={areaArray}
                value={this.state.pickerValue}
                onChange={v => this.setState({ pickerValue: v })}
                onOk={() => this.setState({ visibles: false })}
                onDismiss={() => this.setState({ visibles: false })}
              >
                <List.Item arrow="horizontal" extra={this.getSel()} onTouchEnd={() => this.setState({ visibles: true })}>
                  地区
                  </List.Item>
              </Picker>

              <InputItem placeholder="请输入您的详细地址" autoCapitalize="off" onChange={(value) => { values.address = value }}  >
                <span>详细地址</span>
              </InputItem>
              <WhiteSpace />
            </div>
            <div style={{
              paddingTop: '4px',
              position: 'absolute',
              right: '1.167rem'
            }}>
              <Flex>
                <Flex.Item>
                  <AgreeItem data-seed="logId" onChange={this.changeChecked.bind(this)}>
                    选择默认
                </AgreeItem>
                </Flex.Item>
              </Flex>
            </div>
            <div style={{
              marginTop: '75px',
              width: '100%',
              height: '5rem',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center'
            }}>
              <div style={{ width: '200px', float: 'left', height: '5rem', textAlign: 'center' }}>
                <div className='addrModalquxiao' onTouchEnd={this.hideModalHandler} >取消</div>
              </div>
              <div style={{ width: '200px', float: 'left', height: '5rem', textAlign: 'center',color:'white'  }} onTouchEnd={this.addAddr.bind(this, values)}>
                <div className='addrModalqueding' >确认</div>
              </div>
            </div>
          </div>
        </Modal>
      </div>
    );
  }
}
export default connect()(AddrModal);
