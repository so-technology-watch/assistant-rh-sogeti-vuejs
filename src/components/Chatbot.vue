<style scoped>
.messages {
  width: 100%;
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
.suggestion {
  display: inline-block;
  margin: 10px;
}

.list {
  display: inline-block;
  margin: 10px;
  padding: 10px;
  border: 1px solid gray;
  background-color: lightgray;
  width: auto;
  border-radius: 4px;
  text-align: left;
}
</style>

<template>
  <div>
    <div>
      <div class="messages" 
          v-for="display in displays"
          v-bind:key="display.id">
        <div v-if="display.type == 'text'" 
              v-bind:class="{ bot: display.who === 'bot', person: display.who === 'person' }">
          <div class="message">
            {{display.message}}
          </div>
        </div>
        <div v-else-if="display.type == 'list'"
              class="list">
          <div v-for="item in display.items"
              v-bind:key="item.title">
            {{item.title}}
          </div>
        </div>
      </div>
    </div>
    <div>
      <div class="suggestions">
        <div class="suggestion" v-for="{title} in suggestions" :key="title">
          <button v-on:click="selectSuggestion(title)">{{title}}</button>
        </div>
      </div>
      <div v-if="awaiting">Waiting...</div>
      <input type="text" v-model="message" placeholder="..." @keyup.enter="send(message)"/>
      <button v-on:click="send(message)">Envoyer</button>
    </div>
  </div>
</template>

<script>
import * as Dialogflow from "../dialogflow";
export default {
  name: "Chatbot",
  data() {
    return {
      displays: [],
      suggestions: [],
      message: "",
      awaiting: true
    };
  },
  created() {
    this.askChatbotEvent("WELCOME");
  },
  methods: {
    addBotMessage(message) {
      this.displays.push({
        type: "text",
        message: message,
        who: "bot"
      });
    },
    addSuggestions(suggestions) {
      this.suggestions = suggestions;
    },
    addList(list){
      this.displays.push({
        type: "list",
        items: list
      })
    },
    selectSuggestion(message) {
      this.suggestions = [];
      this.send(message);
    },
    displayResponses(responses) {
      responses.messages.forEach(this.displayResponseMessage);
      this.displayResponseData(responses.data);
    },
    displayResponseMessage(res) {
      switch (res.type) {
        case "simple_response":
          this.addBotMessage(res.textToSpeech);
          break;
        case "suggestion_chips":
          this.addSuggestions(res.suggestions);
          break;
        case 0:
          this.addBotMessage(res.speech);
          break;
        default:
          this.addBotMessage(res);
          break;
      }
    },
    displayResponseData(data) {
      try {
        var list = data.google.system_intent.spec.option_value_spec.list_select.items;
        this.addList(list)
      } catch (error) {}
    },
    askChatbot(req) {
      this.addAwaiter();
      Dialogflow.askChatbot(req)
        .catch(err => {
          this.addBotMessage(
            "Désolé, il y a eu un problème de connexion au Chatbot"
          );
        })
        .then(res => {
          this.displayResponses(res);
        })
        .catch(err => {
          console.log(err);
        })
        .then(this.removeAwaiter);
    },
    askChatbotEvent(req) {
      this.addAwaiter();
      Dialogflow.requestEventChatbot(req)
        .then(this.displayResponses)
        .catch(err => {
          console.log(err);
        })
        .then(this.removeAwaiter);
    },
    addAwaiter() {
      this.awaiting = true;
    },
    removeAwaiter() {
      this.awaiting = false;
    },
    send(message) {
      this.displays.push({
        type: "text",
        message: message,
        who: "person"
      });
      this.askChatbot(message);
      this.message = "";
    }
  }
};
</script>
