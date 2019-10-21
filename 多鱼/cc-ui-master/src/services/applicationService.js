import request from '../utils/request';

  //登录
  export function login(values) {
    return request('/app/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'  
      },
      body: JSON.stringify(values)
    });
  }
  export function logout() {
    return request('/app/logout');
  }

  export function loadCurrentUser(username) {
    return request('/cust/cust/getProfileUser?username=' + username + '&orgId=C');
  }

  //发送短信验证码
  export function sendMessage(values) {
    return request(`/cust/cust/getSmsCode/${values.mobile}/${values.smsType}`);
  }

  // export function loadCurrentUserCompleted() {
  //   return request('/profile/application/user');
  // }

