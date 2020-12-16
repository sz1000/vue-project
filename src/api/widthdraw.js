import request from '@/utils/request'
import { objToParams } from '@/utils/common'
// 获取提现记录列表
export function getWithdrawList(params) {
  const paramsObj = Object.assign({}, params, { type: 0 }, { withUser: 1 })
  return request({
    url: `api/v1/jiyou/withdraw/${objToParams(paramsObj)}`,
    method: 'get'
  })
}
