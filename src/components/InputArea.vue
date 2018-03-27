<template>
  <div id="input">
    <div v-if="awaiting">Waiting...</div>
    <input type="text" v-model="message" placeholder="..." @keyup.enter="send" />
    <button @click="send">Envoyer</button>
  </div>
</template>

<style>
#input {
  margin: 10px 0;
  bottom: 10px;
  bottom: 0;
}
</style>

<script>
export default {
  name: "InputArea",
  props: ["awaiting"],
  data() {
    return {
      message: ""
    };
  },
  methods: {
    send() {
      this.$emit("inputSent", this.message)
      this.message = ""
    }
  }
};
</script>
