import request from '@/utils/request'

export function getHomePage() {
  return request({
    url: 'api/v1/index',
    method: 'get'
  })
}

export function putHomePage(data) {
  return request({
    url: 'api/v1/index',
    method: 'put',
    data
  })
}
