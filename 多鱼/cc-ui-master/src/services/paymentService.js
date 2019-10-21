import request from '../utils/request';

//VIP服务购买第三方服务（支付宝）
export function payVip(values) {
  return request(`/payment/payment/payVip/${values.channelId}/${values.amount}/${values.orderId}`);
}

//普通商品购买第三方支付（支付宝）
export function payBuyGoods(values) {
  return request(`/payment/payment/payGoods/${values.channelId}/${values.amount}/${values.orderId}`);
}

//通道绑信用卡获取短信验证码
export function bindCard4Code(values) {
  return request('/payment/payment/bindCard4Code', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(values)
  });
}

//通道绑信用卡确认
export function bindCard4Comfirm(values) {
  return request('/payment/payment/bindCard4Confirm', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(values)
  });
}

//普通商品购买支付后异步更新订单支付状态
export function buyAsyncUpd(values) {
  return request('/payment/payment/buyAsyncUpd', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(values)
  });
}

//还款计划执行（消费，退款）支付后异步更新订单支付状态
export function repayAsyncUpd(values) {
  return request('/payment/payment/repayAsyncUpd', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(values)
  });
}

//提现支付后同步更新状态
export function withdrawAsyncUpd(values) {
  return request('/payment/payment/withdrawAsyncUpd', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(values)
  });
}

//提现支付后同步更新状态
export function withdrawSyncUpd(values) {
  return request('/payment/payment/withdrawSyncUpd', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(values)
  });
}

//获取账单列表
export function getBillCheckList(values) {
  return request(`/payment/payment/getBillCheckList?pageNo=${values.pageNo}&pageSize=${values.pageSize}&transType=${values.transType}&status=${values.status}`);
}