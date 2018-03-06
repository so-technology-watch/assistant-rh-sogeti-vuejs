<template>
  <div id="app">
    <Chatbot/>
  </div>
</template>

<script>
import Chatbot from './components/Chatbot.vue'

export default {
  name: 'app',
  components: {
    Chatbot
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
}
</style>
