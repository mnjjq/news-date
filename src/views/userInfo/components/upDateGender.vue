<template>
  <div class="update-gender">
    <van-picker
      title="标题"
      show-toolbar
      :columns="columns"
      @confirm="onConfirm"
      @cancel="onCancel"
      @change="onChange"
      :default-index="value"
    />
  </div>
</template>

<script>
import { updateUserDesApi } from '@/api'
export default {
  name: 'UpDateGender',
  props: {
    value: {
      type: [Number, String],
      required: true
    }
  },
  data () {
    return {
      columns: ['男', '女']
    }
  },
  methods: {
    async onConfirm (value, index) {
      this.$toast.loading({
        message: '保存中',
        duration: 0,
        forbidClick: true
      })
      try {
        await updateUserDesApi({
          gender: index
        })
        this.$emit('changeGender', index)
        this.$emit('close')
        this.$toast.success('保存成功！')
      } catch (err) {
        console.log(err)
        this.$toast('保存失败！')
      }
    },
    onChange (picker, value, index) {
    },
    onCancel () {
      this.$emit('close')
    }
  }
}

</script>

<style scoped lang="less">

</style>
