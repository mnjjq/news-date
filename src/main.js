import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vant from 'vant'
import 'amfe-flexible'
import 'vant/lib/index.css'
import '@/style/index.less'
import '@/utils/formateDate'
import '@/utils/focus'
Vue.config.productionTip = false
Vue.prototype.$eventBus = new Vue()
Vue.use(Vant)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
