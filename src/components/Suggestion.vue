<template>
  <div class="suggestion">
    <button @click="click">{{suggestion.title}}</button>
  </div>
</template>

<style>
.suggestion {
  display: inline-block;
  margin: 10px;
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
