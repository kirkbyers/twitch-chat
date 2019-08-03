import React from 'react';
import { connect } from 'react-redux';
import { Button, Form, Input } from 'antd';

import './stream-selector.scss';
import { RootReducer } from '../../redux/reducers';
import { getStreams, getSelectedStream } from '../../redux/selectors/messages';
import { addStream, selectStream } from '../../redux/actions/messages';

interface Props {
    streams: string[];
    onAddStream: (stream: string) => void;
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
        this.props.onAddStream(this.state.newStream);
        this.setState(() => ({ newStream: '' }));
    }

    handleStreamClick = (item: string) => (ev: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
        this.props.selectStream(item);
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
                    <Button key={key} shape="round" type={selectedStream === item ? 'default' : 'dashed'} onClick={this.handleStreamClick(item)}>{item}</Button>
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
    selectStream
};

export default connect(mapStateToProps, mapDispatchToProps)(StreamSelectorComponent);
