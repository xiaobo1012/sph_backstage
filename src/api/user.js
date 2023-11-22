import request from '@/utils/request'

// API文档接口地址：http://39.98.123.211:8510/swagger-ui.html

/**
 * 登录接口函数
 * @param data
 * @returns {*}
 */
export function login(data) {
  return request({
    url: '/admin/acl/index/login',
    method: 'post',
    data
  })
}

/**
 * 获取用户信息函数
 * @param token
 * @returns {*}
 */
export function getInfo(token) {
  return request({
    url: '/admin/acl/index/info',
    method: 'get',
    params: { token }
  })
}

/**
 * 退出登录函数
 * @returns {*}
 */
export function logout() {
  return request({
    url: '/admin/acl/index/logout',
    method: 'post'
  })
}




