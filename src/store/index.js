import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    drawer: true,
    loader: false,
    account: "",
    user_page: 1,
    post_page: 1
  },
  mutations: {
    setAccount(state, payload) {
      state.account = payload
    },
    setLoader(state, payload) {
      state.loader = payload
    },
    setDrawer(state, payload) {
      state.drawer = payload
    },
    setUserPage(state, payload) {
      state.user_page = payload
    },
    setPostPage(state, payload) {
      state.post_page = payload
    },
  },
  actions: {
    setAccount({ commit }, payload) {
      commit("setAccount", payload)
    },
    setLoader({ commit }, payload) {
      commit("setLoader", payload)
    },
    setDrawer({ commit }, payload) {
      commit("setDrawer", payload)
    },
    setUserPage({ commit }, payload) {
      commit("setUserPage", payload)
    },
    setPostPage({ commit }, payload) {
      commit("setPostPage", payload)
    },
  },
  getters: {
    account: state => state.account,
    loader: state => state.loader,
    drawer: state => state.drawer,
    user_page: state => state.user_page,
    post_page: state => state.post_page,
  }
})
