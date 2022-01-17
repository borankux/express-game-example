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
    }
  }
</script>

<style>

</style>
