import axios from 'axios'
import store from '@/store'
axios.defaults.baseURL = 'http://toutiao.itheima.net'

const refreshToken = () => axios({
  method: 'put',
  url: '/v1_0/authorizations',
  headers: {
    Authorization: `Bearer ${store.state.user.refresh_token}`
  }
})

axios.interceptors.request.use(config => {
  const { user } = store.state
  if (user && user.token) {
    config.headers.Authorization = `Bearer ${store.state.user ? store.state.user.token : ''}`
  }
  return config
}, error => Promise.reject(error))

axios.interceptors.response.use(async response => {
  console.log(response.status)
  if (response.status === 401) {
    const { data: { token } } = await refreshToken()
    response.config.headers.Authorization = token
    store.commit('refToken', token)
  }
  return response
}, error => Promise.reject(error))

export default axios
