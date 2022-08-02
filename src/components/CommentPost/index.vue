<template>
  <div class="comment-post">
    <van-field
      class="post-field"
      v-model="message"
      rows="2"
      autosize
      type="textarea"
      maxlength="50"
      placeholder="请输入评论"
      show-word-limit
      v-focus
    />
    <van-button
      class="post-btn"
      @click="pubFn"
    >发布</van-button>
  </div>
</template>

<script>
// import eventBus from '@/utils/eventBus'
import { pubComApi } from '@/api'
export default {
  name: 'CommentPost',
  components: {},
  props: {
    target: {
      type: [Number, String, Object],
      required: true
    },
    artId: {
      type: [Number, String, Object],
      default: null
    },
    flag: {
      type: [String],
      default: null
    }
  },
  data () {
    return {
      message: ''
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {
    async pubFn () {
      if (this.message.trim().length === 0) {
        this.message = ''
        return this.$toast('评论内容不能为空！')
      }
      try {
        const { data } = await pubComApi({
          target: this.target,
          content: this.flag ? `回复 @${this.flag}：${this.message}` : this.message,
          art_id: this.artId
        })
        console.log(data.data, 1)
        // eventBus.$emit('addCom', data.data.new_obj)
        this.$emit('closePop', data.data.new_obj)
        this.message = ''
      } catch (err) {
        console.log(err)
        this.$toast('发布失败！')
      }
    }
  }
}
</script>

<style scoped lang="less">
.comment-post {
  display: flex;
  align-items: center;
  padding: 16px 0 16px 16px;
  .post-field {
    background-color: #f5f7f9;
  }
  .post-btn {
    width: 150px;
    border: none;
    padding: 0;
    color: #6ba3d8;
    &::before {
      display: none;
    }
  }
}
</style>
