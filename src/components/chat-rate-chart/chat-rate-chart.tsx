import React from 'react';

import { LineChart, Line, ResponsiveContainer, YAxis } from 'recharts';

interface Props {
    data: number[]
}

const ChatRateChart: React.SFC<Props> = ({ data = [] }) => {
    const formatedData = data.map((value, index) => ({ value, index }));
    return (
        <ResponsiveContainer width="100%" height={100}>
            <LineChart data={formatedData}>
                <YAxis></YAxis>
                <Line type="monotone" dataKey="value" stroke="#8884d8" strokeWidth={2} isAnimationActive={false} />
            </LineChart>
        </ResponsiveContainer>
    );
}

export default ChatRateChart;
