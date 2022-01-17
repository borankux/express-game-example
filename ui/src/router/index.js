import Vue from 'vue'
import Router from 'vue-router'
import Home from '../views/home'
import Game from '../views/game'
import Room from '../views/room'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: Home,
      name:'Home'
    },
    {
      path:'/game',
      component: Game,
      name:'Game'
    },
    {
      path:'/room',
      component: Room,
      name:'Room'
    }
  ]
})
