import React from 'react';
import { connect } from 'react-redux';
import { RootReducer } from '../../redux/reducers'

import './chat.scss';
import { getChatMessages } from '../../redux/selectors/messages';
import { ChatMessage } from '../../interfaces/messages';
import { addMessage } from '../../redux/actions/messages';
import { TWITCH_CHAT_ADDRESS } from '../../shared/constants';
import ChatMessageComponent from '../../components/chat-message/chat-message';
import { AnyAction } from 'redux';

interface Props {
    addMessage: (message: ChatMessage) => AnyAction;
    chatMessages: ChatMessage[];
}
interface State { }

class Chat extends React.Component<Props, State>{
    wsConn: WebSocket = {} as WebSocket;
    constructor(props: Props) {
        super(props);
        this.props.addMessage({
            content: 'Hello World',
            from: 'System',
            dateTime: new Date(),
            stream: 'local'
        });
    }

    dialTwitchWSS() {
        this.wsConn = new WebSocket(TWITCH_CHAT_ADDRESS);
        this.wsConn.addEventListener('error', (e) => {
            // TODO: Connection error handler
            console.log(e);
        });
        this.wsConn.addEventListener('message', (e) => {
            // TODO: Send message to twitch
            console.log(e);
        });
        this.wsConn.addEventListener('open', (e) => {
            // TODO: Connection success handler
            console.log(e);
        });
        this.wsConn.addEventListener('close', (e) => {
            // TODO: close/retry handler
            console.log(e);
        });
    }

    render() {
        return (
            <div className="chat" >
                This is the chat wrapper
                <div className="chat-messages">
                    This is the message box
                    {this.props.chatMessages.map((message, index) => (
                        <ChatMessageComponent message={message} key={index}></ChatMessageComponent>
                    ))}
                </div>
                <div className="chat-input">This is the chat input</div>
            </div >
        )
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