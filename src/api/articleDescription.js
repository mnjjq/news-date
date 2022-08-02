import request from '@/utils/request'
import store from '@/store'

export const getArticleDeciption = id => request({
  url: `/v1_0/articles/${id}`,
  headers: {
    Authorization: `Bearer ${store.state.user ? store.state.user.token : ''}`
  }
})

export const followUser = id => request({
  method: 'post',
  url: '/v1_0/user/followings',
  headers: {
    Authorization: `Bearer ${store.state.user ? store.state.user.token : ''}`
  },
  data: {
    target: id
  }
})

export const cancleFollowUser = id => request({
  method: 'DELETE',
  url: `/v1_0/user/followings/${id}`,
  headers: {
    Authorization: `Bearer ${store.state.user ? store.state.user.token : ''}`
  }
})
