<template>
  <div class="login-container">
    <!-- 导航 -->
    <van-nav-bar class="my-nav-bar"
      title="登录"
      left-arrow
      @click-left="onClickLeft"
    />
    <!-- 登录 -->
    <van-form @submit="onSubmit" ref="loginForm">

        <!-- 用户名 -->
      <van-field
        type="number"
        v-model="user.mobile"
        name="mobile"
        placeholder="请输入手机号"
        :rules="this.userValidate.mobile"
      >
            <!-- <i slot="left-icon" class="iconfont icon-shouji"></i> -->
            <template #left-icon>
                <i slot="left-icon" class="iconfont icon-shouji"></i>
            </template>
      </van-field>

    <!-- 密码 -->
      <van-field
        type="number"
        v-model="user.code"
        name="code"
        placeholder="请输入验证码"
        :rules="this.userValidate.code"
      >
            <template #left-icon>
                <i slot="left-icon" class="iconfont icon-yanzhengma1"></i>
            </template>
            <template #button>
              <van-button round size="small" type="primary" native-type="button"
                  @click="validateFn"
                  v-if="isShow"
                >发送验证码</van-button>
                <van-count-down :time="6000 * 10" format=" ss 秒" v-else @finish="isShow = true" />
            </template>
        </van-field>

      <!-- 按钮 -->
      <div style="margin: 16px;">
        <van-button round block type="info" native-type="submit">
            登录
        </van-button>
      </div>
    </van-form>

  </div>
</template>

<script>
import { getUserApi, getCodeApi } from '@/api'
export default {
  name: 'LoginIndex',
  data () {
    return {
      user: {
        mobile: '',
        code: ''
      },
      userValidate: {
        mobile: [
          { required: true, message: '请填写手机号' },
          { pattern: /^1[3|5|7|8]\d{9}$/, message: '手机号格式错误' }
        ],
        code: [
          { required: true, message: '请填验证码' },
          { pattern: /^\d{6}$/, message: '验证码格式错误' }
        ]
      },
      isShow: true
    }
  },
  methods: {
    async onSubmit () {
      const user = this.user
      this.$toast.loading({ // t为小写不然会报错
        message: '登录中...',
        forbidClick: true,
        duration: 0
      })
      //   发送请求
      try {
        const { data: { data: res } } = await getUserApi(user)
        this.$toast.success('登录成功！')
        this.$router.back()
        this.$store.commit('setUser', res)
      } catch (err) {
        if (err.request.status === 400) {
          // console.log('手机号或验证码不正确')
          this.$toast.fail('手机号或验证码不正确')
        } else {
          this.$toast.fail('登录失败,请稍后重试')
          // console.log('登录失败,请稍后重试', err)
        }
      }
    },
    async validateFn () {
      try {
        await this.$refs.loginForm.validate('mobile')
        this.isShow = false
      } catch (err) {
        return console.log(err, '验证失败')
      }
      // 发送验证码
      try {
        const res = await getCodeApi(this.user.mobile)
        console.log(res, '成功')
      } catch (err) {
        if (err.request.status === 429) {
          this.$toast('发送太频繁了稍后重试')
        } else {
          this.$toast('发送失败稍后重试')
        }
      }
    },

    onClickLeft () {
      this.$router.back()
    }
  }
}
</script>

<style scoped lang="less">
    .login-container{
        .iconfont{
            font-size: 16px;
        }
        .van-button--small{
            width: 76px;
            height: 23px;

            background-color: #ededed;
            border: none;
            color: #666;
            font-size: 11px;
        }
        .van-count-down{
          text-align: center;
        }
    }
</style>
