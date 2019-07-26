import React from 'react';
import { connect } from 'react-redux';
import { RootReducer } from '../../redux/reducers'
import { AnyAction } from 'redux';

import './chat.scss';
import { getChatMessages } from '../../redux/selectors/messages';
import { ChatMessage } from '../../interfaces/messages';
import { addMessage } from '../../redux/actions/messages';
import { TWITCH_CHAT_ADDRESS } from '../../shared/constants';
import ChatMessageComponent from '../../components/chat-message/chat-message';
import ChatInputComponent from '../../components/chat-input/chat-input';
import LoginFormContainter from '../login-form/login-form';

interface Props {
    addMessage: (message: ChatMessage) => AnyAction;
    chatMessages: ChatMessage[];
}
interface State {
    userInput: string;
    isLoggedIn: boolean;
}

class Chat extends React.Component<Props, State>{
    wsConn: WebSocket = {} as WebSocket;
    constructor(props: Props) {
        super(props);
        this.state = {
            userInput: '',
            isLoggedIn: false,
        };
    }

    dialTwitchWSS = (username: string, oauthToken: string) => {
        this.wsConn = new WebSocket(TWITCH_CHAT_ADDRESS);
        this.wsConn.addEventListener('error', (e) => {
            // TODO: Connection error handler
            console.error(e);
        });
        this.wsConn.addEventListener('message', (e) => {
            // TODO: Send message to twitch
            console.log(e);
            this.props.addMessage({
                content: e.data,
                from: 'Twitch',
                stream: 'idk'
            })
        });
        this.wsConn.addEventListener('open', (e) => {
            // TODO: Connection success handler
            console.log(e);
            this.wsConn.send(`PASS ${oauthToken}`);
            this.wsConn.send(`NICK ${username}`);
            this.setState(() => ({ isLoggedIn: true }));
        });
        this.wsConn.addEventListener('close', (e) => {
            // TODO: close/retry handler
            console.log(e);
            this.setState(() => ({ isLoggedIn: false }));
        });
    }

    handleChatInputSubmit = () => {
        const newMessage: ChatMessage = {
            content: this.state.userInput,
            dateTime: new Date(),
            from: 'You',
            stream: 'This stream',
        };
        this.props.addMessage(newMessage);
        this.setState(() => ({ userInput: '' }));
    }

    handleLoginSubmit = (username: string, oauthToken: string) => {
        this.dialTwitchWSS(username, oauthToken);
    }

    render() {
        return this.state.isLoggedIn ?
            (<div className="chat" >
                <div className="chat-messages">
                    {this.props.chatMessages.map((message, index) => (
                        <ChatMessageComponent message={message} key={index}></ChatMessageComponent>
                    ))}
                </div>
                <div className="chat-input">
                    <ChatInputComponent
                        value={this.state.userInput}
                        onChange={(e) => this.setState({ userInput: e.target.value })}
                        onSubmit={this.handleChatInputSubmit}
                    ></ChatInputComponent>
                </div>
            </div>) :
            (<LoginFormContainter onSubmit={this.handleLoginSubmit}></LoginFormContainter>)
    }
}

const mapStateToProps = (state: RootReducer) => {
    const chatMessages = getChatMessages(state);
    return { chatMessages };
}

const mapDispatchToProps = {
    addMessage
};

export default connect(mapStateToProps, mapDispatchToProps)(Chat);