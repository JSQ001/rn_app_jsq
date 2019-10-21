
import request from '../utils/request';
// import { PAGE_SIZE } from '../utils/pager';

//普通商品列表查询
export function fetchGoods(payload) {
  return request(`/webshop/webshop/getGoodsByPage/${payload.pageNo}/${payload.pageSize}`);
}
//vip商品列表查询
export function fetchVipGoods(values) {
  return request(`/webshop/webshop/getVipGoodsByPage/${values.pageNo}/${values.pageSize}`);
}

//检查是否已购买过VIP服务
export function fetchVIP() {
  return request(`/webshop/webshop/buyVipCheck`);
}
//查询商品详情
export function fetchGoodsDetails(values) {
  return request(`/webshop/webshop/getGoodsDetail/${values.goodsId}`);
}

//vip商品选择
export function chooseVipGoods(values) {
  return request('/webshop/webshop/chooseVipGoods', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(values)
  });
}

//根据用户号获取用户订单列表
export function getCurrUserOrderList(values) {
  return request(`/webshop/webshop/getCurrUserOrderList${values.orderStatus === '' ? '' : `/${values.orderStatus}`}/${values.pageNo}/${values.pageSize}`);
}

//普通商品登记订单请求
export function buyGoods(values) {
  return request('/webshop/webshop/buyGoods', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(values)
  });
}
//VIP购买
export function buyVipCancel(values) {
  return request('/webshop/webshop/buyVipCancel', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(values)
  });
}
//VIP购买
export function buyVip(values) {
  return request('/webshop/webshop/buyVip', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(values)
  });
}

//删除订单
export function delOrder(values) {
  return request(`/webshop/webshop/delOrder/${values}`);
}
//取消订单
export function cancelOrder(values) {
  return request(`/webshop/webshop/cancelOrder/${values}`);
}

//查询vip价格
export function fetchVipPrice(values) {
  return request(`/webshop/webshop/getVipPrice`);
}