<template>
  <div class="messages">
    <div v-if="message.type == 'text'" v-bind:class="{ bot: message.who === 'bot', person: message.who === 'person' }">
      <div class="message">
        {{message.message}}
      </div>
    </div>
    <div v-else-if="message.type == 'list'" class="message bot list">
      <div v-for="item in message.items" v-bind:key="item.Metier">
        <button @click="selectOffer(item)">{{item.Poste}}</button>
      </div>
    </div>
    <div v-else-if="message.type == 'offer'" class="message bot offer">
      <h2 class="offer_title">{{message.offer.Poste}}</h2>
      <p>{{message.offer.Description}}</p>
      <a :href="message.offer.url" target="_blank">Voir en ligne</a>
    </div>
  </div>
</template>

<style>
.messages {
  width: 100%;
  text-align: left;
}
.message {
  display: inline-block;
  margin: 10px;
  padding: 10px;
  border: 1px solid gray;
  background-color: lightgray;
  width: auto;
  border-radius: 4px;
}
.bot {
  text-align: left;
}
.bot .message {
  background-color: #aaddaa;
  border-color: #88dd88;
  color: #003300;
}
.person {
  text-align: right;
}
.person .message {
  background-color: #aaaadd;
  border-color: #8888dd;
  color: #000033;
}
</style>

<script>
export default {
  name: "Message",
  props: ["message"],
  data() {
    return {
    };
  },
  methods: {
    selectOffer(offer) {
      this.$emit("offerSelected", offer)
    }
  }
};
</script>
