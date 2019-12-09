//   公共请求数据
import Vue from 'vue'
import Vuex from 'vuex'
import fetch from './api/api'
import router from './router'

Vue.use(Vuex)

const balance = {
  state: {
    userInfo: [],
    isMerchant: '',
    userData: '',
    account: '',
    user: '',
    address: '',
    loginFlag: false,
    isboss: '',
    piBalance: '',
    currentCoin: '', // 当前支付的币种
    currentCoinIndex: '' || 0
  },
  getters: {
    userInfo: state => state.userInfo, // 用户信息balanceData.user
    loginFlag: state => state.loginFlag,
    userData: state => state.userData,
    isboss: state => state.userData.isboss,
    account: state => state.account,
    address: state => state.address,
    piBalance: state => state.piBalance,
    isMerchant: state => state.isMerchant,
    currentCoin: state => state.currentCoin,
    currentCoinIndex: state => state.currentCoinIndex
  },
  actions: {
    // 获取用户信息
    getUserBalance ({commit}) {
      fetch.get('user/balance').then((res) => {
        if (res.success === true) {
          commit('GET_USER_INFO', res.data)
        } else {
          router.push('/login')
        }
      })
    }
  },
  mutations: {
    GET_USER_INFO (state, data) {
      this.loginFlag = true
      state.account = data.account
      state.userData = data.user
      state.isboss = data.user.isboss
      state.address = data.user.address
      state.isMerchant = data
      state.userInfo = data
      state.piBalance = data.account.piBalance
    },
    SET_CURRENT_COIN(state, currentCoin) {
      state.currentCoin = currentCoin
    },
    SET_CURRENT_COIN_INDEX(state, currentCoinIndex) {
      state.currentCoinIndex = currentCoinIndex
    }
  }
}
export default new Vuex.Store({
  modules: {
    balance,
    userData: '',
    account: '',
    address: '',
    piBalance: ''
  }
})
