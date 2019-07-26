import React from 'react';

interface Props {
    onSubmit: (username: string, oauthToken: string) => void;
}

interface State {
    username: string;
    oauthToken: string;
}

const initState: State = {
    username: '',
    oauthToken: '',
};

class LoginFormContainer extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = initState;
    }
    handleFormValueUpdate = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target) {
            return;
        }
        const newStateFrag: Pick<State, any> = {};
        newStateFrag[e.target.name as 'username' | 'oauthToken'] = e.target.value;
        this.setState(() => newStateFrag);
    }

    handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        this.props.onSubmit(this.state.username, this.state.oauthToken);
        this.setState(() => initState);
    }

    render() {
        return (
            <form onSubmit={this.handleFormSubmit}>
                <input type="text" name="username" value={this.state.username} onChange={this.handleFormValueUpdate} placeholder="Username" />
                <input type="password" name="oauthToken" value={this.state.oauthToken} onChange={this.handleFormValueUpdate} placeholder="OAuth Token" />
                <button type="submit">Login</button>
            </form>
        );
    }
}

export default LoginFormContainer;
