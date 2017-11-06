import { Component } from 'react'
import cx from 'classnames'
import './App.css'
import { timeDifferenceForDate } from '../utils'
import { FREECOM_CUSTOMER_ID_KEY } from '../constants'

export default class App extends Component {
  constructor () {
    super()
    this.state = {
      isOpen: false,
      selectedConversationId: null,
      conversations: []
    }
  }

  /** ToDo: Refactor */
  async componentDidMount () {}

  render () {
    const customerId = FREECOM_CUSTOMER_ID_KEY
    const shouldRenderChat = this.state.selectedConversationId && customerId
    const panelStyles = cx(
      `panel drop-shadow radius overflow-hidden ${this.state.isOpen ? 'fadeInUp' : 'hide'}`
    )
    return (
      <div className="App">
        <div>
          <div className="container">
            <div className={panelStyles}>
              {shouldRenderChat ? this._renderChat(customerId) : this._renderConversationsList()}
            </div>
            <ToggleOpeningStateButton
              isOpen={this.state.isOpen}
              togglePanel={this._togglePanel}
              mainColor={this.props.freecom.mainColor}
            />
          </div>
        </div>
      </div>
    )
  }

  _renderConversationsList () {
    return (
      <span>
        <ConversationsListHeader
          mainColor={this.props.freecom.mainColor}
          companyName={this.props.freecom.companyName}
        />
        <div className="body overflow-y-scroll overflow-x-hidden">
          <ConversationsList
            conversations={this.state.conversations}
            onSelectConversation={this._onSelectConversation}
            companyLogoURL={this.props.freecom.companyLogoURL}
            companyName={this.props.freecom.companyName}
          />
          <div className="flex flex-hcenter full-width conversation-button-wrapper pointer-events-none">
            <div
              className="conversation-button background-darkgray drop-shadow-hover pointer flex-center flex pointer-events-initial"
              onClick={() => this._initiateNewConversation()}
            >
              <p>New Conversation</p>
            </div>
          </div>
        </div>
      </span>
    )
  }

  _renderChat (customerId) {
    const { freecom } = this.props
    const selectedConversation = this.state.conversations.find(
      c => c.id === this.state.selectedConversationId
    )
    const { agent } = selectedConversation
    const chatPartnerName = agent ? selectedConversation.agent.slackUserName : freecom.companyName
    const profileImageUrl = agent && agent.imageUrl ? agent.imageUrl : freecom.companyLogoURL
    const created = timeDifferenceForDate(selectedConversation.updatedAt)
    return (
      <span>
        <ChatHeader
          chatPartnerName={chatPartnerName}
          agentId={selectedConversation.agent ? selectedConversation.agent.id : null}
          headerColor={freecom.mainColor}
          resetConversation={this._resetConversation}
          profileImageUrl={profileImageUrl}
          created={created}
          shouldDisplayBackButton={selectedConversation.messages.length > 0}
        />
        <Chat
          conversationId={this.state.selectedConversationId}
          mainColor={freecom.mainColor}
          customerId={customerId}
          resetConversation={this._resetConversation}
          secondsUntilRerender={this.state.secondsUntilRerender}
          profileImageURL={freecom.companyLogoURL}
        />
      </span>
    )
  }

  async _setupNewCustomer () {}

  async _loadConversation (customerId) {}

  _initiateNewConversation () {}

  async _createNewConversation (customerId, username) {}

  _onSelectConversation (conversation) {
    this.setState({
      selectedConversationId: conversation.id
    })
  }

  _resetConversation () {
    this.setState({
      selectedConversationId: null
    })
  }

  _togglePanel () {
    return this.setState({ isOpen: !this.state.isOpen })
  }
}