<template>
    <van-cell class="aticle-item" :to="{
      name: 'ArticleIndex',
      params: {
        articleId: article.art_id
      }
    }">
        <template #title>
            <div class="title van-multi-ellipsis--l2">{{article.title}}</div>
        </template>
        <template #label>
            <div class="imgcotainer"
                v-if="article.cover.type === 3"
            >
                <div class="img" v-for="(img, ind) in article.cover.images" :key="ind">
                    <van-image
                    class="cover-item"
                        fit="cover"
                        :src="img"
                    />
                </div>
            </div>
            <div class="text">
                <span>{{article.aut_name}}</span>
                <span>{{article.comm_count}}</span>
                <span>{{article.pubdate | forMateDate}}</span>
            </div>
        </template>
        <template #default v-if="article.cover.type === 1">
                <van-image
                class="singleImg"
                :src="article.cover.images[0]"
                fit="cover"
            />
        </template>
    </van-cell>
</template>

<script>
export default {
  name: 'ArticleItem',
  props: {
    article: {
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped lang="less">
  .aticle-item {
    .imgcotainer{
      display: flex;
      padding: 6px 0 15px;
      .img{
        flex: 1;
        height: 73px;
        &:not(:last-child){
          margin-right: 2px;
        }
        .cover-item{
          width: 100%;
          height: 73px;
        }
      }
    }
    .text span{
      font-size: 11px;
      color: #b4b4b4;
      margin-right: 13px;
    }
    .title{
      font-size: 16px;
      color: #3a3a3a;
    }
    .van-cell__value{
      flex: unset;
      width: 116px;
      height: 73px;
      padding-left: 13px;
      .singleImg{
         width: 116px;
         height: 73px;
      }
    }
  }

</style>
