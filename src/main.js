import Vue from 'vue'
import App from './App.vue'
import ApolloClient from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import VueApollo from 'vue-apollo'

const networkInterface = {
  link: new HttpLink({
    uri: 'https://api.graph.cool/simple/v1/cj9n3v8z108o8010845fuvepz'
  })
}

const apolloClient = new ApolloClient({
  networkInterface
})

Vue.use(VueApollo)

const apolloProvider = new VueApollo({
  defaultClient: apolloClient
})

new Vue({
  el: '#app',
  apolloProvider,
  template: '<App/>',
  components: { App }
})
