import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    drawer: true,
    loader: false,
    account: "",
    user: "",
    web3: "",
    wallet_balance: ""
  },
  mutations: {
    setAccount(state, payload) {
      state.account = payload
    },
    setUser(state, payload) {
      state.user = payload
    },
    setWeb3(state, payload) {
      state.web3 = payload
    },
    setLoader(state, payload) {
      state.loader = payload
    },
    setDrawer(state, payload) {
      state.drawer = payload
    },
    setWalletBalance(state, payload) {
      state.wallet_balance = payload
    },
  },
  actions: {
    setAccount({ commit }, payload) {
      commit("setAccount", payload)
    },
    setUser({ commit }, payload) {
      commit("setUser", payload)
    },
    setWeb3({ commit }, payload) {
      commit("setWeb3", payload)
    },
    setLoader({ commit }, payload) {
      commit("setLoader", payload)
    },
    setDrawer({ commit }, payload) {
      commit("setDrawer", payload)
    },
    setWalletBalance({ commit }, payload) {
      commit("setWalletBalance", payload)
    },
  },
  getters: {
    account: state => state.account,
    user: state => state.user,
    web3: state => state.web3,
    loader: state => state.loader,
    drawer: state => state.drawer,
    wallet_balance: state => state.wallet_balance,
  }
})
