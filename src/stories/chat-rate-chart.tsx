import React from 'react';
import { storiesOf } from '@storybook/react'

import ChatRateChart from '../components/chat-rate-chart/chat-rate-chart'

storiesOf('ChatRateChart', module)
    .add('renders with test data', () => {
        const testData: number[] = [];
        for (let i = 0; i < 10; i++) {
            testData.push(i);
        }

        setInterval(() => {
            const first = testData.splice(0, 1);
            testData.push(first[0]);
            console.log(testData);
        }, 2500);

        return (
            <ChatRateChart data={testData}></ChatRateChart>
        )
    });
