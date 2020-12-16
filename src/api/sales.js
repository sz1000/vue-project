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

export function getListSalers(param) {
  const params = objToParams(param)
  return request({
    url: `api/v1/salers${params || ''}`,
    method: 'get'
  })
}

export function postAddSaler(data) {
  return request({
    url: `api/v1/salers`,
    method: 'post',
    data
  })
}
