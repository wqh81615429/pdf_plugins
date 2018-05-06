import Vue from 'vue'
import App from './App.vue'
import imgtopdf from './lib/index'

Vue.use(imgtopdf)
new Vue({
  el: '#app',
  render: h => h(App)
})
