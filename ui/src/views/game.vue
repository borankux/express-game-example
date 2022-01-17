<template>
  <div class="page game">
    <span>{{token}}</span>
    <div class="options">
      <button @click="createRoom">Create Room</button>
      <button @click="enterRoom">Enter Room</button>
    </div>
  </div>
</template>

<script>
  import { RefreshToken } from "../api/auth";
  import { CreateRoom } from "../api/room";

  export default {
    name: 'game',
    data () {
      return {
        connected: true,
        token: localStorage.getItem('game-token')
      }
    },
    methods: {
      initPage() {
        let token = localStorage.getItem("game-token")
        RefreshToken(token).then((res) => {
          console.log(res);
          let newToken = res.data.token
          localStorage.setItem("game-token", newToken)
        })
      },
      enterRoom() {
        let roomId = prompt("Please enter the room id ")
        if (!roomId) {
          console.log("user canceled")
          return
        }
        this.$router.push({
          path:'/room?id='+roomId
        })
      },
      createRoom() {
        CreateRoom().then((res) => {
          console.log(res);
          let roomId = res.data.room;
          this.$router.push({
            path:'/room?id=' + roomId
          })
        })
      }

    },
    created() {
      this.initPage();
    }
  }
</script>

<style>

</style>
