<template>
  <div class='article-comments'>
    <!-- 评论列表 -->
    <van-list v-model='loading' :finished='finished' finished-text='没有更多了' @load='onLoad'
      :immediate-check="false"
    >
      <comItem :comment="item" v-for="(item, ind) in list" :key="ind"
        @changeLike="item.is_liking = !item.is_liking"
      />
    </van-list>
    <!-- 评论列表 -->

    <!-- 发布评论 -->
    <!-- <van-cell-group class='publish-wrap'>
      <van-field clearable placeholder='请输入评论内容'>
        <van-button slot='button' size='mini' type='info'>发布</van-button>
      </van-field>
    </van-cell-group>-->
    <!-- /发布评论 -->
    <slot></slot>
  </div>
</template>

<script>
// import eventBus from '@/utils/eventBus'
import comItem from '@/components/articleComment/comItem'
import { getCommentListApi } from '@/api'
export default {
  name: 'ArticleComment',
  props: {
    artid: {
      type: [String, Number, Object],
      required: true
    },
    reqType: {
      type: String,
      // 自定义值验证
      validator (value) {
        return ['a', 'c'].includes(value)
      },
      default: 'a'
    },
    list: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      loading: false, // 上拉加载更多的 loading
      finished: false,
      offset: ''
    }
  },
  created () {
    this.onLoad()
    // eventBus.$on('addCom', item => {
    //   this.list.unshift(item)
    // })
  },
  methods: {
    async onLoad () {
      try {
        const { data: { data } } = await getCommentListApi({
          type: this.reqType,
          source: this.artid,
          offset: this.offset || '',
          limit: 10
        })
        this.$emit('getComCount', data.total_count)
        console.log(data)
        this.offset = data.last_id
        this.$emit('addList', data.results)
        // this.list.push(...data.results)
        this.loading = false
        if (!data.last_id) {
          this.finished = true
        }
      } catch (err) {
        console.log(err)
      }
    }
  },
  components: {
    comItem
  }
}
</script>

<style scoped lang="less">
.publish-wrap {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
}

.van-list {
  margin-bottom: 45px;
}
.active{
  color: #e5645f;
}
</style>
