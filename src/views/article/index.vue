<template>
  <div class='article-container'>
    <!-- 导航区域 -->
    <van-nav-bar
      left-arrow
      @click-left='onBack'
      :fixed="true"
    >
      <van-icon slot="right" name="ellipsis" size="20" color="#fff"/>
    </van-nav-bar>
    <!-- loading提示 -->
    <van-loading type='circular' vertical size='100px' v-if="$store.state.articleDescrp.isLoading">加载中</van-loading>
    <!-- 正文区域 -->
    <mainText v-else-if="articleObj.title"
      :obj="articleObj"
      @changeFollowed="articleObj.is_followed = !articleObj.is_followed"
      @onChangeCollect="articleObj.is_collected = !articleObj.is_collected"
      @on_Like="articleObj.attitude = 1"
      @on_dislike="articleObj.attitude = -1"
    ></mainText>
    <!-- 未知错误重试页面 -->
    <unknowErro v-else></unknowErro>
    <!-- 未找到页面区域 -->
    <notFound v-if="articleStatus === 404"></notFound>
    <!-- 回复评论弹出层 -->
    <van-popup v-model="show" position="bottom" :style="{ height: '100%' }">
      <ReplyCom :currentCom="curCom" v-if="show" @addReplyCount="curCom.reply_count++"/>
    </van-popup>
  </div>
</template>
<script>
// import CommentPost from '@/components/CommentPost'
import eventBus from '@/utils/eventBus'
import ReplyCom from '@/views/article/replyCom'
import mainText from '@/components/article/mainText'
import notFound from '@/components/article/notFound'
import unknowErro from '@/components/article/unknowErro'
import { mapGetters } from 'vuex'
export default {
  name: 'ArticleIndex',
  props: {
    articleId: {
      type: [String, Number],
      required: true
    }
  },
  provide () {
    return {
      artId: this.articleId
    }
  },
  data () {
    return {
      isloading: true,
      show: false,
      curCom: {},
      editRe: false
    }
  },
  components: {
    mainText,
    notFound,
    unknowErro,
    ReplyCom
    // CommentPost
  },
  created () {
    this.$store.dispatch('articleDescrp/getAticDes', this.articleId)
    eventBus.$on('closeRecom', (curCom) => {
      // 判断是评论的回复还是回复的回复
      if (this.show === false) {
        this.curCom = curCom
      }
      this.show = true
    })
    this.$eventBus.$on('closeRePop', () => {
      this.show = false
    })
  },
  destroyed () {
    this.$store.commit('articleDescrp/clearState')
  },
  methods: {
    onBack () {
      this.$router.back()
    }
  },
  computed: {
    ...mapGetters(['articleObj']),
    ...mapGetters(['articleStatus'])
  }
}
</script>

<style scoped lang="less">
  .article-container{
    padding-top: 46px;
    .van-nav-bar{
      background-color: #3296fa;
    }
    /deep/ .van-nav-bar__arrow{
      font-size: 18px;
      color: #fff;
    }
    .van-loading--vertical{
      justify-content: center;
    }
    .van-loading{
      height: 667px;
    }
  }
</style>
