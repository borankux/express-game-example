<template>
  <div class="page home">
    <div class="greetings" v-if="!showForm">
      <span class="nes-text is-success">Ciao {{user.name}}</span>
      <div style="margin: 20px auto">
        <button class="nes-btn is-success">Enter the Game</button>
      </div>
    </div>
    <div class="form" v-if="showForm" style="margin: 20px auto;padding: 10px;">
      <div class="nes-container with-title is-centered">
        <p class="title">Notice!</p>
        <p>
          You need a name to play the game
        </p>
        <p>:)</p>
      </div>
      <div class="nes-field npt">
        <label for="name_field">Your name</label>
        <input type="text" id="name_field" class="nes-input" v-model="name">
      </div>
      <button @click="saveName" class="nes-btn">Save</button>
    </div>
  </div>
</template>

<script>
import { CheckLocalToken } from "../token";
import {GetUser, SaveUserName} from "../api/user";

  export default {
    name:'home',
    data() {
      return {
        showForm: false,
        name:'',
        user: {
          name:''
        }
      }
    },
    methods: {
      saveName() {
        let name = this.name;
        SaveUserName(name).then(res => {
          this.user = res.data;
          this.showForm = false;
        })
      }
    },
    created() {
      CheckLocalToken((token) => {
        this.token = token
      })

      GetUser().then((res) => {
        let data = res.data;
        this.user = data;
        if(!data['name']) {
          this.showForm = true
        }
      })
    }
  }
</script>

<style scoped>
  .npt {
    width: 80%;
    margin: 10px auto;
  }

  .greetings {
    margin-top: 20px;
  }
</style>

