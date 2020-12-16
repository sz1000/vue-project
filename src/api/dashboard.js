import request from '@/utils/request'

export function getAnalysis() {
  return request({
    url: 'api/v1/analysis/count',
    method: 'get'
  })
}

export function getUserPortrait(timeZone) {
  return request({
    url: `api/v1/analysis/userPortrait?timeZone=${timeZone}`,
    method: 'get'
  })
}

export function getVisitData(timeZone) {
  return request({
    url: `api/v1/analysis/visitData?${timeZone}`,
    method: 'get'
  })
}
