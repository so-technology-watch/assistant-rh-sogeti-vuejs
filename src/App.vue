<template>
  <div id="app">
      <Popup/>
  </div>
</template>

<script>
import Popup from "./components/Popup.vue";

export default {
  name: "app",
  components: {
    Popup
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background: white url("./assets/background.jpg") no-repeat center center fixed; 
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
  width: 100%;
  height: 100%;
  position: absolute;
  top:0;
  left:0;
}
</style>
