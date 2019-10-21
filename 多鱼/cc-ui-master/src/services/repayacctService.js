
import request from '../utils/request';
// import { PAGE_SIZE } from '../utils/pager';

//我的钱包余额以及收益查询
export function queryBalance() {
  return request(`/repayacct/repayacct/queryBalance`);
}

//根据卡号分页获取还款计划列表
export function getRepayPlanList(values) {
  return request(`/repayacct/repayacct/getRepayPlanList/${values.cardNo && values.cardNo.cardNo}/${values.pageNo}/${values.pageSize}`);
}

//分页获取还款计划详情
export function getRepayDetails(values) {
  return request(`/repayacct/repayacct/getRepayDetail/${values.planId}/${values.pageNo}/${values.pageSize}`);
}
//账户验证
export function checkRelMobile(values) {
  return request(`/cust/cust/checkRelMobile/${values}`);
}

//收益转余额
export function profit2Bal(values) {
  return request('/repayacct/repayacct/profit2Bal', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(values)
  });
}

//会员间转账
export function transfer(values) {
  return request('/repayacct/repayacct/transfer', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(values)
  });
}
//删除计划
export function delPlanDt(values) {
  return request('/repayacct/repayacct/delPlanDt', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(values)
  });
}
//重新执行计划
export function reflishOrder(values) {
  return request('/repayacct/repayacct/redoPlan', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(values)
  });
}
//终止
export function endPlan(values) {
  return request('/repayacct/repayacct/cancelPlan', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(values)
  });
}

