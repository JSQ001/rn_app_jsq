import request from '../utils/request';

export default {

  /*let option = {
    ...options,
    url: baseUrl + url,
    method: 'GET',
    headers: {
      Authorization: 'Bearer ' + window.sessionStorage.getItem('token'),
    },
    params,
    paramsSerializer: function(params) {
      return qs.stringify(params, { arrayFormat: 'repeat' });
    },
    cancelToken: source.token,
  };*/
  getUser() {
    return request('/api/users',{method: 'GET'});
  },

  getInfo(){
    return request('https://api.betterdoctor.com/2016-03-01/practices/1c966a62ce8e18707cf239389dc8e378/doctors/?limit=20&user_key=2',{method: 'GET'})
  }
}
