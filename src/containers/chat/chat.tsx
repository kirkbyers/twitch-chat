import React from 'react';
import { connect } from 'react-redux';
import { Row, Col } from 'antd';

import './chat.scss';
import { getSelectedStreamMessages, getSelectedStream, getSelectedStreamChatMessagesStats, getSelectedStreamMessagesPerSOver10 } from '../../redux/selectors/messages';
import { getUsername, getIsLoggedIn } from '../../redux/selectors/user';
import { ChatMessage, ChatMessagesStats } from '../../interfaces/messages';
import { addMessage } from '../../redux/actions/messages';
import { setIsLoggedIn } from '../../redux/actions/user';
import twitchWebSocket, { TwitchWebSocket } from '../../shared/websockets';
import ChatMessageComponent from '../../components/chat-message/chat-message';
import ChatInputComponent from '../../components/chat-input/chat-input';
import StreamSelectorComponent from '../stream-selector/stream-selector';
import LoggoutButton from '../logout/logout';
import LoginFormContainter from '../login-form/login-form';
import { RootReducer } from '../../redux/reducers'
import ChatRateChart from '../../components/chat-rate-chart/chat-rate-chart';

interface Props {
    addMessage: (message: ChatMessage) => void;
    setIsLoggedIn: (isLoggedIn: boolean) => void;
    chatMessages: ChatMessage[];
    selectedChatStats: ChatMessagesStats;
    selectedChatMessagesPerSOver10: number[];
    selectedStream: string;
    username: string;
    isLoggedIn: boolean;
    initialState?: { [key: string]: any };
}
interface State {
    userInput: string;
}

class Chat extends React.Component<Props, State>{
    wsConn: TwitchWebSocket;
    chatEnd: HTMLDivElement | null = null;

    constructor(props: Props) {
        super(props);
        this.state = {
            userInput: '',
            ...props.initialState
        };
        this.wsConn = twitchWebSocket;
    }

    dialTwitchWSS = (username: string, oauthToken: string) => {
        this.wsConn.dial().then(() => {
            this.wsConn.signIn(username, oauthToken);
            this.props.setIsLoggedIn(true);
            this.wsConn.connection.addEventListener('message', (event) => {
                this.wsConn.parseWSMessage(event).forEach((message) => {
                    if (!!message) {
                        this.props.addMessage(message);
                    }
                });
                this.wsConn.connection.addEventListener('close', (e) => {
                    // TODO: close/retry handler
                    console.log(e);
                    this.props.setIsLoggedIn(false);
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

    componentDidUpdate() {
        if (!this.chatEnd) {
            return;
        }
        this.chatEnd.scrollIntoView({ behavior: 'smooth' });
    }

    render() {
        return this.props.isLoggedIn ?
            (<Row type="flex" className="chat-messages" align="bottom" justify="center">
                <Col span={16}>
                    <Row>
                        <Col span={20}>
                            <StreamSelectorComponent></StreamSelectorComponent>
                        </Col>
                        <Col span={4}>
                            <LoggoutButton></LoggoutButton>
                        </Col>
                    </Row>
                    <Row className="chat" align="bottom" justify="start">
                        {this.props.chatMessages.length > 0 && this.props.chatMessages.map((message, index) => (
                            <Col key={index} offset={0} span={24}>
                                <ChatMessageComponent message={message}></ChatMessageComponent>
                            </Col>
                        ))}
                        <Col offset={0} span={24}>
                            <div ref={(el) => { this.chatEnd = el; }}></div>
                        </Col>
                    </Row>
                    <Row type="flex" className="chat-input">
                        <ChatInputComponent
                            value={this.state.userInput}
                            onChange={(e) => this.setState({ userInput: e.target.value })}
                            onSubmit={this.handleChatInputSubmit}
                        ></ChatInputComponent>
                    </Row>
                </Col>
                <Col span={8}>
                    <ChatRateChart data={this.props.selectedChatMessagesPerSOver10}></ChatRateChart>
                </Col>
            </Row>) :
            (<LoginFormContainter onSubmit={this.handleLoginSubmit}></LoginFormContainter>)
    }
}

const mapStateToProps = (state: RootReducer) => {
    const chatMessages = getSelectedStreamMessages(state);
    const selectedStream = getSelectedStream(state);
    const username = getUsername(state);
    const isLoggedIn = getIsLoggedIn(state);
    const selectedChatStats = getSelectedStreamChatMessagesStats(state);
    const selectedChatMessagesPerSOver10 = getSelectedStreamMessagesPerSOver10(state);
    return { chatMessages, selectedStream, username, isLoggedIn, selectedChatStats, selectedChatMessagesPerSOver10 };
}

const mapDispatchToProps = {
    addMessage,
    setIsLoggedIn,
};

export default connect(mapStateToProps, mapDispatchToProps)(Chat);
