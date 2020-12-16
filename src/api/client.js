import request from '@/utils/request'
import { objToParams } from '@/utils/common'

export function getClientList(paramObj) {
  const param = objToParams(paramObj)
  return request({
    url: `/api/v1/user/list/${param}`,
    method: 'get'
  })
}

export function getClient(id) {
  return request({
    url: `/api/v1/user/${id}`,
    method: 'get'
  })
}

export function postClient(data, methods, id) {
  return request({
    url: `/api/v1/user/${id || ''}`,
    method: methods || 'post',
    data
  })
}

export function postSource(data) {
  return request({
    url: '/api/v1/user/source',
    method: 'POST',
    data
  })
}

export function getSourceList() {
  return request({
    url: '/api/v1/user/source',
    method: 'get'
  })
}

export function delSource(id) {
  return request({
    url: `/api/v1/user/source/${id}`,
    method: 'DELETE'
  })
}

export function postOfflineOrder(data) {
  return request({
    url: `/api/v1/order/offline`,
    method: 'post',
    data
  })
}
export function getClientFollowup(paramsObj) {
  return request({
    url: `api/v1/followup/${objToParams(paramsObj)}`,
    method: 'get'
  })
}

export function postlientFollowup(data) {
  return request({
    url: `api/v1/followup`,
    method: 'post',
    data
  })
}
