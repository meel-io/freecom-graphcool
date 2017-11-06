import ReactDOM from 'react-dom'
import './index.css'
import ApolloClient from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'

const link = new HttpLink({ uri: 'https://api.graph.cool/simple/v1/__PROJECT_ID__' })
const cache = new InMemoryCache()

const client = new ApolloClient({
  link,
  cache,
  dataIdFromObject: o => o.id
})

const freecom = {
  render,
  companyName: 'Graphcool',
  companyLogoURL: 'http://imgur.com/qPjLkW0.png',
  mainColor: 'rgba(39,175,96,1)'
}

function render (element) {
  if (!element) {
    const root = document.createElement('div')
    root.id = '__freecom-root__'
    document.body.appendChild(root)
    element = root
  }

  ReactDOM.render(
    <ApolloProvider client={client}>
      <App freecom={freecom} />
    </ApolloProvider>,
    element
  )
}

render(document.getElementById('__freecom-root__'))
