# assistant-rh-sogeti-vuejs

Ce projet vise à créer une interface pour un chatbot développé sur Dialogflow.
Il est ici relié à l'[assistant-rh-sogeti](https://github.com/so-technology-watch/assistant-rh-sogeti).

## Development Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev
```

## Deployment Setup

``` bash
# install dependencies
npm install

# build for production with minification
npm run build
```

For a detailed explanation on how vuejs works, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

## Getting started

La connexion au chatbot Dialogflow se fait dans [dialogflow.js](/src/dialogflow.js). Pour connecter cet outils à un autre chatbot il suffit de changer l'access token, fourni par DialogFlow dans les paramètres du projet.

Le composant principale est [Chatbot.vue](/src/components/Chatbot.vue), il défini l'interface de dialogue avec le chatbot.


## Known Issues

A l'heure actuelle l'API du chatbot met trop de temps à répondre, c'est pourquoi les questions demandants les offres d'emploi déclenche une erreur.
