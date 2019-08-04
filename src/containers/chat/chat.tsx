import React from 'react';
import { connect } from 'react-redux';
import { AnyAction } from 'redux';
import { Row, Col } from 'antd';

import './chat.scss';
import { getSelectedStreamMessages, getSelectedStream } from '../../redux/selectors/messages';
import { getUsername } from '../../redux/selectors/user';
import { ChatMessage } from '../../interfaces/messages';
import { addMessage, } from '../../redux/actions/messages';
import twitchWebSocket, { TwitchWebSocket } from '../../shared/websockets';
import ChatMessageComponent from '../../components/chat-message/chat-message';
import ChatInputComponent from '../../components/chat-input/chat-input';
import StreamSelectorComponent from '../stream-selector/stream-selector';
import LoginFormContainter from '../login-form/login-form';
import { RootReducer } from '../../redux/reducers'

interface Props {
    addMessage: (message: ChatMessage) => AnyAction;
    chatMessages: ChatMessage[];
    selectedStream: string;
    username: string;
}
interface State {
    userInput: string;
    isLoggedIn: boolean;
}

class Chat extends React.Component<Props, State>{
    wsConn: TwitchWebSocket;
    constructor(props: Props) {
        super(props);
        this.state = {
            userInput: '',
            isLoggedIn: false,
        };
        this.wsConn = twitchWebSocket;
    }

    componentWillUnmount = () => {
        this.wsConn.close();
        this.setState(() => ({
            isLoggedIn: false
        }))
    }

    dialTwitchWSS = (username: string, oauthToken: string) => {
        this.wsConn.dial().then(() => {
            this.wsConn.signIn(username, oauthToken);
            this.setState(() => ({ isLoggedIn: true }));
            this.wsConn.connection.addEventListener('message', (event) => {
                this.wsConn.parseWSMessage(event).forEach((message) => {
                    if (!!message) {
                        this.props.addMessage(message);
                    }
                });
                this.wsConn.connection.addEventListener('close', (e) => {
                    // TODO: close/retry handler
                    console.log(e);
                    this.setState(() => ({ isLoggedIn: false }));
                });
            });
        });
    }

    handleChatInputSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!this.props.selectedStream) {
            return;
        }
        this.wsConn.messageChannel(this.props.selectedStream, this.state.userInput);
        const newMessage: ChatMessage = {
            content: this.state.userInput,
            dateTime: new Date(),
            from: this.props.username,
            stream: this.props.selectedStream,
        };
        this.props.addMessage(newMessage);
        this.setState(() => ({ userInput: '' }));
    }

    handleLoginSubmit = (username: string, oauthToken: string) => {
        this.dialTwitchWSS(username, oauthToken);
    }

    render() {
        return this.state.isLoggedIn ?
            (<Row type="flex" className="chat-messages" align="bottom" justify="center">
                <Col span={18}>
                    <StreamSelectorComponent></StreamSelectorComponent>
                    <Row type="flex" className="chat" align="bottom" justify="start">
                        {this.props.chatMessages.length > 0 && this.props.chatMessages.map((message, index) => (
                            <Col span={24} key={index}>
                                <ChatMessageComponent message={message}></ChatMessageComponent>
                            </Col>
                        ))}
                    </Row>
                    <Row type="flex" className="chat-input">
                        <ChatInputComponent
                            value={this.state.userInput}
                            onChange={(e) => this.setState({ userInput: e.target.value })}
                            onSubmit={this.handleChatInputSubmit}
                        ></ChatInputComponent>
                    </Row>
                </Col>
            </Row>) :
            (<LoginFormContainter onSubmit={this.handleLoginSubmit}></LoginFormContainter>)
    }
}

const mapStateToProps = (state: RootReducer) => {
    const chatMessages = getSelectedStreamMessages(state);
    const selectedStream = getSelectedStream(state);
    const username = getUsername(state);
    return { chatMessages, selectedStream, username };
}

const mapDispatchToProps = {
    addMessage
};

export default connect(mapStateToProps, mapDispatchToProps)(Chat);