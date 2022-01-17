<template>
  <div class="page home">
    <dot :on="connected" label="Server"/>
    <h3>Home Page</h3>
    <span>{{msg}}</span> <br>
    <span>{{tick.time}}</span>
    <div class="links">
        <router-link to="/game">Game</router-link>
    </div>
  </div>
</template>

<script>
  import Dot from '../atoms/dot'

  export default {
    name:'home',
    components: {
      'dot': Dot,
    },
    data() {
      return {
        connected:false,
        socket:null,
        msg:'welcome to home page',
        tick: {
          time:'00:00:00'
        }
      }
    },
    mounted() {
      const socket = this.$sockets.socket('/admin')
      socket.on('connect', () => {
        this.connected = true;
      })

      socket.on('tick', (data) => {
        this.tick = data;
      })

      socket.on('disconnect', () =>{
        this.connected = false;
      })
      this.socket = socket
    }
  }
</script>

<style>

</style>

