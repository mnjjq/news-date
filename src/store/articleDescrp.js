import { getArticleDeciptionApi } from '@/api'
export default {
  namespaced: true,
  state: {
    article: {},
    isLoading: true,
    articleStatus: 0
  },
  mutations: {
    storeAticle (state, article) {
      const { data: { data } } = article
      state.articleStatus = article.status
      state.article = data
      console.log(data)
    },
    // 更改首页加载
    reIsLoading (state) {
      state.isLoading = false
    },
    // 返回清空数据，防止下次进入详情页面会有上次访问文章的残留
    clearState (state) {
      state.article = {}
      state.isLoading = true
      state.articleStatus = 0
    }
  },
  actions: {
    async getAticDes (context, id) {
      try {
        const res = await getArticleDeciptionApi(id)
        context.commit('storeAticle', res)
        context.commit('reIsLoading')
      } catch (err) {
        console.log(err)
      }
    }
  }
}
