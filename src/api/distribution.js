import request from '@/utils/request'

export function getData() {
  return request({
    url: 'api/v1/jiyou/income/config',
    method: 'get'
  })
}

export function commitData(data) {
  return request({
    url: 'api/v1/jiyou/income/config',
    method: 'put',
    data
  })
}
