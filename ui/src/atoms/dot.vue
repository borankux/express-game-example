<template>
  <div>
    <div :class="on ? 'status connected':'status'"></div>
    <div class="label nes-text is-warning">{{label}}</div>
  </div>
</template>

<script>
  export default  {
    name:'dot',
    props: {
      on: {
        type: Boolean,
        default: () => {
          return false
        }
      },
      label: {
        type: String,
        default: () => {
          return ''
        }
      }
    }
  }
</script>

<style>
  .status {
    display: inline-block;
    background-color: #d45;
    width: 10px;
    height: 10px;
    border-radius: 10px;
  }

  .connected {
    background-color: green;
  }

  .label {
    display: inline-block;
  }
</style>
