import request from '@/utils/request'
import { objToParams } from '@/utils/common'

export function getTargetArticle(id) {
  id = id || ''
  return request({
    url: '/api/v1/articles/' + id,
    method: 'get'
  })
}

export function deleteTargetArticle(id) {
  id = id || ''
  return request({
    url: '/api/v1/articles/' + id,
    method: 'delete'
  })
}

export function putRecommendArticle(id, data) {
  return request({
    url: `api/v1/articles/${id}/recommend`,
    method: 'put',
    data: {
      recommend: data
    }
  })
}

export function getArticlesList(data) {
  const params = objToParams(data)
  return request({
    url: `/api/v1/articles/${params}`,
    method: 'get'
  })
}

export function getArticlesSearch(page) {
  const pages = page ? `?page=${page}` : ''
  return request({
    url: '/api/v1/articles' + pages,
    method: 'get'
  })
}

export function postArticlesList(data, method, id) {
  id = method === 'put' ? id : ''
  return request({
    url: '/api/v1/articles/' + id,
    method: method,
    data
  })
}
