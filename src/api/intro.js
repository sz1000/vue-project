import request from '@/utils/request'

export function getIntro() {
  return request({
    url: '/api/v1/intro',
    method: 'get'
  })
}

export function postIntro(data) {
  return request({
    url: '/api/v1/intro',
    method: 'put',
    data
  })
}
