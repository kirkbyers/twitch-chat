import React from 'react';
import { Col, Form, Input, Button } from 'antd';

import './chat-input.scss';

interface Props {
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => any;
    onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    value: any;
}

const ChatInputComponent: React.SFC<Props> = ({ onChange, onSubmit, value }) => (
    <Col className="input" span={24} >
        <Form onSubmit={onSubmit} layout="inline">
            <Form.Item>
                <Input allowClear className="input-field" type="text" value={value} onChange={onChange} placeholder="Send Message" />
            </Form.Item>
            <Form.Item>
                <Button className="input-button" htmlType="submit">Send</Button>
            </Form.Item>
        </Form>
    </Col>
);


export default ChatInputComponent;
