
<template>
  <div id="assistant">
    <div id="conversation">
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
              class="message bot list">
          <div v-for="item in display.items"
              v-bind:key="item.Metier">
            <button v-on:click="selectOffer(item)">{{item.Poste}}</button>
          </div>
        </div>
        <div v-else-if="display.type == 'offer'"
              class="message bot offer">
            <h2 class="offer_title">{{display.offer.Poste}}</h2>
            <p>{{display.offer.Description}}</p>
            <a v-bind:href="display.offer.url" target="_blank">Voir en ligne</a>
        </div>
      </div>
    </div>
    <div id="input">
      <div class="suggestions">
        <div class="suggestion" v-for="{title} in suggestions" :key="title">
          <button v-on:click="selectSuggestion(title)">{{title}}</button>
        </div>
      </div>
      <div v-if="awaiting">Waiting...</div>
      <input type="text" v-model="message" placeholder="..." @keyup.enter="addAndSend(message)"/>
      <button v-on:click="addAndSend(message)">Envoyer</button>
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
      awaiting: true,
      currentOfferList: []
    };
  },
  updated: function() {
      var container = this.$el.querySelector("#conversation");
      container.scrollTop = container.scrollHeight;
  },
  watch: {
    displays: function(val) {
      var container = this.$el.querySelector("#conversation");
      container.scrollTop = container.scrollHeight;
    }
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
    addUserMessage(message) {
      this.displays.push({
        type: "text",
        message: message,
        who: "person"
      });
    },
    addSuggestions(suggestions) {
      this.suggestions = suggestions;
    },
    addList(list) {
      this.displays.push({
        type: "list",
        items: list
      });
    },
    addOneOffer(offer) {
      this.displays.push({
        type: "offer",
        offer: offer
      });
    },
    addError() {
      this.addBotMessage(
        "Désolé, il y a eu un problème de connexion au Chatbot"
      );
    },
    selectSuggestion(message) {
      this.suggestions = [];
      this.addAndSend(message);
    },
    selectOffer(offer) {
      this.addUserMessage(offer.Poste);
      this.addOneOffer(offer);
    },
    treatChatbotResponse(response) {
      response.messages.forEach(this.displayResponseMessage);
      if (response.context.length > 0) {
        var listOffersContext = response.context.filter(context => {
          return context.name == "context_list_offers";
        });
        if (listOffersContext.length>0 && listOffersContext[0].parameters.Offers_presented != this.currentOfferList) {
          this.currentOfferList = listOffersContext[0].parameters.Offers_presented
          this.addList(listOffersContext[0].parameters.Offers_presented)
        }
      }
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
          this.addError();
          break;
      }
    },
    displayResponseData(data) {
      try {
        var list =
          data.google.system_intent.spec.option_value_spec.list_select.items;
        this.addList(list);
      } catch (error) {}
    },
    askChatbot(req) {
      this.addAwaiter();
      Dialogflow.askChatbot(req)
        .catch(err => {
          this.addError();
        })
        .then(res => {
          this.treatChatbotResponse(res);
        })
        .catch(err => {
          console.log(err);
        })
        .then(this.removeAwaiter);
    },
    askChatbotEvent(req) {
      this.addAwaiter();
      Dialogflow.requestEventChatbot(req)
        .then(this.treatChatbotResponse)
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
      this.askChatbot(message);
      this.message = "";
    },
    addAndSend(message) {
      this.suggestions = []
      this.addUserMessage(message);
      this.send(message);
    }
  }
};
</script>

<style>
#assistant {
  height: 400px;
  width: 300px;
  box-shadow: 5px 5px 10px 5px #66888888;
  position: fixed;
  bottom: 0;
  right: 50px;
  padding: 3px;
}
#conversation {
  width: 100%;
  height: 90%;
  overflow-y: scroll;
  
}
#input {
  /* width: 100%; */
  height: 10%;
  /* position: fixed; */
  bottom: 10px;
}
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
.suggestion {
  display: inline-block;
  margin: 10px;
}
</style>