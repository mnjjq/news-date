<template>
  <div class="search-recommend-conatiner">
    <van-cell icon="search" v-for="(item, ind) in recommendList" :key="ind"
      @click="$emit('switch',item)"
    >
    <span slot="title" v-html="hightlight(item || '')"></span>
    </van-cell>
  </div>
</template>

<script>
import { getRecommendApi } from '@/api'
export default {
  name: 'SearchRecommend',
  props: {
    text: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      recommendList: [],
      timer: null
    }
  },
  methods: {
    async getRecommend () {
      const { data: { data: { options } } } = await getRecommendApi({ q: this.text })
      this.recommendList = options
    },
    hightlight (item) {
      const reg = new RegExp(this.text, 'gi')
      return item.replace(reg, `<span style="color: red;">${this.text}</span>`)
    }
  },
  watch: {
    text: {
      immediate: true,
      handler () {
        if (this.timer) {
          clearTimeout(this.timer)
        }
        this.timer = setTimeout(() => {
          this.getRecommend()
        }, 500)
      }
    }
  }
}
</script>

<style scoped lang="less">
  .search-recommend-conatiner{
    .van-cell:not(:last-child){
      border-bottom: 1px solid #e8e8e8;
    }
  }
</style>
