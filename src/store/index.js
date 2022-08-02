import Vue from 'vue'
import Vuex from 'vuex'
import { getItem, setItem } from '@/utils/localstorage'
import history from './searchHistory'
import articleDescrp from './articleDescrp'
Vue.use(Vuex)
const tokenKey = 'toutiaoUser'
export default new Vuex.Store({
  state: {
    // 这里是为了让刷新后数据不变，视图不变
    user: getItem(tokenKey),
    totalChannelList: {}
  },
  getters: {
    historyList (state) {
      return state.history.historyList
    },
    // 文章状态
    articleStatus (state) {
      return state.articleDescrp.articleStatus
    },
    articleObj (state) {
      return state.articleDescrp.article
    }
  },
  mutations: {
    setUser (state, payload) {
      setItem(tokenKey, payload)
      // 这里是为了使数据改变影响视图
      state.user = payload
    },
    refToken (state, payload) {
      state.user.token = payload
      setItem(tokenKey, payload)
    }
  },
  actions: {
  },
  modules: {
    history,
    articleDescrp
  }
})
