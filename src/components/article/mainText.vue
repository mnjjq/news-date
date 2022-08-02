<template>
  <div class='main-text-container markdown-body'>
    <!-- 标题 -->
    <h2 class='tittle'>{{ obj.title }}</h2>
    <!-- 作者信息 -->
    <van-cell center :title='obj.aut_name' :label='obj.pubdate | forMateDate' class='aut-info' :border='false'>
      <follow-user :isFollowed="obj.is_followed" :artId="obj.aut_id"
        @changeFollowed="changeFn"
       />
      <van-image
        width='35'
        height='35'
        slot='icon'
        fit='cover'
        round
        :src='obj.aut_photo'
      />
    </van-cell>
    <!-- 正文区域 -->
    <p class='main-text' ref='text' v-html="obj.content" ></p>
    <!-- 评论区域 -->
    <footer class='comment-container'>
      <!-- 评论输入框 -->
      <van-button type="default" round size="small"
        @click="popFn"
      >写评论</van-button>
      <!-- 评论数量
       -->
       <van-badge :content="totalCount" class="item">
        <van-button  icon="chat-o" class="item-child" ></van-button>
       </van-badge>
      <!-- 点赞 -->
      <LikeArticle class="item"
        :isLike="obj.attitude"
        :artId="obj.art_id"
        @like="$emit('on_Like')"
        @dislike="$emit('on_dislike')"
      />
      <!-- 收藏 -->
      <CollectArticle :isCollected="obj.is_collected" :artId="obj.art_id" class="item"
        @changeCollect="$emit('onChangeCollect')"
      />
      <van-button class="item" icon="share-o"></van-button>
  </footer>
  <!-- 评论列表 -->
    <ArticleComment :artid="obj.art_id" reqType="a" @getComCount="totalCount = $event" :list="comList"
      @addList="comList.push(...$event)"
    />
    <!-- 弹出层 -->
    <van-popup v-model="show" position="bottom" >
      <CommentPost :target="obj.art_id" @closePop="closePopFn" />
    </van-popup>
  </div>
</template>
<script>
import { ImagePreview } from 'vant'
import FollowUser from '@/components/article/FollowUser.vue'
import CollectArticle from '@/components/collectArticle'
import LikeArticle from '@/components/likeArticle'
import ArticleComment from '@/components/articleComment'
import CommentPost from '@/components/CommentPost'
export default {
  name: 'mainText',
  props: {
    obj: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      isLd: false,
      show: false,
      totalCount: '',
      comList: []
    }
  },
  computed: {
  },
  created () {
    this.$nextTick(() => {
      const ol = this.$refs.text.querySelectorAll('ol')
      ol.forEach(el => {
        el.style.width = 90 + 'vw'
      })
      const img = this.$refs.text.querySelectorAll('img')
      const imgSrc = []
      console.log(img)
      img.forEach((element, ind) => {
        element.style.maxWidth = 90 + 'vw'
        imgSrc.push(element.src)
        element.addEventListener('click', () => {
          ImagePreview({
            images: imgSrc,
            startPosition: ind
          })
        })
      })
    })
    // 获取文章评论
  },
  components: {
    FollowUser,
    CollectArticle,
    LikeArticle,
    ArticleComment,
    CommentPost
  },
  methods: {
    changeFn () {
      this.$emit('changeFollowed')
    },
    popFn () {
      this.show = true
    },
    closePopFn (newli) {
      this.show = false
      this.totalCount++
      this.comList.unshift(newli)
    }
  }
}
</script>

<style scoped lang="less">
@import '@/css/markdown.css';
.main-text-container {
  padding: 24px 20px 43px 15px;
  background-color: #fff;
  .tittle {
    margin-bottom: 30px;
  }
  .van-cell {
    padding: unset;
  }
  .aut-info {
    color: #333333;
    .van-cell__label {
      margin-top: -3px;
    }
    .van-button {
      width: 85px;
      height: 29px;
      white-space: nowrap;
    }
    .van-image {
      margin-right: 5px;
    }
  }
  .main-text {
    margin-top: 26px;
    font-size: 15px;
    color: #333333;
  }
  .comment-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: fixed;
    left: 0;
    bottom: 0;
    height: 43px;
    width: 100%;
    padding: 0 20px 0 15px;
    border: 1px solid #d8d8d8;
    background-color: #fff;
    z-index: 2;
  .van-icon{
    font-size: 20px;
  }
  .van-button{
    width: 200px;
    height: 32px;
  }
  .van-badge__wrapper{
    z-index: 1;
  }
  /deep/ .item{
    border: none;
    width: 20px;
    height: 20px;
    font-size: 17px;
    .item-child{
      position: absolute;
      left: -5px;
      border: none;
      width: 20px;
      height: 20px;
      font-size: 17px;
    }
  }
}
}
</style>
