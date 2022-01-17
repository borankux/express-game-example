<template>
  <div class="page room">
    <span>{{roomId}}</span>
    <dot :on="connected" label="Game"/>
  </div>
</template>


<script>
  import Dot from '../atoms/dot'

  export default {
    name:'room',
    components: {
      'dot':Dot,
    },
    data() {
      return {
        connected: false,
        roomId:null,
      }
    },
    mounted() {
      this.roomId = this.$route.query.id
    },
    created() {
      const socket = this.$sockets.socket('/game')

      socket.on('connect', () => {
        this.connected = true;
        let roomId = this.$route.query.id
        let token = localStorage.getItem('token')
        socket.emit('client-ready', {
          room: roomId,
          token: token
        })
      })

      socket.on('disconnect', () => {
        this.connected = false
      })

      socket.on('init-game', (initial) => {
        console.log(initial);
      })

      socket.on("game-init", (frame) => {
        console.log(frame);
      })
    }
  }
</script>

<style>

</style>
