import React from 'react';

import { LineChart, Line } from 'recharts';

interface Props {
    data: number[]
}

const ChatRateChart: React.SFC<Props> = ({ data }) => {
    const formatedData = data.map((value, index) => ({ value, index }));
    return (
        <LineChart width={300} height={100} data={formatedData}>
            <Line type="monotone" dataKey="index" stroke="#8884d8" strokeWidth={2} />
        </LineChart>
    )
}

export default ChatRateChart;
