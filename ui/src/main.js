import Vue from 'vue'
import App from './App'
import router from './router'
import "nes.css/css/nes.min.css";
import "nes.icons/css/nes-icons.min.css"

import "./assets/css/font.css";

Vue.config.productionTip = false
import { Manager } from 'socket.io-client'
const manager = new Manager("http://localhost:3000")
Vue.prototype.$sockets = manager;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
