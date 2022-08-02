<template>
  <div class="update-birth">
    <van-datetime-picker
      v-model="currentDate"
      type="date"
      title="选择年月日"
      :min-date="minDate"
      :max-date="maxDate"
      @cancel="$emit('close')"
      @confirm="onConfirm"
    />
  </div>
</template>

<script>
import dayjs from 'dayjs'
import { updateUserDesApi } from '@/api'
export default {
  name: 'UpdateBirth',
  props: {
    value: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      minDate: new Date(1970, 0, 1),
      maxDate: new Date(),
      currentDate: new Date(this.value)
    }
  },
  methods: {
    async onConfirm () {
      this.$toast.loading({
        message: '保存中',
        duration: 0,
        forbidClick: true
      })
      try {
        const currentDate = dayjs(this.currentDate).format('YYYY-MM-DD')
        await updateUserDesApi({
          birthday: currentDate
        })
        this.$emit('changeBirth', currentDate)
        this.$emit('close')
        this.$toast.success('保存成功！')
      } catch (err) {
        console.log(err)
        this.$toast.fail('保存失败')
      }
    }
  }
}
</script>

<style scoped lang="less">

</style>
