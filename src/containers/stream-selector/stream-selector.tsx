import React from 'react';

import './stream-selector.scss';
import { RootReducer } from '../../redux/reducers';
import { getStreams, getSelectedStream } from '../../redux/selectors/messages';
import { addStream, selectStream } from '../../redux/actions/messages';
import { connect } from 'react-redux';

interface Props {
    streams: string[];
    onAddStream: (stream: string) => void;
    selectStream: (stream: string) => any;
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
        return (
            <div className="stream-selector">
                <ul className="stream-list">
                    {this.props.streams.map((item, key) => (
                        <li key={key} onClick={this.handleStreamClick(item)} value={item}>{item}</li>
                    ))}
                </ul>
                <form onSubmit={this.handleFormSubmit}>
                    <input type="text" name="stream" onChange={this.handleInputChange} value={this.state.newStream} />
                    <button type="submit" hidden={true}></button>
                </form>
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
