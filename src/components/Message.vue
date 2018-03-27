<template>
  <div class="messages">
    <div class="who-icon" v-if="message.who == 'bot'">
      <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 57.938 57.938" style="enable-background:new 0 0 57.938 57.938;" xml:space="preserve">
        <g>
          <path d="M54.822,24.938C51.086,18.334,43.441,8.828,29.154,0.051c-0.112-0.069-0.258-0.069-0.369,0
              C14.5,8.828,6.853,18.045,3.116,24.649c-4.395,7.767-1.889,17.151,6.104,21.119c2.084,1.034,3.599,1.17,5.396,1.17
              c0,0,0.44-0.015,1.164-0.123c3.212-0.48,6.165-2.041,8.45-4.349l0.325-0.328c0.475-0.48,1.29-0.103,1.227,0.57
              c-0.339,3.645-0.998,9.113-3.787,12.591c-0.855,1.066-0.155,2.64,1.212,2.64h11.534c1.363,0,2.058-1.57,1.204-2.633
              c-2.824-3.516-3.462-9.069-3.807-12.715c-0.054-0.569,0.648-0.876,1.033-0.453l0,0c1.992,2.194,4.562,3.806,7.428,4.56
              c1.595,0.42,2.721,0.53,2.721,0.53c1.797,0,3.313-0.136,5.396-1.17C56.711,42.089,59.217,32.705,54.822,24.938z" />
        </g>
      </svg>
    </div>
    <div v-if="message.type == 'text'" v-bind:class="{ bot: message.who === 'bot', person: message.who === 'person' }">
      <div class="message">
        {{message.message}}
      </div>
    </div>
    <div v-else-if="message.type == 'list'" class="bot list">
      <div class="message">
        <div v-for="(item, index) in message.items" v-bind:key="item.Metier">
          <button class="button" @click="selectOffer(item)" :class="{ last: index == message.items.length - 1 }">{{item.Poste}}</button>
        </div>
      </div>
    </div>
    <div v-else-if="message.type == 'offer'" class="bot offer">
      <div class="message">
        <h2 class="offer_title">{{message.offer.Poste}}</h2>
        <p>{{message.offer.Description}}</p>
        <a :href="message.offer.url" target="_blank">Voir en ligne</a>
      </div>
    </div>
  </div>
</template>

<style>
.messages {
  width: 100%;
  text-align: left;
  display: inline-block;
}
.message {
  display: inline-block;
  margin: 10px;
  padding: 10px;
  border: 1px solid;
  color: rgb(43, 43, 43);
  width: auto;
  border-radius: 7px;
}
.bot {
  display: inline-block;
  text-align: left;
}
.bot .message {
  background-color: transparent;
  border-color: rgb(255, 102, 46);
}
.bot.list {
  width: 90%;
}
.bot.list .message {
  width: 90%;
  padding: 0;
  box-shadow: 0px 2px 3px rgba(0, 0, 0, 0.15);
}
.bot.list button.last {
  border: none;
}
.bot.list button {
  border: none;
  border-bottom: 1px solid #b9b9b9;
  background-color: transparent;
  padding: 5px;
  width: 100%;
  line-height: 24px;
  font-weight: 600;
  cursor: pointer;
}
.bot.list button:hover {
  background-color: #dddddd;
}
.person {
  text-align: right;
}
.person .message {
  background-color: #eeeeee;
  border-color: #919191;
}
.who-icon {
  margin-left: 15px;
  display: inline-block;
  fill: currentColor;
  height: 24px;
  line-height: 24px;
  position: relative;
  width: 24px;
  vertical-align: middle;
  color: transparent;
  stroke: rgb(255, 102, 46);
  stroke-width: 3px;
}
</style>

<script>
export default {
  name: "Message",
  props: ["message"],
  data() {
    return {};
  },
  methods: {
    selectOffer(offer) {
      this.$emit("offerSelected", offer);
    }
  }
};
</script>
