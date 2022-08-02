import request from '@/utils/request'
import store from '@/store'

export const getTotalChannelList = params => request({
  url: '/v1_0/articles',
  headers: {
    Authorization: `Bearer ${store.state.user ? store.state.user.token : ''}`
  },
  params
})

export const getAllChannel = () => request({
  url: '/v1_0/channels'
})

export const delChannel = target => request({
  method: 'DELETE',
  url: `/v1_0/user/channels/${target}`,
  headers: {
    Authorization: `Bearer ${store.state.user ? store.state.user.token : ''}`
  }
})

export const addChannel = channel => request({
  method: 'PATCH',
  url: '/v1_0/user/channels',
  headers: {
    Authorization: `Bearer ${store.state.user ? store.state.user.token : ''}`
  },
  data: {
    channels: [channel]
  }
})
