<template>
  <div id="app">
    <dot :on="connected" label="Game Server"></dot>
    <router-view/>
  </div>
</template>

<script>
import Dot from "./atoms/dot";
export default {
  name: 'App',
  components: {Dot},
  data() {
    return {
      connected: false
    }
  },
  created() {
    let socket = this.$sockets.socket('/')
    socket.on('connect', () => {
      this.connected = true
    })

    socket.on('disconnect', () => {
      this.connected = false
    })
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
