import request from '../utils/request';


//发送短信验证码
export function sendMessage(values) {
  return request(`/cust/cust/getSmsCode/${values.mobile}/${values.smsType}`);
}

//注册确认
export function register(values) {
  return request('/cust/cust/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(values)
  });
}
//修改登录密码（忘记密码）
export function findLoginPwd(values) {
  return request('/cust/cust/findLoginPwd', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(values)
  });
}

//修改登录密码（自加）
export function editLoginPassword(values) {
  return request('/cust/cust/updLoginPwd', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(values)
  });
}

//修改交易密码
export function updTransPwd(values) {
  return request('/cust/cust/updTransPwd', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(values)
  });
}
//获取当前会员信息
export function getUserInfo() {
  return request(`/cust/cust/getUserInfo`);
}

//获取借记卡列表信息
export function getDebitCardList(values) {
  return request(`/cust/cust/getDebitCardList/${values.pageNo}/${values.pageSize}`);
}

//获取信用卡列表信息
export function getCreditCardList(values) {
  return request(`/cust/cust/getCreditCardList/${values.pageNo}/${values.pageSize}`);
}
// 删除卡片
export function delCard(id) {
  return request(`/cust/cust/delCard/${id}`);
}

//添加储蓄卡信息
export function addDebitCard(values) {
  return request('/cust/cust/addDebitCard', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(values)
  });
}


//添加信用卡信息
export function addCreditCard(values) {
  return request('/cust/cust/addCreditCard', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(values)
  });
}

//修改信用卡
export function updCreditCard(values) {
  return request('/cust/cust/updCreditCard', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(values)
  });
}


//查询客户地址
export function getAddrList(values) {
  return request(`/cust/cust/getAddrList/${values.pageNo}/${values.pageSize}`);
}
//地址删除
export function delAddr(values) {
  return request(`/cust/cust/removeAddr/${values}`);
}
//新增客户地址
export function addAddr(values) {
  return request('/cust/cust/addAddr', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(values)
  });
}
//修改客户地址
export function editAddr(values) {
  return request('/cust/cust/updAddr', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(values)
  });
}
//设置默认地址
export function setDefaultCard(values) {
  return request(`/cust/cust/setDefaultCard`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: values
  });
}

//上传身份证照获取用户信息
export function identification(payload) {
  return request('/cust/cust/idImageVerify', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  });
}

//计算还款计划
export function calcRepayPlan(values) {
  return request('/cust/cust/calcRepayPlan', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(values)
  });
}

//确认还款计划处理
export function confirmRepayPlan(values) {
  return request('/cust/cust/confirmRepayPlan', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(values)
  });
}

//删除信用卡

//我的社群
export function downStatById(values) {
  return request(`/cust/cust/downStatById/${values.pageNo}/${values.pageSize}`);
}

//是否设置交易密码
export function getTransPwdFlag(values) {
  return request(`/cust/cust/getTransPwdFlag`);
}

//提现
export function withdraw(values) {
  return request('/cust/cust/withdraw', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(values)
  });
}
// 人脸
export function getBioUrl(values) {
  return request(`/cust/custBio/getBioUrl?name=${values.name}&idCard=${values.idCard}`);
}

//获取权益信息
export function getUserLevel() {
  return request(`/cust/cust/getUserLevel`);
}
//获取每日收益
export function getDayProfitList(values) {
  return request(`/repayacct/repayacct/getDayProfitList/${values.pageNo}/${values.pageSize}/${values.type}`);
}
// 获得当日收益
export function getSingleDayProfits(values) {
  return request(`/repayacct/repayacct/getSingleDayProfits/${values.id}/${values.pageNo}/${values.pageSize}/${values.type}`);
}
// 获得当日返佣
export function getSingleDayComm(values) {
  return request(`/repayacct/repayacct/getSingleDayComm/${values.id}/${values.pageNo}/${values.pageSize}`);
}

//查询卡券列表
export function getUserSec(values) {
  return request(`/cust/cust/getUserSec?securityType=`+values.securityType+`&pageNo=`+values.pageNo+`&pageSize=`+values.pageSize);
}

//赠送卡券
export function ticketsTransfer(values) {
  return request('/cust/cust/giveSec', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(values)
  });
}

//使用卡券
export function useTicket(values) {
  return request('/cust/cust/useSec', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(values)
  });
}

//查询消息
export function getUserMsg(values) {
  return request(`/cust/cust/getUserMsg`);
}
//身份证信息查询
export function idImageQry4FaceId(values) {
  return request(`/cust/cust/idImageQry4FaceId/${values ? values.profileId : ''}/${values ? values.verfiySeq : ''}`);
}
//认证信息通知
export function bioStatus(values) {
  return request(`/cust/custBio/bioStatus/S/${values}`);
}


//获取分享图片
export function getQrPoster({userId,num}) {
  return request(`/cust/cust/getQrPoster/${userId}/${num}`)
}
