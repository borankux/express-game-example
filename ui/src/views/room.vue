<template>
  <div class="page room">
    <span>{{roomId}}</span>
    <div>
      <span>{{token}}</span>
    </div>
    <dot :on="connected" :label="'Game:' + game_status"/>
    <div>
      <div class="user-list">

        <div class="user" v-for="(user, idx) of users" v-bind:key="idx">
          <div class="avatar"></div>
          <div class="user-name">{{user.name}}</div>
        </div>

        <div ref="box" class="nes-container box" style="width: 100%;height: 200px;">
          <div class="ball" ref="ball" id="ball" v-drag></div>
        </div>

      </div>
      <span>{{game_status}}</span>
      <div style="text-align: center;">
        <button @click="startGame" class="nes-btn" v-if="game_status<2">Start Game</button>
        <button @click="getStatus" class="nes-btn" v-if="game_status>=2">Exit Room</button>
      </div>
    </div>
  </div>
</template>


<script>
  import Dot from '../atoms/dot'
  import {GetToken} from "../token";

  export default {
    name:'room',
    components: {
      'dot':Dot,
    },
    directives: {
      drag: {
        inserted: function (el, binding, vnode) {
          el.onmousedown = e => {
            let disX = e.clientX - el.offsetLeft;
            let disY = e.clientY - el.offsetTop;
            document.onmousemove = e => {
              let left = e.clientX - disX;
              let top = e.clientY - disY;
              vnode.context.dragging(left, top);
              el.style.left = left + "px";
              el.style.top = top + "px";
            };

            document.onmouseup = e => {
              document.onmousemove = null;
              document.onmouseup = null;
            };
          }
        },
      }
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
      dragging(x, y) {
        let room = this.roomId;
        this.socket.emit('dragging', {
          x: x,
          y: y,
          room: room
        })
      },
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

      socket.on('draw', (pos) => {
        console.log(pos.x, pos.y);
        let ball = document.getElementById('ball')
        ball.style.left = pos.x + 'px'
        ball.style.top = pos.y + 'px'
      })

      socket.on('update', (frame) => {
        if(frame['users']) {
          this.users = frame['users']
        }

        if(frame['game']) {
          this.game_status = frame['game'].status
        }
      })

      socket.on('error', (error) => {
        console.log(error);
      })

      socket.on('game-started', (data) => {
        console.log(data);
        this.game_status = data.game;
      })

      this.socket = socket;
    }
  }
</script>

<style scoped>
  .user-list {
    display: flex;
    justify-content: center;
    width: 90%;
    margin: 10px auto;
    background-color: #2c3e50;
    border-radius: 10px;
    flex-wrap: wrap;
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


  .box {
    position: relative;
  }

  .ball {
    top: calc(50% - 15px);
    left: calc(50% - 15px);
    position: absolute;
    width: 30px;
    height: 30px;
    border-radius: 30px;
    background-color: yellow;
  }
</style>
