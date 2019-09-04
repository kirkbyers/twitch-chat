import React from 'react';
import { connect } from 'react-redux';
import { Button, Form, Input } from 'antd';

import './stream-selector.scss';
import { RootReducer } from '../../redux/reducers';
import { getStreams, getSelectedStream } from '../../redux/selectors/messages';
import { addStream, leaveStream, selectStream } from '../../redux/actions/messages';
import twitchWebSocket from '../../shared/websockets';

interface Props {
    streams: string[];
    onAddStream: (stream: string) => void;
    onLeaveStream: (stream: string) => void;
    selectStream: (stream: string) => any;
    selectedStream: string;
}

interface State {
    newStream: string;
}

const loadLocalStorageStreams = (): string[] => {
    const localStorageStreams = localStorage.getItem('messages_streams') || '[]';
    return JSON.parse(localStorageStreams);
}

class StreamSelectorComponent extends React.Component<Props, State>{
    constructor(props: Props) {
        super(props);
        this.state = {
            newStream: ''
        };
    }

    componentDidMount() {
        if (this.props.streams.length === 0) {
            const localStream = loadLocalStorageStreams();
            for (const stream of localStream) {
                twitchWebSocket.joinChannel(stream);
                this.props.onAddStream(stream);
            }
        }
        if (!this.props.selectedStream) {
            const storedSelectedStream = localStorage.getItem('messages_selectedStream');
            if (!!storedSelectedStream) {
                this.props.selectStream(storedSelectedStream);
            }
        }
    }

    handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newStream = e.target.value;
        this.setState(() => ({ newStream }));
    }

    handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const streamName = this.state.newStream.toLowerCase().trim();
        twitchWebSocket.joinChannel(streamName);
        this.props.onAddStream(streamName);
        this.setState(() => ({ newStream: '' }));
        if (!this.props.selectedStream) {
            this.props.selectStream(streamName);
        }
    }

    handleStreamClick = (item: string) => (ev: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
        this.props.selectStream(item);
    }

    handleLeaveStreamClick = (item: string) => (ev: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
        twitchWebSocket.leaveChannel(item);
        this.props.onLeaveStream(item);
    }

    render() {
        const { selectedStream } = this.props;
        return (
            <div className="stream-selector">
                <Form onSubmit={this.handleFormSubmit}>
                    <Input type="text" name="stream" allowClear onChange={this.handleInputChange} value={this.state.newStream} placeholder="Add Stream Chat" />
                    <Button htmlType="submit" hidden={true}></Button>
                </Form>
                {this.props.streams.map((item, key) => (
                    <Button.Group key={key}>
                        <Button shape="round" type={selectedStream === item ? 'default' : 'dashed'} onClick={this.handleStreamClick(item)}>{item}</Button>
                        <Button shape="round" type={selectedStream === item ? 'default' : 'dashed'} icon="close" onClick={this.handleLeaveStreamClick(item)} />
                    </Button.Group>
                ))}
            </div>
        );
    };
}

const mapStateToProps = (state: RootReducer) => {
    return {
        streams: getStreams(state),
        selectedStream: getSelectedStream(state)
    }
};

const mapDispatchToProps = {
    onAddStream: addStream,
    onLeaveStream: leaveStream,
    selectStream
};

export default connect(mapStateToProps, mapDispatchToProps)(StreamSelectorComponent);
