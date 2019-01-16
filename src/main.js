import Vue from 'vue'
import App from './App.vue'
import cardSlide from './lib/index.js' 
var VueTouch = require('vue-touch')
Vue.use(VueTouch, {name: 'v-touch'})

Vue.use(cardSlide)
new Vue({
  el: '#app',
  render: h => h(App)
})
