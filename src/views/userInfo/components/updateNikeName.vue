<template>
  <div class="update-nickname">
    <van-nav-bar
      title="设置昵称"
      left-arrow
      left-text="取消"
      right-text="完成"
      @click-left="$emit('close')"
      @click-right="onUpdateNick"
    />
    <div class="field-wrap">
      <van-field
        v-model="message"
        rows="2"
        autosize
        type="textarea"
        maxlength="11"
        placeholder="请输入昵称"
        show-word-limit
      />
    </div>
  </div>
</template>

<script>
import { updateUserDesApi } from '@/api'
export default {
  name: 'UpdateNikeName',
  props: {
    value: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      message: this.value
    }
  },
  methods: {
    async onUpdateNick () {
      this.$toast.loading({
        message: '修改中',
        duration: 0,
        forbidClick: true
      })
      try {
        if (this.message.trim().length === 0) return this.$toast('昵称不能为空！')
        await updateUserDesApi({
          name: this.message
        })
        this.$emit('close')
        this.$emit('updateNickName', this.message)
        this.$toast.success('修改昵称成功！')
      } catch (err) {
        console.log(err)
        this.$toast('修改失败')
      }
    }
  }
}
</script>

<style lang="less" scoped>
  .update-nickname{
    .field-wrap{
      padding: 10px;
    }
  }
</style>
