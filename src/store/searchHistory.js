import { setItem, getItem } from '@/utils/localstorage'
const history = 'history'
export default {
  namespaced: true,
  state: {
    historyList: getItem(history) || []
  },
  mutations: {
    getHistoryList (state, item) {
      const index = state.historyList.indexOf(item)
      if (index !== -1) {
        state.historyList.splice(index, 1)
      }
      state.historyList.unshift(item)
      setItem(history, state.historyList)
    },
    deleteHistory (state, ind) {
      state.historyList.splice(ind, 1)
      setItem(history, state.historyList)
    },
    clearHistory (state) {
      state.historyList = []
      setItem(history, state.historyList)
    }
  },
  actions: {}
}
