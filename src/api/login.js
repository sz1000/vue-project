import request from '@/utils/request'

export function login(username, passwd) {
  var encryptor = new JSEncrypt() // 创建加密对象实例
  //之前ssl生成的公钥，复制的时候要小心不要有空格
  var pubKey = '-----BEGIN PUBLIC KEY-----MFwwDQYJKoZIhvcNAQEBBQADSwAwSAJBANL378k3RiZHWx5AfJqdH9xRNBmD9wGD2iRe41HdTNF8RUhNnHit5NpMNtGL0NPTSSpPjjI1kJfVorRvaQerUgkCAwEAAQ==-----END PUBLIC KEY-----'
  encryptor.setPublicKey(pubKey) //设置公钥
  var password = encryptor.encrypt(passwd) // 对内容进行加密
  return request({
    // url: '/api/v1/auth/adminLogin',

    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
    },
    url: '/auth/login',
    method: 'post',
    data: {
      username,
      password
      // passwd
    }
  })
}

export function getInfo(token) {
  return request({
    url: '/user/info',
    method: 'get',
    params: {
      token
    }
  })
}

export function logout() {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}
