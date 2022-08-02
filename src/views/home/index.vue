<template>
  <div class="home-container">
    <!-- 头部搜索 -->
    <van-nav-bar class="my-nav-bar" fixed>
      <template #title>
        <van-button
        type="info"
        round
        class="my-search"
        icon="search"
        size="normal"
        @click="$router.push('/mysearch')"
        >搜索</van-button>
      </template>
    </van-nav-bar>

    <!-- tab栏 -->
    <van-tabs v-model="active" animated swipeable line-width="16" title-active-color="#333" class="channel-tabs" title-inactive-color="#777" >
      <template #nav-right >
        <i class="iconfont icon-gengduo more" @click="editIsShow = true"></i>
        <div class="placeholde"></div>
      </template>
      <van-tab
      v-for="el in channelList"
      :key="el.id"
      :title="el.name"
      >
      <!-- 文章组件 -->
      <AticleList :channelObj = el  @holde="active = $event"></AticleList>
      </van-tab>
    </van-tabs>
    <!-- 弹出层 -->
    <van-popup v-model="editIsShow" round position="bottom" :style="{ height: '100%' }"
    closeable close-icon-position="top-left" >
      <EditChannle :myChannel="channelList" :editActive="active" @toggle="toggleFn"
        @delChannel="delChannelFn" @onAddchannel="addchannelFn"
      />
    </van-popup>
  </div>
</template>

<script>
import { getChannelsApi, delChannelApi, addChannelApi } from '@/api'
import AticleList from '@/components/article/ArticleList'
import EditChannle from '@/components/editchannel'
import { mapState } from 'vuex'
import { setItem, getItem } from '@/utils/localstorage'
export default {
  name: 'HomeIndex',
  destroyed () {
    console.log('desx')
  },
  data () {
    return {
      active: 0,
      channelList: [],
      editIsShow: false
    }
  },
  async created () {
    try {
      if (!this.user && getItem('localChannel')) {
        this.channelList = getItem('localChannel')
        return
      }
      const { data: { data: { channels } } } = await getChannelsApi()
      this.channelList = channels
    } catch (err) {
      this.$toast('加载频道失败')
    }
  },
  methods: {
    showPopup () {
      this.show = true
    },
    toggleFn (popIndex) {
      this.active = popIndex
      this.editIsShow = false
    },
    async delChannelFn (index, channel) {
      this.channelList.splice(index, 1)
      this.active = this.active >= index ? this.active - 1 : this.active
      if (!this.user) {
        setItem('localChannel', this.channelList)
      } else {
        try {
          await delChannelApi(channel.id)
        } catch (err) {
          console.log(err + '删除请求发送失败')
        }
      }
    },
    async addchannelFn (channel) {
      this.channelList.push(channel)
      if (!this.user) {
        setItem('localChannel', this.channelList)
      } else {
        try {
          await addChannelApi({
            id: channel.id,
            seq: this.channelList.length
          })
        } catch (err) {
          console.log(err)
        }
      }
    }
  },
  components: {
    AticleList,
    EditChannle
  },
  computed: {
    ...mapState(['user'])
  }
}
</script>

<style scoped lang="less">
  .home-container{
    padding-bottom: 50px;
    padding-top: 90px;
    /deep/ .van-tabs__wrap {
      overflow: hidden;
      position: fixed;
      top: 46px;
      left: 0;
      z-index: 1;
      /* height: 41px; */
      right: 0;
    }
    .my-search{
      width: 278px;
      height: 32px;
      background-color: #5babfb;
      border: none;
      .van-icon{
        font-size: 16px;
      }
    }
    /deep/ .van-nav-bar__title {
    max-width: unset;
    }

    /deep/ .channel-tabs{
      .placeholde{
        flex-shrink: 0;
        width: 30px;
        height: 44px;
      }
      .van-tab{
        border-right: 1px solid #edeff3;
        min-width: 100px;
        font-size: 15px;
      }
      .van-tabs__line{
        background-color: #3296fa;
        bottom: 20px;
      }
    }
    /deep/ .van-tabs__nav--line.van-tabs__nav--complete{
      padding-right: 0;
    }
    .more{
      position: fixed;
      right: 0;
      font-size: 17px;
      width: 33px;
      height: 44px;
      line-height: 44px;
      text-align: center;
      color: #333;
      font-weight: 700;
      background-color: #fff;
      opacity: 0.9;
      &::after{
        content: '';
        position: absolute;
        left: 0;
        width: 1px;
        height: 100%;
        background-color: #c8c8c8;
        background: linear-gradient(#fff, #c8c8c8, #fff);
      }
    }
  }
</style>
