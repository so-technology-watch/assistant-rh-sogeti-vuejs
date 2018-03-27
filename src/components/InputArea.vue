<template>
  <div id="input">
    <input id="input-text" ref="input" type="text" v-model="message" @keyup.enter="send" />
    <button class="send" @click="send" :disabled="awaiting">
      <span class="send-icon">
        <svg v-if="awaiting" class="lds-spin" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid" style="background: none;">
          <g transform="translate(80,50)">
            <g transform="rotate(0)">
              <circle cx="0" cy="0" r="10" fill-opacity="1" transform="scale(1.0425 1.0425)">
                <animateTransform attributeName="transform" type="scale" begin="-0.875s" values="1.1 1.1;1 1" keyTimes="0;1" dur="1s" repeatCount="indefinite"></animateTransform>
                <animate attributeName="fill-opacity" keyTimes="0;1" dur="1s" repeatCount="indefinite" values="1;0" begin="-0.875s"></animate>
              </circle>
            </g>
          </g>
          <g transform="translate(71.21320343559643,71.21320343559643)">
            <g transform="rotate(45)">
              <circle cx="0" cy="0" r="10" fill-opacity="0.875" transform="scale(1.055 1.055)">
                <animateTransform attributeName="transform" type="scale" begin="-0.75s" values="1.1 1.1;1 1" keyTimes="0;1" dur="1s" repeatCount="indefinite"></animateTransform>
                <animate attributeName="fill-opacity" keyTimes="0;1" dur="1s" repeatCount="indefinite" values="1;0" begin="-0.75s"></animate>
              </circle>
            </g>
          </g>
          <g transform="translate(50,80)">
            <g transform="rotate(90)">
              <circle cx="0" cy="0" r="10" fill-opacity="0.75" transform="scale(1.0675 1.0675)">
                <animateTransform attributeName="transform" type="scale" begin="-0.625s" values="1.1 1.1;1 1" keyTimes="0;1" dur="1s" repeatCount="indefinite"></animateTransform>
                <animate attributeName="fill-opacity" keyTimes="0;1" dur="1s" repeatCount="indefinite" values="1;0" begin="-0.625s"></animate>
              </circle>
            </g>
          </g>
          <g transform="translate(28.786796564403577,71.21320343559643)">
            <g transform="rotate(135)">
              <circle cx="0" cy="0" r="10" fill-opacity="0.625" transform="scale(1.08 1.08)">
                <animateTransform attributeName="transform" type="scale" begin="-0.5s" values="1.1 1.1;1 1" keyTimes="0;1" dur="1s" repeatCount="indefinite"></animateTransform>
                <animate attributeName="fill-opacity" keyTimes="0;1" dur="1s" repeatCount="indefinite" values="1;0" begin="-0.5s"></animate>
              </circle>
            </g>
          </g>
          <g transform="translate(20,50.00000000000001)">
            <g transform="rotate(180)">
              <circle cx="0" cy="0" r="10" fill-opacity="0.5" transform="scale(1.0925 1.0925)">
                <animateTransform attributeName="transform" type="scale" begin="-0.375s" values="1.1 1.1;1 1" keyTimes="0;1" dur="1s" repeatCount="indefinite"></animateTransform>
                <animate attributeName="fill-opacity" keyTimes="0;1" dur="1s" repeatCount="indefinite" values="1;0" begin="-0.375s"></animate>
              </circle>
            </g>
          </g>
          <g transform="translate(28.78679656440357,28.786796564403577)">
            <g transform="rotate(225)">
              <circle cx="0" cy="0" r="10" fill-opacity="0.375" transform="scale(1.005 1.005)">
                <animateTransform attributeName="transform" type="scale" begin="-0.25s" values="1.1 1.1;1 1" keyTimes="0;1" dur="1s" repeatCount="indefinite"></animateTransform>
                <animate attributeName="fill-opacity" keyTimes="0;1" dur="1s" repeatCount="indefinite" values="1;0" begin="-0.25s"></animate>
              </circle>
            </g>
          </g>
          <g transform="translate(49.99999999999999,20)">
            <g transform="rotate(270)">
              <circle cx="0" cy="0" r="10" fill-opacity="0.25" transform="scale(1.0175 1.0175)">
                <animateTransform attributeName="transform" type="scale" begin="-0.125s" values="1.1 1.1;1 1" keyTimes="0;1" dur="1s" repeatCount="indefinite"></animateTransform>
                <animate attributeName="fill-opacity" keyTimes="0;1" dur="1s" repeatCount="indefinite" values="1;0" begin="-0.125s"></animate>
              </circle>
            </g>
          </g>
          <g transform="translate(71.21320343559643,28.78679656440357)">
            <g transform="rotate(315)">
              <circle cx="0" cy="0" r="10" fill-opacity="0.125" transform="scale(1.03 1.03)">
                <animateTransform attributeName="transform" type="scale" begin="0s" values="1.1 1.1;1 1" keyTimes="0;1" dur="1s" repeatCount="indefinite"></animateTransform>
                <animate attributeName="fill-opacity" keyTimes="0;1" dur="1s" repeatCount="indefinite" values="1;0" begin="0s"></animate>
              </circle>
            </g>
          </g>
        </svg>
        <svg v-else focusable="false" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 535.5 535.5">
          <polygon points="0,497.25 535.5,267.75 0,38.25 0,216.75 382.5,267.75 0,318.75" />
        </svg>
      </span>
    </button>
  </div>
</template>

<style>
#input {
  border-top: 1px solid lightgray;
  margin: 0;
}
#input-text {
  width: calc(100% - 100px);
  border: none;
  padding: 10px 25px;
  margin: 0px;
  line-height: 35px;
  outline: none;
}
.send {
  background: transparent;
  border: 0;
  float: right;
  height: 44px;
  line-height: 44px;
  outline: 0;
  padding-right: 16px;
  position: relative;
  top: -1px;
  vertical-align: middle;
  height: 60px;
}
.send-icon {
  display: inline-block;
  fill: currentColor;
  height: 24px;
  line-height: 24px;
  position: relative;
  width: 24px;
  cursor: pointer;
  vertical-align: middle;
  color: rgb(255, 102, 46);
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
  mounted() {
    this.$refs.input.focus();
  },
  methods: {
    send() {
      this.$emit("inputSent", this.message);
      this.message = "";
    }
  }
};
</script>
