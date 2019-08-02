import React from 'react';
import { Col, Input, Button } from 'antd';

import './chat-input.scss';

interface Props {
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => any;
    onSubmit: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => any;
    value: any;
}

const ChatInputComponent: React.SFC<Props> = ({ onChange, onSubmit, value }) => (
    <Col className="input" span={24} >
        <Input allowClear className="input-field" type="text" value={value} onChange={onChange} />
        <Button className="input-button" onClick={onSubmit}>Send</Button>
    </Col>
);


export default ChatInputComponent;
