import request from '@/utils/request'

export const getRecommend = params => request({
  url: '/v1_0/suggestion',
  params
})

export const getSearchResults = params => request({
  url: '/v1_0/search',
  params
})
