<template>
  <div class="userInfo-container">
    <van-nav-bar
      class="nav"
      title="个人信息"
      left-arrow
      @click-left="$router.back()"
      fixed=""
    />
    <input type="file" ref="file" hidden @change="onChange"/>
    <!-- 个人信息 -->
     <van-cell title="头像" is-link arrow-direction center="" >
        <van-image
          width="35px"
          height="35px"
          fit="cover"
          round=""
          :src="user.photo"
          @click="onUpAvatar"
        />
     </van-cell>
     <!-- 个人信息 -->

     <!-- 昵称 -->
    <van-cell title="昵称" is-link arrow-direction :value="user.name"
      @click="updateNickShow = true"
     />
     <!-- 昵称 -->

    <!-- 性别 -->
      <van-cell title="性别" is-link arrow-direction :value="user.gender ? '女' : '男'"
        @click="updateGenderShow = true"
      />
     <!-- 性别 -->

     <!-- 生日 -->
      <van-cell title="生日" is-link arrow-direction :value="user.birthday"
        @click="updateBirthShow = true"
      />
     <!-- 生日 -->

      <!-- 昵称弹出 -->
      <van-popup v-model="updateNickShow" position="bottom" :style="{ height: '100%' }"
        class="update-nick"
      >
        <UpdateNikeName @close="updateNickShow = false"
          v-if="updateNickShow"
          v-model="user.name"
          @updateNickName="user.name = $event"
        />
      </van-popup>
    <!-- 昵称弹出 -->

    <!-- 修改性别弹出 -->
      <van-popup v-model="updateGenderShow" position="bottom">
        <UpDateGender
          v-if="updateGenderShow"
          v-model="user.gender"
          @close="updateGenderShow = false"
          @changeGender="user.gender = $event"
         />
      </van-popup>
    <!-- 修改性别弹出 -->

    <!-- 修改生日弹出 -->
      <van-popup v-model="updateBirthShow" position="bottom">
        <UpdateBirth
          v-if="updateBirthShow"
          v-model="user.birthday"
          @close="updateBirthShow = false"
          @changeBirth="user.birthday=$event"
         />
      </van-popup>
    <!-- 修改生日弹出 -->

    <!-- 修改头像弹出 -->
      <van-popup v-model="updateAvatarShow" position="bottom" :style="{ height: '100%' }" class="avatar">
        <UpdateAvatar
          v-if="updateAvatarShow"
          :img="img"
          @close="updateAvatarShow = false"
          @changeAvatar="user.photo = $event"
         />
      </van-popup>
    <!-- 修改生日弹出 -->
  </div>
</template>

<script>
import UpdateAvatar from './components/updateAvatar'
import UpdateNikeName from './components/updateNikeName'
import UpDateGender from './components/upDateGender'
import UpdateBirth from './components/updateBirth'
import { getUserDesApi } from '@/api'
export default {
  name: 'UserInfo',
  methods: {
    onUpAvatar () {
      this.$refs.file.click()
    },
    onChange () {
      this.updateAvatarShow = true
      this.img = URL.createObjectURL(this.$refs.file.files[0])
      this.$refs.file.value = ''
    }
  },
  data () {
    return {
      user: {},
      updateNickShow: false,
      updateGenderShow: false,
      updateBirthShow: false,
      updateAvatarShow: false,
      img: null
    }
  },
  async created () {
    try {
      const { data: { data } } = await getUserDesApi()
      this.user = data
      console.log(data)
    } catch (err) {
      console.log(err)
      this.$toast('获取用户资料失败，请刷新页面重试')
    }
  },
  components: {
    UpdateNikeName,
    UpDateGender,
    UpdateBirth,
    UpdateAvatar
  }
}
</script>

<style scoped lang="less">
  .userInfo-container{
    padding-top: 46px;
    .nav{
      /deep/ .van-nav-bar__title{
        color: #fff;
      }
      /deep/ .van-icon {
        color: #fff;
      }
      background-color: #3296fa;;
    }
    .van-cell__value {
      display: flex;
      justify-content: right;
    }
    .update-nick{
      background-color: #f5f7f9;
    }
    .avatar{
      background-color: black;
    }
  }
</style>
