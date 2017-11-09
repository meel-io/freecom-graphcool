import React, { Component } from "react";
import { withApollo, gql } from "react-apollo";
import "./Chat.css";
import ChatInput from "./ChatInput";
import ChatMessages from "./ChatMessages";
import Dropzone from "react-dropzone";

class Chat extends Component {
    constructor () {
        super();
        this.state = {
            message: ""
        };
    }

    componentDidMount () {
        // this requires wrapping `Chat` with `withApollo`
        this.props.client
            .query({
                query: gql`
                    query allMessages {
                        allMessages {
                            id
                            text
                        }
                    }
                `
            })
            .then(response => {
                // handle the response
            });
    }

    _onFileDrop (acceptedFiles, rejectedFiles) {}

    _onSend () {
        this.props.client
            .mutate({
                mutation: gql`
                    mutation createMessage($text: String!) {
                        createMessage(text: $text) {
                            id
                            text
                        }
                    }
                `,
                variables: {
                    text: "Hello"
                }
            })
            .then(response => {
                // handle the response
            });
    }

    render () {
        return (
            <Dropzone
                className="dropzone relative"
                onDrop={this._onFileDrop}
                accept="image/*"
                multiple={false}
                disableClick
            >
                <div className="message-body chat-container">
                    <ChatMessages
                        messages={[]}
                        userSpeechBubbleColor={this.props.mainColor}
                        profileImageURL={this.props.profileImageURL}
                    />
                    {this.state.isUploadingImage && <div className="upload-image-indicator">Uploading image ...</div>}
                    <ChatInput
                        message={this.state.message}
                        onTextInput={message => this.setState({ message })}
                        onResetText={() => this.setState({ message: "" })}
                        onSend={this._onSend}
                        onDrop={this._onFileDrop}
                    />
                </div>
            </Dropzone>
        );
    }
}

export default withApollo(Chat);
