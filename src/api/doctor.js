import request from '@/utils/request'
import { objToParams } from '@/utils/common'

export function addDoctor(data) {
  return request({
    url: 'api/v1/doctors',
    method: 'post',
    data
  })
}

export function getDoctorList(search) {
  return request({
    url: `api/v1/doctors${objToParams(search)}`,
    method: 'get'
  })
}

export function putTargetDoctor(id, data) {
  return request({
    url: 'api/v1/doctors/' + id,
    method: 'put',
    data
  })
}

export function deleteTargetDoctor(id) {
  return request({
    url: 'api/v1/doctors/' + id,
    method: 'delete'
  })
}
export function getTargetDoctor(id) {
  return request({
    url: `api/v1/doctors/${id}?withData=1`,
    method: 'get'
  })
}

export function targetDoctor(param) {
  return request({
    url: 'api/v1/doctors/' + param,
    method: 'get'
  })
}

