import request from '@/utils/request'
import store from '@/store'
export const getUser = (data) => request({
  method: 'POST',
  url: '/v1_0/authorizations',
  data
})

export const getCode = (mobile) => request({
  // mobile前面一定不要加冒号
  url: `/v1_0/sms/codes/${mobile}`
})

export const getUserInfo = () => request({
  url: '/v1_0/user',
  headers: {
    Authorization: `Bearer ${store.state.user.token}`
  }
})

// 获取用户频道
export const getChannels = () => request({
  url: '/v1_0/user/channels',
  headers: {
    Authorization: store.state.user ? `Bearer ${store.state.user.token}` : ''
  }
})

// 获取用户个人资料
export const getUserDes = () => request({
  url: '/v1_0/user/profile'
})

// 修改用户资料
export const updateUserDes = data => request({
  method: 'PATCH',
  url: '/v1_0/user/profile',
  data
})

export const updateAvatar = data => request({
  url: '/v1_0/user/photo',
  method: 'PATCH',
  data
})
