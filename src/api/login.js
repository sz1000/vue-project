import request from '@/utils/request'

export function login(username, passwd) {
  return request({
    url: '/api/v1/auth/adminLogin',
    method: 'post',
    data: {
      username,
      passwd
    }
  })
}

export function getInfo(token) {
  return request({
    url: '/user/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}
