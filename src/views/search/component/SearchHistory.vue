<template>
  <div class="search-history-container">
    <van-cell title="搜索历史"
      center
      :border="false"
    >
      <div v-if="isShow">
        <span @click="$store.commit('history/clearHistory')">全部删除</span>&nbsp;&nbsp;<span @click="isShow = false">完成</span>
      </div>
        <van-icon v-else name="delete-o" @click="isShow = true"/>
    </van-cell>

    <van-cell :title="item" center v-for="(item, ind) in historyList" :key="ind"
      @click="$emit('search',item)"
    >
      <template #right-icon>
        <van-icon name="close" v-if="isShow" @click="$store.commit('history/deleteHistory',ind)"/>
      </template>
    </van-cell>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'SearchHistory',
  data () {
    return {
      isShow: false
    }
  },
  computed: {
    ...mapGetters(['historyList'])
  },
  methods: {
  }
}
</script>

<style scoped lang="less">

</style>
