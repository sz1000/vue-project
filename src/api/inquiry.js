import request from '@/utils/request'

export function putInquiry(data) {
  return request({
    url: 'api/v1/consult/struct',
    method: 'put',
    data
  })
}

export function getInquiry() {
  return request({
    url: 'api/v1/consult/struct',
    method: 'get'
  })
}

export function getListInquiry(data) {
  return request({
    url: `api/v1/consult/${data || ''}`,
    method: 'get'
  })
}
