<template>
  <div class="articleList">
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh" :success-text="reFreshText" success-duration="1000">
      <van-list
          :error.sync="error"
          error-text="请求失败，点击重新加载"
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="onLoad"
      >
        <!-- <van-cell v-for="(item,ind) in list" :key="ind" :title="item.title" /> -->
        <ArticleItem
          v-for="(item,ind) in list" :key="ind" :article="item"
        ></ArticleItem>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { getTotalChannelListApi } from '@/api'
import ArticleItem from '@/components/article/ArticleItem'
export default {
  name: 'AticleList',
  props: {
    channelObj: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      list: [],
      loading: false,
      finished: false,
      myTimestamp: null,
      error: false,
      isLoading: false,
      reFreshText: ''
    }
  },
  methods: {
    async onLoad () {
      // 异步更新数据
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求
      try {
        const { data: { data } } = await getTotalChannelListApi({
          channel_id: this.channelObj.id,
          timestamp: this.myTimestamp || Date.now()
        })
        // if (Math.random() > 0.2) {
        //   throw new Error()
        // }
        this.myTimestamp = data.pre_timestamp
        this.list.push(...data.results)
        this.loading = false
        if (data.results.length === 0) {
          this.finished = true
        }
      } catch (err) {
        // 展示错误提示
        this.error = true
        // 加载也要关闭
        this.loading = false
      }
    },
    async onRefresh () {
      try {
        const { data: { data } } = await getTotalChannelListApi({
          channel_id: this.channelObj.id,
          timestamp: Date.now()
        })
        // if (Math.random() > 0.9) {
        //   throw new Error()
        // }
        this.reFreshText = '刷新成功'
        this.list.unshift(...data.results)
        this.isLoading = false
      } catch (err) {
        this.isLoading = false
        this.reFreshText = '刷新失败'
      }
    }
  },
  components: {
    ArticleItem
  }
}
</script>

<style scoped lang="less">
  .articleList{
    overflow-y: auto;
    height: 79vh;
  }
</style>
