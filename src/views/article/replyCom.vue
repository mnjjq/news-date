<template>
  <div class="reply-contaniner">
    <van-nav-bar
      :title="currentCom.reply_count + '条回复'"
      :left-arrow="true"
      @click-left="onClickLeft"
      fixed
    />
    <comItem :comment="currentCom"/>

    <!-- 全部评论 -->
    <van-divider>全部回复</van-divider>
    <ArticleComment :artid="currentCom.com_id" reqType="c" :list="replyList"
      @addList="replyList.push(...$event)"
    />
    <div class="post-container">
        <van-button type="default" round size="small"
          class="post-button"
          @click="show = true"
        >写评论</van-button>
    </div>
    <van-popup v-model="show" position="bottom" >
      <CommentPost :target="currentCom.com_id" :artId="artId" @closePop="onClosePop"
        :flag="autName"
      />
    </van-popup>
  </div>
</template>

<script>
import CommentPost from '@/components/CommentPost'
import ArticleComment from '@/components/articleComment'
import comItem from '@/components/articleComment/comItem'
export default {
  name: 'ReplyCom',
  data () {
    return {
      show: false,
      replyList: [],
      autName: ''
    }
  },
  inject: ['artId'],
  props: {
    currentCom: {
      type: Object,
      required: true
    }
  },
  created () {
    this.$eventBus.$on('reprep', (autName) => {
      this.show = true
      this.autName = autName
    })
  },
  components: {
    comItem,
    ArticleComment,
    CommentPost
  },
  methods: {
    onClickLeft () {
      this.$eventBus.$emit('closeRePop')
    },
    onClosePop (newli) {
      this.show = !this.show
      this.$emit('addReplyCount')
      this.replyList.unshift(newli)
    }
  }
}
</script>

<style lang="less" scoped>
  .reply-contaniner{
    padding-top: 46px;
   /deep/ .van-nav-bar__arrow{
    color: #333 !important;
   }
    .post-container{
      display: flex;
      align-items: center;
      justify-content: center;
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
      height: 44px;
      background-color: #fff;
      border-top: 1px solid #d8d8d8;
      .post-button{
        width: 60%;
      }
    }
  }
</style>
