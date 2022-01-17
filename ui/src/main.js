import Vue from 'vue'
import App from './App'
import router from './router'

Vue.config.productionTip = false
import {Manager} from 'socket.io-client'
const manager = new Manager("http://localhost:3000")
Vue.prototype.$sockets = manager;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
