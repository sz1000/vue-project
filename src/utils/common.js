
// 过滤数据，下滑线变驼峰，这一切都是因为后台是个懒逼
export function undelinToHump(obj) {
  if (typeof obj === 'object') {
    const keyArr = Object.keys(obj)
    const valueArr = Object.values(obj)
    const tempArr = []
    keyArr.forEach(value => {
      const tempV = value.replace(/\_(\w)/g, function(all, letter) {
        return letter.toUpperCase()
      })
      tempArr.push(tempV)
    })
    const newObj = {}
    valueArr.forEach((value, index) => {
      newObj[tempArr[index]] = value
    })
    return newObj
  } else {
    console.error('undelinToHump:只接受对象')
  }
}
// 对象转搜索参数
export function objToParams(obj) {
  if (!obj || JSON.stringify(obj) === '{}') {
    return ''
  }
  const params = Object.keys(obj)
  const values = Object.values(obj)
  let stringParams = '?'
  params.forEach((item, index) => {
    stringParams += `${item}=${values[index]}${(params.length - 1) === index ? '' : '&'}`
  })
  return stringParams
}
