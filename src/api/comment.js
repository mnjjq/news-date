import request from '@/utils/request'
import store from '@/store'

export const collectArticle = target => request({
  url: '/v1_0/article/collections',
  method: 'post',
  headers: {
    Authorization: `Bearer ${store.state.user ? store.state.user.token : ''}`
  },
  data: {
    target
  }
})

export const cancleCollectArticle = target => request({
  url: `/v1_0/article/collections/${target}`,
  method: 'DELETE',
  headers: {
    Authorization: `Bearer ${store.state.user ? store.state.user.token : ''}`
  }
})

export const likeArticle = target => request({
  url: '/v1_0/article/likings',
  method: 'POST',
  headers: {
    Authorization: `Bearer ${store.state.user ? store.state.user.token : ''}`
  },
  data: {
    target
  }
})

export const dislikeArticle = target => request({
  url: `/v1_0/article/likings/${target}`,
  method: 'DELETE',
  headers: {
    Authorization: `Bearer ${store.state.user ? store.state.user.token : ''}`
  }
})

// 评论列表
export const getCommentList = params => request({
  url: '/v1_0/comments',
  params
})

// 对评论或评论回复点赞
export const getCommentLikes = target => request({
  method: 'post',
  url: '/v1_0/comment/likings',
  data: {
    target
  }
})

// 取消对评论或评论回复点赞
export const cancleCommentLikes = target => request({
  method: 'DELETE',
  url: `/v1_0/comment/likings/${target}`
})

// 发布评论或者回复
export const pubCom = data => request({
  method: 'POST',
  url: '/v1_0/comments',
  data
})
