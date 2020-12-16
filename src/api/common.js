import request from '@/utils/request'

export function getQiniuToken(name) {
  const params = name ? `?key=${name}` : ''
  return request({
    url: `/api/v1/qiniu/token/${params}`,
    method: 'get'
  })
}

export function getQiniuRefresh(data) {
  return request({
    url: `/api/v1/qiniu/flush`,
    method: 'post',
    data
  })
}
