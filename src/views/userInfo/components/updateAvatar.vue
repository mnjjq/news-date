<template>
  <div class="avatar">
    <img :src="img" alt="" ref="img">
    <footer>
      <span @click="$emit('close')">取消</span>
      <span @click="onConfirm">完成</span>
    </footer>
  </div>
</template>

<script>
import { updateAvatarApi } from '@/api'
import 'cropperjs/dist/cropper.css'
import Cropper from 'cropperjs'
export default {
  name: 'UpdateAvatar',
  props: {
    img: {
      type: [String, Object],
      required: true
    }
  },
  data () {
    return {
      cropper: null
    }
  },
  mounted () {
    const image = this.$refs.img
    this.cropper = new Cropper(image, {
      viewMode: 1,
      dragMode: 'move',
      initialAspectRatio: 1,
      autoCropArea: 1,
      cropBoxMovable: false,
      cropBoxResizable: false,
      background: false
    })
  },
  methods: {
    onConfirm () {
      const formData = new FormData()
      this.cropper.getCroppedCanvas().toBlob(async blob => {
        formData.append('photo', blob)
        try {
          this.$toast.loading({
            message: '保存中',
            duration: 0,
            forbidClick: true
          })
          const { data } = await updateAvatarApi(formData)
          this.$emit('changeAvatar', data.data.photo)
          this.$emit('close')
          this.$toast.success('保存成功！')
        } catch (err) {
          console.log(err)
          this.$toast.fail('保存失败')
        }
      })
    }
  }
}
</script>

<style scoped lang="less">
.avatar{
  height: 100%;
  img{
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
    max-width: 100%;
  }
  footer{
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    span{
      width: 45px;
      height: 45px;
      color: #ffffff;
      font-size: 15px;
      line-height: 45px;
      text-align: center;
    }
  }
}
</style>
