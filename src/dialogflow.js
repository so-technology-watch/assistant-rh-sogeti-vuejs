import {
  ApiAiClient,
  ApiAiConstants,
  IStringMap,
  IRequestOptions,
  IApiClientOptions,
  IServerResponse
} from "api-ai-javascript"


const client = new ApiAiClient({
  accessToken: 'f8c540d1fa9b4014b11b5075ee5222bc',
  lang: ApiAiConstants.AVAILABLE_LANGUAGES.FR
})

function clearChatbotResponse(res) {
  if (res.status.code == 200) {
    return {
      messages: res.result.fulfillment.messages.sort((m1, m2) => {
        if (m1.type == 'suggestion_chips') {
          return 1
        }
        return 0
      }),
      data: res.result.fulfillment.data
    }
  } else {
    throw res.status
  }
}

export function askChatbot(req) {
  return client.textRequest(req)
    .then(res => {
      return clearChatbotResponse(res)
    })
    .catch(err => {
      console.log(err);
      throw err
    })
}

export function requestEventChatbot(req) {
  return client.eventRequest(req)
    .then(res => {
      return clearChatbotResponse(res)
    })
    .catch(err => {
      console.log(err);
    })
}
