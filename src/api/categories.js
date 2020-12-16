import request from '@/utils/request'

export function getCategoriesList() {
  return request({
    url: '/api/v1/categories/tree',
    method: 'get'
  })
}

export function putTargetCategories(id, data) {
  return request({
    url: '/api/v1/categories/' + id,
    method: 'put',
    data
  })
}
export function DeleteTargetCategories(id) {
  return request({
    url: '/api/v1/categories/' + id,
    method: 'delete'
  })
}

export function getTargetCategories(id) {
  return request({
    url: '/api/v1/categories/' + id,
    method: 'get'
  })
}

export function getFirstCategories() {
  return request({
    url: '/api/v1/categories?level=1',
    method: 'get'
  })
}
export function postFirstCategories(data) {
  return request({
    url: '/api/v1/categories',
    method: 'post',
    data
  })
}

export function postSecondCategories(data) {
  return request({
    url: '/api/v1/categories',
    method: 'post',
    data
  })
}
