import request from '@/utils/request'

import { objToParams } from '@/utils/common'

export function categories(data) {
  var param = `?`
  if (data) {
    for (const [key, value] of Object.entries(data)) {
      param += `${key}=${value}&`
    }
    param = param.substr(0, param.length - 1)
  }
  return request({
    url: 'api/v1/categories/' + param,
    method: 'get'
  })
}

export function putOnSaleArticle(id, data) {
  id = id || ''
  return request({
    url: '/api/v1/products/' + id,
    method: 'put',
    data: {
      onSale: data
    }
  })
}

export function productList(data) {
  var param = `?`
  if (data) {
    for (const [key, value] of Object.entries(data)) {
      param += `${key}=${value}&`
    }
  }

  param = param.substr(0, param.length - 1)
  return request({
    url: `api/v1/products/${param}`,
    method: 'get'
  })
}

export function getProductList(search) {
  // const name = search ? `/&name=${search.name}` : ''
  // let searchParams =

  // const pages = page ? `?page=${page}&` : '?'
  return request({
    url: `api/v1/products/${objToParams(search)}`,
    method: 'get'
  })
}

export function productServe(method, data) {
  return request({
    url: 'api/v1/products',
    method: method || 'get',
    data: data
  })
}
export function getOneProduct(params) {
  return request({
    url: `api/v1/products/${params}`,
    method: 'get'
  })
}
export function putPruduct(params, data) {
  return request({
    url: `api/v1/products/${params}`,
    method: 'put',
    data
  })
}

export function getDoctorList() {
  return request({
    url: `api/v1/doctors/chooseList`,
    method: 'get'
  })
}

export function putDoctorRecommend(id, params) {
  return request({
    url: `api/v1/products/${id}/recommend`,
    method: 'put',
    data: {
      isRecommend: params
    }
  })
}
