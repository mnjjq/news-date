<template>
    <van-cell >
        <van-image
          slot='icon'
          round
          width='30'
          height='30'
          style='margin-right: 10px;'
          :src='comment.aut_photo'
        />
        <span style='color: #466b9d;' slot='title'>{{comment.aut_name}}</span>
        <div slot='label'>
          <p style='color: #363636;' v-html="hightlight(comment.content)"></p>
          <p>
            <span style='margin-right: 10px;'>{{ comment.pubdate | forMateDate}}</span>
            <van-button size='mini' type='default' @click="replyFn">回复 {{comment.reply_count}}</van-button>
          </p>
        </div>
        <van-icon slot='right-icon' :name="comment.is_liking ? 'like' : 'like-o'"
          :class="{active: comment.is_liking}"
          @click="likeFn"
        />
      </van-cell>
</template>

<script>
import eventBus from '@/utils/eventBus'
import { getCommentLikesApi, cancleCommentLikesApi } from '@/api'
export default {
  name: 'comItem',
  props: {
    comment: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      str: this.comment.content
    }
  },
  methods: {
    async likeFn () {
      try {
        if (this.comment.is_liking) {
          await cancleCommentLikesApi(this.comment.com_id)
        } else {
          await getCommentLikesApi(this.comment.com_id)
        }
        this.$emit('changeLike')
      } catch (err) {
        console.log(err)
      }
    },
    // 监听回复
    replyFn () {
      eventBus.$emit('closeRecom', this.comment)
      this.$eventBus.$emit('reprep', this.comment.aut_name)
    },
    hightlight (item) {
      const reg = new RegExp(`@${this.comment.aut_name}`, 'gi')
      return item.replace(reg, `<a href="#">@${this.comment.aut_name}</a>`)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
