<template>
  <div>
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
      :error.sync="error"
      error-text="请求失败，点击重新加载"
    >
      <van-cell v-for="item in resultList" :key="item.art_id" :title="item.title"
        :to="{
          name: 'ArticleIndex',
          params: {
            articleId: item.art_id
          }
        }"
      />
    </van-list>
  </div>
</template>

<script>
import { getSearchResultsApi } from '@/api'
export default {
  name: 'SearchResults',
  props: {
    text: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      loading: false,
      finished: false,
      page: 1,
      resultList: [],
      error: false
    }
  },
  methods: {
    async onLoad () {
      try {
        const { data: { data: { results } } } = await getSearchResultsApi({
          page: this.page,
          per_page: 20,
          q: this.text
        })
        // if (Math.random() > 0.1) {
        //   throw new Error()
        // }
        this.resultList.push(...results)
        this.loading = false
        if (results.length) {
          this.page++
        } else {
          this.finished = true
        }
      } catch (err) {
        this.error = true
        this.loading = false
      }
    }
  },
  computed: {
  }
}
</script>

<style scoped lang="less">

</style>
