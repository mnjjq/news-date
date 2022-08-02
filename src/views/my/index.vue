<template>
  <div class="my-container">
    <!-- 未登录 -->
    <header class="not-login" v-if="!$store.state.user">
      <div class="login-or-register" @click="$router.push('/login')">
        <img src="~@/assets/img/mobile.png">
        <span>登录 / 注册</span>
      </div>
    </header>

  <!-- 已经登录 -->
    <header class="logined" v-else>
      <!-- 头像 -->
      <div class="info">
        <div class="left">
          <van-image
            class="avatar"
            width="66"
            height="66"
            :src="userInfo.photo"
            fit="cover"
            round
          />
          <!-- 昵称 -->
          <span>{{ userInfo.name }}</span>
        </div>
        <!-- <div class="right">编辑资料</div> -->
        <van-button size="mini" round class="right"
          to="/user/userinfo"
        >编辑资料</van-button>
      </div>
      <div class="count">
        <ul>
          <li class="data-item">
            <span class="data-count">{{ userInfo.art_count }}</span>
            <span class="data-text">头条</span>
          </li>
          <li class="data-item">
            <span class="data-count">{{ userInfo.fans_count }}</span>
            <span class="data-text">关注</span>
          </li>
          <li class="data-item">
            <span class="data-count">{{ userInfo.follow_count }}</span>
            <span class="data-text">粉丝</span>
          </li>
          <li class="data-item">
            <span class="data-count">{{ userInfo.like_count }}</span>
            <span class="data-text">获赞</span>
          </li>
        </ul>
      </div>
    </header>

  <!-- 收藏与历史 -->
    <van-grid class="collect-and-history" :column-num="2" clickable>
      <van-grid-item class="item">
        <template #icon>
          <i class="iconfont icon-shoucang1"></i>
        </template>
        <template #text>
          <span>收 藏</span>
        </template>
      </van-grid-item>
      <van-grid-item class="item">
        <template #icon>
          <i class="iconfont icon-lishi1"></i>
        </template>
        <template #text>
          <span>历 史</span>
        </template>
      </van-grid-item>
    </van-grid>

    <van-cell title="消息通知" is-link />
    <van-cell title="小智同学" is-link />

    <van-button type="primary" size="large" color="#fff" class="out" v-if="$store.state.user"
      @click="outFn"
    >退出登录</van-button>
  </div>
</template>

<script>
import { getUserInfoApi } from '@/api'
import { mapState } from 'vuex'
export default {
  data () {
    return {
      userInfo: {}
    }
  },
  name: 'MyIndex',
  methods: {
    outFn () {
      this.$dialog.confirm({
        title: '标题',
        message: '弹窗内容'
      })
        .then(() => {
        // on confirm
          this.$store.commit('setUser', null)
        })
        .catch(() => {
        // on cancel
        })
    }
  },
  async created () {
    if (this.user) {
      try {
        const { data: { data: res } } = await getUserInfoApi()
        console.log(res)
        this.userInfo = res
      } catch (err) {
        console.log(err)
      }
    }
  },
  computed: {
    ...mapState(['user'])
  }
}
</script>

<style scoped lang="less">
  .my-container{
    header{
      height: 183px;
      background: url(~@/assets/img/banner.png);
      background-size: cover;
      &.not-login{
        display: flex;
      align-items: center;
      justify-content: center;
      .login-or-register{
        display: flex;
        flex-direction: column;
        justify-content: center;
        img{
          width: 66px;
          height: 66px;
          margin-bottom: 8px;
        }
        span{
          font-size: 14px;
          color: #fff;
        }
      }
      }
    }
    .logined{
      .info{
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 116px;
        padding: 41px 16px 9px;
        .left{
          display: flex;
          align-items: center;
          color: #fff;
          font-size: 18px;
          .avatar{
            margin-right: 11px;
            border: 2px solid #fff;
          }
        }
        .right{
          color: #666;
        }
      }
      .count{
        height: 68px;
        padding: 19px 0 16px;
        ul{
          display: flex;
          justify-content: space-around;
          .data-item{
            display: flex;
            flex-direction: column;
            align-items: center;
            .data-count{
              font-size: 13px;
              color: #fff;
              margin-bottom: 9px;
            }
            .data-text{
              font-size: 11px;
              color: #fff;
            }
          }
        }
      }
    }

    .collect-and-history{
      margin-bottom: 5px;
      height: 71px;
      overflow: hidden;
      i.iconfont{
        font-size: 23px;
        color: #eb5253;
      }
      i.icon-lishi1{
        color: #ff9d1d;
      }
      span{
        font-size: 14px;
        color: #333;
        margin-top: 2px;
      }
      .item{
        height: 100%;
        box-sizing: border-box;
      }
    }

    .out{
      margin-top: 5px;
      color: #eb5253!important;
      font-size: 15px;
    }
  }
</style>
