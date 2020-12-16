import request from '@/utils/request'
import { objToParams } from '@/utils/common'

export function getAppointmentList(query) {
  const patams = objToParams(query)
  return request({
    url: `api/v1/appoint/${patams}`,
    method: 'get'
  })
}

export function postAppointment(data) {
  return request({
    url: 'api/v1/appoint',
    method: 'post',
    data
  })
}

export function getAppointment(id) {
  return request({
    url: `api/v1/appoint/${id}`,
    method: 'get'
  })
}

export function cancelAppointment(id) {
  return request({
    url: `api/v1/appoint/cancel/${id}`,
    method: 'put'
  })
}

export function putAppointReach(id) {
  return request({
    url: `api/v1/appoint/reach/${id}`,
    method: 'put'
  })
}
