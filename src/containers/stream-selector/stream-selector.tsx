import React from 'react';
import { connect } from 'react-redux';
import { Button, Form, Input } from 'antd';

import './stream-selector.scss';
import { RootReducer } from '../../redux/reducers';
import { getStreams, getSelectedStream } from '../../redux/selectors/messages';
import { addStream, leaveStream, selectStream } from '../../redux/actions/messages';

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

class StreamSelectorComponent extends React.Component<Props, State>{
    constructor(props: Props) {
        super(props);
        this.state = {
            newStream: ''
        };
    }

    handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newStream = e.target.value;
        this.setState(() => ({ newStream }));
    }

    handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        this.props.onAddStream(this.state.newStream.toLowerCase().trim());
        this.setState(() => ({ newStream: '' }));
    }

    handleStreamClick = (item: string) => (ev: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
        this.props.selectStream(item);
    }

    handleLeaveStreamClick = (item: string) => (ev: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
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
