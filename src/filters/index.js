export function judge(params) {
  if (params === 1) {
    return true
  } else if (params === 0) {
    return false
  }
}

export function identity(params) {
  if (params === 1) {
    return '工作'
  } else if (params === 0) {
    return '学生'
  }
}

export function gender(params) {
  if (params === 1) {
    return '男'
  } else if (params === 2) {
    return '女'
  } else {
    return '未知'
  }
}

export function orderStatus(key) {
  switch (key) {
    case 0:
      return '未付款'
    case 1:
      return '已付款'
    case 2:
      return '已取消'
    case 3:
      return '已核销'
    case 4:
      return '已退款'
    case -1:
      return '订单支付异常 '
  }
}

/**
 *后台返回的都是分，需要过滤为元为展示单位
 * @param  {Number} cent
 */
export function priveToYuan(cent) {
  if (cent) {
    return cent / 100
  }
}

/**
 *元转换为分提交
 * @param  {Number} yuan
 */
export function priveToCent(yuan) {
  if (yuan) {
    return yuan * 100
  }
}
