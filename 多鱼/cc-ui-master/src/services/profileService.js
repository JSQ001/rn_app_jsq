
import request from '../utils/request';
// import { PAGE_SIZE } from '../utils/pager';

//根据用户名验证查询是否存在
export function getUserInfoByUserName(values) {
    return request(`/profile/profile/${values.userName}/C`);
}


