<template>
  <div class="edit-channel-container">
    <!-- 我的频道区域 -->
    <van-cell center :border="false">
      <template #title>
        <span class="mychannel">我的频道</span>
      </template>
      <template >
        <van-button type="danger" size="mini" round="" class="editBtn" @click="isShow = !isShow">{{isShow ? '完成' : '编辑'}}</van-button>
      </template>
    </van-cell>

    <!-- 频道区域 -->
      <van-grid class="my-channle-list" :gutter="12" round>
        <van-grid-item class="grid-item active"
          v-for="(channel, ind) in myChannel" :key="channel.id"
          @click="toggleOrDeletChannelFn(ind,channel)"
        >
        <span slot="text" :class="{text:true, active: ind === editActive}">{{channel.name}}</span>
        <template #icon>
          <van-icon name="close" size="12px" v-show="isShow && !fixedChannel.includes(channel.id)"/>
        </template>
        </van-grid-item>
      </van-grid>
    <!-- 我的频道区域 -->

    <!-- 推荐频道 -->

    <!-- 推荐频道 -->
    <van-cell center :border="false" class="recommond-channel">
      <template #title >
        <span>推荐频道</span>
      </template>
    </van-cell>

    <!-- 频道区域 -->
      <van-grid class="my-channle-list" :gutter="12" round direction="horizontal" icon-size="12px">
        <van-grid-item  :text="allChannel.name" class="grid-item" icon="plus"
          v-for="allChannel in filterChannel" :key="allChannel.id"
          @click="addChannel(allChannel)"
        />
      </van-grid>
  </div>
</template>

<script>
import { getAllChannelApi } from '@/api'
export default {
  name: 'EditChannle',
  data () {
    return {
      allChannels: [],
      isShow: false,
      fixedChannel: [0]
    }
  },
  props: {
    myChannel: {
      type: Array,
      required: true
    },
    editActive: {
      type: Number,
      required: true
    }
  },
  created () {
    this.getAllChannel()
  },
  methods: {
    async getAllChannel () {
      const { data: { data: { channels: res } } } = await getAllChannelApi()
      console.log(res)
      this.allChannels = res
    },
    toggleOrDeletChannelFn (index, channel) {
      if (this.isShow) {
        if (this.fixedChannel.includes(index)) {
          return
        }
        this.$emit('delChannel', index, channel)
      } else {
        this.$emit('toggle', index)
        console.log(index)
      }
    },
    addChannel (allChannel) {
      if (this.isShow) {
        this.$emit('onAddchannel', allChannel)
      }
    }
  },
  computed: {
    filterChannel () {
      return this.allChannels.filter(allChannel => !this.myChannel.find(Channel => allChannel.id === Channel.id))
    }
  }
}
</script>

<style scoped lang="less">
  .edit-channel-container{
    padding-top: 43px;
    .mychannel{
      font-size: 16px;
      color: #333;
    }
    .editBtn{
      font-size: 13px;
      padding: 6px 13px;
      color: #f85a5a;
      background-color: #fff;
      border: 1px solid #f85a5a;
    }
    .my-channle-list{
      margin-top: 10px;
      .grid-item{
        width: 80px;
        height: 43px;
        white-space: nowrap;
        /deep/ .van-grid-item__content{
          background-color: #f4f5f6;
          .van-grid-item__text , .text{
            font-size: 14px;
            color: #222222;
            &.active{
              color: #f85a5a;
            }
          }
          .van-grid-item__icon-wrapper {
           position: unset;
           .van-icon-close{
            position: absolute;
            right: -3px;
            top: -3px;
           }
          }
        }
      }
    }
    .recommond-channel{
      margin-top: 30px;
    }
  }
  .my-channle-list{
    /deep/ .van-grid-item__text{
       margin-left: 2px!important;
  }
  }
</style>
