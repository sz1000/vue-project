import request from '@/utils/request'

import {
  objToParams
} from '@/utils/common'

//网络攻击发送接口
export function sendPeopleBank(data) {
  return request({
    url: '/test/pboc/netAttack',
    method: 'post',
    data
  })
}
//列表查询接口
export function list(data) {
  var param = `?`
  if (data) {
    for (const [key, value] of Object.entries(data)) {
      param += `${key}=${value}&`
    }
  }

  param = param.substr(0, param.length - 1)
  return request({
    url: `/test/netAttack/queryAll${param}`,
    method: 'get'
  })
}
//病毒报告查询接口
export function virusTable(data) {
  var param = `?`
  if (data) {
    for (const [key, value] of Object.entries(data)) {
      param += `${key}=${value}&`
    }
  }

  param = param.substr(0, param.length - 1)
  return request({
    url: `/test/pboc/virus/queryAll${param}`,
    method: 'get'
  })
}

//病毒报告新增接口
export function virusAdd(data) {
  return request({
    url: '/test/pboc/virus/add',
    method: 'post',
    data
  })
}
//病毒报告删除接口
export function virusDel(data) {
  return request({
    url: '/test/pboc/virus/del',
    method: 'post',
    data
  })
}
//病毒报告修改接口
export function virusEdit(data) {
  return request({
    url: '/test/pboc/virus/edit',
    method: 'post',
    data
  })
}
//病毒报告发送接口
export function virusSend(data) {
  return request({
    url: '/test/pboc/virus/send',
    method: 'post',
    data
  })
}

///test/pboc/virus/getDict?dictName=virusType
export function virusTypeQuery(data) {
  return request({
    url: '/test/pboc/virus/getDict?dictName=virusType',
    method: 'post',
    data
  })
}

//防毒安装数查询
export function virusDeviceQuery(data) {
  var param = `?`
  if (data) {
    for (const [key, value] of Object.entries(data)) {
      param += `${key}=${value}&`
    }
  }

  param = param.substr(0, param.length - 1)
  return request({
    url: `/test/pboc/virusDevice/queryAllSafe${param}`,
    method: 'get'
  })
}

//防毒安装数新增接口
export function virusDeviceAdd(data) {
  return request({
    url: '/test/pboc/virusDevice/add',
    method: 'post',
    data
  })
}
//防毒安装数删除接口
export function virusDeviceDel(data) {
  return request({
    url: '/test/pboc/virusDevice/del',
    method: 'post',
    data
  })
}
//防毒安装数修改接口
export function virusDeviceEdit(data) {
  return request({
    url: '/test/pboc/virusDevice/edit',
    method: 'post',
    data
  })
}
//防毒安装数发送接口
export function virusDeviceSend(data) {
  return request({
    url: '/test/pboc/virusDevice/send',
    method: 'post',
    data
  })
}

// 防钓鱼假冒查询接口
export function phishingQuery(data) {
  var param = `?`
  if (data) {
    for (const [key, value] of Object.entries(data)) {
      param += `${key}=${value}&`
    }
  }

  param = param.substr(0, param.length - 1)
  return request({
    url: `/test/pboc/phishing/queryAllSafe${param}`,
    method: 'get'
  })
}

// 防钓鱼假冒新增接口
export function phishingAdd(data) {
  return request({
    url: '/test/pboc/phishing/add',
    method: 'post',
    data
  })
}

// 防钓鱼假冒删除接口
export function phishingDel(data) {
  return request({
    url: '/test/pboc/phishing/del',
    method: 'post',
    data
  })
}

// 防钓鱼假冒编辑接口
export function phishingEdit(data) {
  return request({
    url: '/test/pboc/phishing/edit',
    method: 'post',
    data
  })
}

// 防钓鱼假冒发送接口
export function phishingSend(data) {
  return request({
    url: '/test/pboc/phishing/send',
    method: 'post',
    data
  })
}

// DDOS攻击查询
export function ddosQuery(data) {
  var param = `?`
  if (data) {
    for (const [key, value] of Object.entries(data)) {
      param += `${key}=${value}&`
    }
  }

  param = param.substr(0, param.length - 1)
  return request({
    url: `/test/pboc/ddos/queryAllSafe${param}`,
    method: 'get'
  })
}
// DDOS攻击新增test/pboc/ddos/add
export function ddosAdd(data) {
  return request({
    url: '/test/pboc/ddos/add',
    method: 'post',
    data
  })
}
// DDOS攻击修改
export function ddosEdit(data) {
  return request({
    url: '/test/pboc/ddos/edit',
    method: 'post',
    data
  })
}
// DDOS攻击删除
export function ddosDel(data) {
  return request({
    url: '/test/pboc/ddos/del',
    method: 'post',
    data
  })
}
// DDOS攻击发送
export function ddosSend(data) {
  return request({
    url: '/test/pboc/ddos/send',
    method: 'post',
    data
  })
}

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
