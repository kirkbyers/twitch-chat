import React from 'react';
import { ChatMessage } from '../../interfaces/messages';

interface Props {
    message?: ChatMessage;
    [rest: string]: any;
}

const ChatMessageComponent: React.SFC<Props> = ({ message, ...rest }) => (
    <div className="message">
        {message && `${message.from} [${message.dateTime}]: ${message.content}`}
    </div>
);

export default ChatMessageComponent;