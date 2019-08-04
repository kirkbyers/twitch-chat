import React from 'react';
import { storiesOf } from '@storybook/react'
import { Provider } from 'react-redux';

import ChatComponet from '../containers/chat/chat';
import store from '../redux/store';
import { addMessage, addStream } from '../redux/actions/messages';

const loginTestState = {
    isLoggedIn: true
};

storiesOf('ChatComponent', module)
    .add('with no messages', () => (
        <Provider store={store}>
            <ChatComponet initialState={loginTestState}></ChatComponet>
        </Provider>
    ))
    .add('with a few messages', () => {
        store.dispatch(addStream('test-stream'));
        for (let i = 0; i < 5; i++) {
            store.dispatch(addMessage({
                content: `Test message ${i}.`,
                dateTime: new Date(),
                from: 'storybook',
                stream: 'test-stream'
            }));
        }
        return (
            <Provider store={store}>
                <ChatComponet initialState={loginTestState}></ChatComponet>
            </Provider>
        )
    });