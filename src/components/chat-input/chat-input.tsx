import React from 'react';

interface Props {
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => any;
    onSubmit: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => any;
    value: any;
}

const ChatInputComponent: React.SFC<Props> = ({ onChange, onSubmit, value }) => (
    <div className="input">
        <input className="input-field" type="text" value={value} onChange={onChange} />
        <button className="input-button" type="button" onClick={onSubmit}>Send</button>
    </div>
);


export default ChatInputComponent;
