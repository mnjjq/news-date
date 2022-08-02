<template>
  <van-button
    :icon="isLike > 0 ? 'good-job' : 'good-job-o'"
    :class="{ liked: isLike > 0}"
    @click='Likefn'
    :loading='isLoading'
  ></van-button>
</template>

<script>
import { likeArticleApi, dislikeArticleApi } from '@/api'
export default {
  name: 'LikeArticle',
  props: {
    isLike: {
      type: Number,
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
    async Likefn () {
      this.isLoading = true
      if (this.isLike > 0) {
        try {
          await dislikeArticleApi(this.artId)
          this.$emit('dislike')
        } catch (err) {
          console.log(err)
          this.$toast('取消收藏失败')
        }
      } else {
        try {
          await likeArticleApi(this.artId)
          this.$emit('like')
        } catch (err) {
          console.log(err)
          this.$toast('收藏失败')
        }
      }
      this.isLoading = false
    }
  }
}
</script>

<style scoped lang="less">
  .liked{
    color: #e5645f;
  }
</style>
