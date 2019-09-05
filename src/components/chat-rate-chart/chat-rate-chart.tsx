import React from 'react';
import { LineChart, Line, ResponsiveContainer, YAxis } from 'recharts';
import { Row, Col, Typography } from 'antd';

import './chat-rate-chart.scss';

const { Title } = Typography;

interface Props {
    data: number[]
}

const ChatRateChart: React.SFC<Props> = ({ data = [] }) => {
    const formatedData = data.map((value, index) => ({ value, index }));
    return (
        <Row type="flex" className="chat-rate-chart">
            <Col>
                <Title level={3}>Messages Per Second</Title>
            </Col>
            <Col>
                <ResponsiveContainer width="100%" height={100}>
                    <LineChart data={formatedData}>
                        <YAxis></YAxis>
                        <Line type="monotone" dataKey="value" stroke="#8884d8" strokeWidth={2} isAnimationActive={false} />
                    </LineChart>
                </ResponsiveContainer>
            </Col>
        </Row>
    );
}

export default ChatRateChart;
