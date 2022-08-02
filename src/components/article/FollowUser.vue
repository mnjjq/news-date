<template>
  <van-button
    type='info'
    color='#cecece'
    round
    v-if='isFollowed'
    @click='onFollow'
    :loading='isLd'
  >已关注</van-button>
  <van-button type='info' round icon='plus' v-else @click='onFollow' :loading='isLd'>关注</van-button>
</template>

<script>
import { cancleFollowUserApi, followUserApi } from '@/api'
export default {
  name: 'FollowUser',
  props: {
    isFollowed: {
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
      isLd: false
    }
  },
  methods: {
    async onFollow () {
      this.isLd = true
      if (this.isFollowed) {
        try {
          await cancleFollowUserApi(this.artId)
          // this.isLd = false
        } catch (err) {
          console.log(err)
          this.$toast('取消关注失败，请重试')
          this.isLd = false
          return
        }
      } else {
        try {
          await followUserApi(this.artId)
          // this.isLd = false
        } catch (err) {
          console.log(err)
          this.$toast('关注失败，请重试')
          this.isLd = false
          return
        }
      }
      this.$emit('changeFollowed')
      this.isLd = false
    }
  }
}
</script>

<style scoped lang="less">
</style>
