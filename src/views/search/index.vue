<template>
  <div class="search-container">
    <form action="/" class="search">
      <van-search
        :clearable="false"
        v-model="value"
        show-action
        placeholder="请输入搜索关键词"
        @search="onSearch"
        @cancel="onCancel"
        shape="round"
        background="#3296fa"
        @focus="resultIsShow = false"
      >
        <van-icon name="clear" @click="clearFn" slot="right-icon" v-if="value" />
      </van-search>
    </form>
      <SearchResults
        v-if="resultIsShow"
        :text="value"
      />
      <SearchRecommend
        v-else-if="value"
        :text="value"
        @switch="onSearch"
      />
      <SearchHistory
        @search="onSearch"
        v-else
      />
  </div>
</template>

<script>
import SearchHistory from './component/SearchHistory'
import SearchRecommend from './component/SearchRecommend'
import SearchResults from './component/SearchResults'
export default {
  name: 'MySearch',
  data () {
    return {
      value: '',
      resultIsShow: false
    }
  },
  methods: {
    onSearch (val) {
      this.value = val
      this.resultIsShow = true
      console.log(val)
      this.$store.commit('history/getHistoryList', val)
    },
    onCancel () {
      this.$router.back()
    },
    clearFn () {
      this.value = ''
    }
  },
  components: {
    SearchHistory,
    SearchRecommend,
    SearchResults
  },
  computed: {
  }
}
</script>

<style scoped lang="less">
  .search-container{
    padding-top: 54px;
    .search{
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      z-index: 1;
    }
    .van-search__action{
      color: #fff;
    }
    .van-search__content{
      background-color: #f4f5f6;
    }
  }
</style>
