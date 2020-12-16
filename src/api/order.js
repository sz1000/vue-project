import request from '@/utils/request'
import { objToParams } from '@/utils/common'

export function getIncomeRate() {
  return request({
    url: 'api/v1/income/rate',
    method: 'get'
  })
}

export function putIncomeRate(data) {
  return request({
    url: 'api/v1/income/rate',
    method: 'PUT',
    data
  })
}
// 获取全部订单的数据
export function getListOrders(params) {
  console.log('TCL: getOrderList -> params123123123__++', params)
  // params.type = 0
  // params.withUser = 1
  const paramsObj = Object.assign({}, params, { type: 0 }, { withUser: 1 }, { logistic: 1 })
  console.log('TCL: getOrderList -> params', params)
  return request({
    url: `api/v1/order${objToParams(paramsObj)}`,
    method: 'get'
  })
}
// 通过带ID获取单条订单的数据
export function getListOrdersId(id, params) {
  console.log('TCL: getOrderList -> params123123123__++', params)
  // params.type = 0
  // params.withUser = 1
  const paramsObj = Object.assign({}, params, { type: 0 }, { withUser: 1 })
  console.log('TCL: getOrderList -> params', params)
  return request({
    url: `api/v1/order/${id}${objToParams(paramsObj)}`,
    method: 'get'
  })
}

// export function getListOrders(param) {
//   const params = objToParams(param)
//   return request({
//     url: `api/v1/order${params || ''}`,
//     method: 'get'
//   })
// }
// 修改物流信息的接口
export function getListOrdersLogistic(id, params) {
  // params.type = 0
  // params.withUser = 1
  const paramsObj = Object.assign({}, params, { type: 0 }, { withUser: 1 })
  console.log('TCL: getOrderList -> params', params)
  return request({
    url: `api/v1/order/logistic/${id}${objToParams(paramsObj)}`,
    method: 'put'
  })
}

// export function getListOrdersLogistic(id, param) {
//   const params = objToParams(param)
//   return request({
//     url: `api/v1/order/logistic/${id}${params || ''}`,
//     method: 'put'
//   })
// }

export function postAddSaler(data) {
  return request({
    url: `api/v1/order`,
    method: 'post',
    data
  })
}
