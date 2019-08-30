import React from 'react';
import { storiesOf } from '@storybook/react'
import { Provider } from 'react-redux';

import ChatComponet from '../containers/chat/chat';
import store from '../redux/store';
import { addMessage, addStream, selectStream } from '../redux/actions/messages';

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
        addStream('test-stream');
        store.dispatch(selectStream('test-stream'));
        for (let i = 0; i < 5; i++) {
            addMessage({
                content: `Test message ${i}.`,
                dateTime: new Date(),
                from: 'storybook',
                stream: 'test-stream'
            });
        }
        return (
            <Provider store={store}>
                <ChatComponet initialState={loginTestState}></ChatComponet>
            </Provider>
        )
    })
    .add('with a lot of messages', () => {
        addStream('test-stream');
        store.dispatch(selectStream('test-stream'));
        const addMessages = (counter: number = 0) => {
            addMessage({
                content: `Test message ${counter}.`,
                dateTime: new Date(),
                from: 'storybook',
                stream: 'test-stream'
            });
            counter++;
            setTimeout(() => addMessages(counter), 500);
        }
        addMessages();
        return (
            <Provider store={store}>
                <ChatComponet initialState={loginTestState}></ChatComponet>
            </Provider>
        )
    });