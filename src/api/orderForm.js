import request from '@/utils/request'
import {
  objToParams
} from '@/utils/common'
// 获取订单列表
export function getOrderList(params) {
  // console.log('TCL: getOrderList -> params123123123__++', params)
  // params.type = 0
  // params.withUser = 1
  const paramsObj = Object.assign({}, params, {
    type: 0
  }, {
    withUser: 1
  })
  // console.log('TCL: getOrderList -> params', params)
  return request({
    url: `api/v1/order/${objToParams(paramsObj)}`,
    method: 'get'
  })
}
// 根据核销码获取订单
export function getVerifivationOrder(key) {
  return request({
    url: `api/v1/order/key/${key}`,
    method: 'get'
  })
}
// 核销订单
export function putConfirmOrder(id) {
  return request({
    url: `api/v1/order/confirm/${id}`,
    method: 'put'
  })
}

export function getClientOrder(paramsObj) {
  return request({
    url: `api/v1/order/${objToParams(paramsObj)}`,
    method: 'get'
  })
}
