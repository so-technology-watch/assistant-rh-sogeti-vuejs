<template>
  <div id="assistant">
    <div id="conversation">
      <Message v-for="display in displays" v-bind:key="display.id" :message="display"
              @offerSelected="selectOffer"></Message>
    </div>
    <div id="suggestions" v-if="suggestions != []">
      <Suggestion v-for="suggestion in suggestions" :suggestion="suggestion" :key="suggestion.title"
                @clicked="selectSuggestion(suggestion.title)"></Suggestion>
    </div>
    <InputArea @inputSent="addAndSend" :awaiting="awaiting"></InputArea>
  </div>
</template>

<style>
#assistant {
  font: 400 13.3333px 'Roboto';
  height: 500px;
  width: 350px;
  box-shadow: 5px 5px 10px 5px #0c141488;
  background-color: white;
  position: fixed;
  bottom: 0;
  right: 50px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  border-top: 5px solid rgb(255, 102, 46);
  border-radius: 7px 7px 0 0;
}
#conversation {
  width: 100%;
  overflow-y: auto;
}
#input {
  margin: 10px 0;
  bottom: 10px;
  bottom: 0;
}
#suggestions {
  display: inline-block;
  margin: 10px;
}
</style>

<script>
import * as Dialogflow from "../dialogflow";
import Suggestion from "./Suggestion.vue"
import InputArea from "./InputArea.vue"
import Message from "./Message.vue"

export default {
  name: "Popup",
  components: {
    Suggestion,
    InputArea,
    Message
  },
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
        who: "bot",
        items: list
      });
    },
    addOneOffer(offer) {
      this.displays.push({
        type: "offer",
        who: "bot",
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
        if (
          listOffersContext.length > 0 &&
          listOffersContext[0].parameters.Offers_presented !=
            this.currentOfferList
        ) {
          this.currentOfferList =
            listOffersContext[0].parameters.Offers_presented;
          this.addList(listOffersContext[0].parameters.Offers_presented);
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
      this.suggestions = [];
      this.addUserMessage(message);
      this.send(message);
    }
  }
};
</script>
