<template>
  <div class="suggestion">
    <button @click="click">{{suggestion.title}}</button>
  </div>
</template>

<style>
.suggestion {
  display: inline-block;
  margin: 0px;
  overflow: auto;
}
.suggestion button {
  border: 1px solid #b9b9b9;
  border-radius: 7px;
  background-color: transparent;
  padding: 10px;
  margin: 3px 5px;
  box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.45);
}
.suggestion button:hover {
  background-color: rgba(0,0,0,0.05);
  cursor: pointer;
}
</style>

<script>
export default {
  name: "Suggestion",
  props: ["suggestion"],
  data() {
    return {
    };
  },
  methods: {
    click() {
      this.$emit("clicked")
    }
  }
};
</script>
