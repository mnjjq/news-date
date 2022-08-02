<template>
  <div class="layout-container">
    <!-- 路由出口 -->
    <router-view></router-view>
    <!-- 导航栏 -->
    <van-tabbar v-model="active" route >
        <van-tabbar-item replace to="/home" >
            <template #icon>
                <i class="iconfont icon-shouye2"></i>
            </template>
            <span>首页</span>
        </van-tabbar-item>

        <van-tabbar-item replace to="/question" >
            <template #icon>
                <i class="iconfont icon-wenda1"></i>
            </template>
            <span>问答</span>
        </van-tabbar-item>

        <!-- <van-tabbar-item replace to="vedio" >
            <template #icon>
                <i class="iconfont icon-shipin1"></i>
            </template>
            <span>视频</span>
        </van-tabbar-item> -->
        <van-tabbar-item replace to="/vedio" >
            <template #icon>
                <i class="iconfont icon-shipin1"></i>
            </template>
            <span>视频</span>
        </van-tabbar-item>

        <van-tabbar-item replace to="/my" >
            <template #icon>
                <i class="iconfont icon-wode1"></i>
            </template>
            <span>{{ $store.state.user ? '我的' : '未登录' }}</span>
        </van-tabbar-item>

    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: 'layoutIndex',
  data () {
    return {
      active: 0
    }
  }
}
</script>

<style scoped lang="less">
  .layout-container{
    i.iconfont{
        font-size: 20px;
    }
    span{
        font-size: 10px;
    }
  }
</style>
