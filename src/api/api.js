import axios from 'axios'
import qs from 'qs'

let baseURL = 'https://3muyuvzh55.execute-api.ap-northeast-2.amazonaws.com/dev' // 测试接口地址

let ax = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  }
})


export default {
  get: (url, params) => {
    return new Promise((resolve, reject) => {
      ax({
        url,
        method: 'get',
        params: params
      }).then(res => {
        resolve(res.data)
      }).catch(err => {
        reject(err)
      })
    })
  },
  post: (url, params) => {
    return new Promise((resolve, reject) => {
      ax({
        method: 'post',
        url,
        data: params
      }).then(res => {
        resolve(res.data)
      }).catch(err => {
        reject(err)
      })
    })
  },
  delete: (url, params) => {
    return new Promise((resolve, reject) => {
      ax({
        method: 'delete',
        url,
        data: params
      }).then(res => {
        resolve(res.data)
      }).catch(err => {
        reject(err)
      })
    })
  },
  patch: (url, params) => {
    return new Promise((resolve, reject) => {
      ax({
        method: 'patch',
        url,
        data: params
      }).then(res => {
        resolve(res.data)
      }).catch(err => {
        reject(err)
      })
    })
  },
  postFormdata: (url, params) => {
    return new Promise((resolve, reject) => {
      ax.post(url, params).then(res => {
        resolve(res.data)
      }).catch(err => {
        reject(err)
      })
    })
  }
}
