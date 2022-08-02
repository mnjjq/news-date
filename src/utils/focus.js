import Vue from 'vue'

Vue.directive('focus', {
  inserted: function (el) {
    el.children[0].children[0].children[0].focus()
  }
})
