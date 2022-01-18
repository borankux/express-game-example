<template>
  <div class="page room">
    <span>{{roomId}}</span>
    <div>
      <span>{{token}}</span>
    </div>
    <dot :on="connected" label="Game"/>
    <div>
      <div class="user-list">

        <div class="user" v-for="(user, idx) of users" v-bind:key="idx">
          <div class="avatar"></div>
          <div class="user-name">{{user.split('-')[0]}}</div>
        </div>

      </div>
      <span>{{game_status}}</span>
      <button @click="startGame">Start Game</button>
      <button @click="getStatus">Exit Room</button>
    </div>
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
        token: localStorage.getItem("game-token"),
        connected: false,
        roomId:null,
        game_status:0,
        socket:null,
        users:[]
      }
    },
    methods: {
      getStatus() {
        console.log(this.socket.rooms);
      },
      startGame() {
        let roomId = this.$route.query.id
        let token = localStorage.getItem('game-token')
        this.socket.emit('start-game', {
          room: roomId,
          token: token
        })
      }
    },
    created() {
      this.roomId = this.$route.query.id
      const socket = this.$sockets.socket('/game')

      socket.on('connect', () => {
        this.connected = true;
        let roomId = this.$route.query.id
        let token = localStorage.getItem('game-token')
        socket.emit('client-ready', {
          room: roomId,
          token: token
        })
      })

      socket.on('disconnect', () => {
        this.connected = false
      })

      socket.on('init-game', (initial) => {
        let room = initial.room
        console.log("i am joining room:",room);
        console.log(socket);
      })

      socket.on('update', (frame) => {
        if(frame['users']) {
          this.users = frame['users']
        }
      })

      this.socket = socket;
    }
  }
</script>

<style scoped>
  .user-list {
    display: flex;
    justify-content: center;
    width: 600px;
    margin: 10px auto;
    background-color: #2c3e50;
    border-radius: 10px;
  }

  .user {
    width: 100px;
    height: 100px;
  }

  .user .avatar {
    height: 60px;
    width: 60px;
    background-color: green;
    border-radius: 60px;
    border: 6px solid white;
    box-sizing: border-box;
    margin: 5px auto;
  }

  .user .user-name {
    text-align: center;
    color: white;
  }
</style>
