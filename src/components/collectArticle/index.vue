<template>
  <van-button
    class='item'
    :icon="isCollected ? 'star' : 'star-o'"
    :class="{ collected: isCollected}"
    @click='onCollect'
    :loading='isLoading'
  ></van-button>
</template>

<script>
import { collectArticleApi, cancleCollectArticleApi } from '@/api'
export default {
  name: 'CollectArticle',
  props: {
    isCollected: {
      type: Boolean,
      required: true
    },
    artId: {
      type: [String, Number, Object],
      required: true
    }
  },
  data () {
    return {
      isLoading: false
    }
  },
  methods: {
    async onCollect () {
      this.isLoading = true
      if (this.isCollected) {
        try {
          await cancleCollectArticleApi(this.artId)
        } catch (err) {
          console.log(err)
          this.isLoading = false
          this.$toast('取消收藏失败')
          return
        }
      } else {
        try {
          await collectArticleApi(this.artId)
        } catch (err) {
          console.log(err)
          this.$toast('收藏失败')
          this.isLoading = false
          return
        }
      }
      this.isLoading = false
      this.$emit('changeCollect')
    }
  }
}
</script>

<style scoped lang="less">
  .collected{
    color: #ffa500;
  }
</style>
