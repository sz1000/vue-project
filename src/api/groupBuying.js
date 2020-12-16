import request from '@/utils/request'

import { objToParams } from '@/utils/common'

// 新建拼团&修改拼团
export function postBuying(data, id) {
  id = id === '0' ? null : id
  return request({
    url: `api/v1/group/${id || ''}`,
    method: id ? 'PUT' : 'POST'
  })
}
// 拼团详情
export function getBuyingList(data) {
  return request({
    url: `api/v1/group/${objToParams(data)}`,
    method: 'get'
  })
}
// 根据订单ID获取拼团信息
export function getBuying(id) {
  return request({
    url: `api/v1/group/${id}`,
    method: 'get'
  })
}
// 拼团结束
export function getBuyingEnd(id) {
  return request({
    url: `api/v1/group/${id}/end`,
    method: 'put'
  })
}
