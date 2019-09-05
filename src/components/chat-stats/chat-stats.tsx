import React from 'react';
import { Row, Col, Typography } from 'antd';

import './chat-stats.scss';

const { Title } = Typography;

interface Props {
    averageOver10s: number;
}

const ChatStatsComponent: React.SFC<Props> = ({ averageOver10s = 0 }) => {
    return (
        <Row className="chat-stats">
            <Col>
                <Title level={3}>Messages Per Second Average Over 10s</Title>
                <Title level={4}>{averageOver10s.toFixed(1)}</Title>
            </Col>
        </Row>
    )
}

export default ChatStatsComponent;
