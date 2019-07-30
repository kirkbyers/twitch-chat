import React from 'react';
import { RootReducer } from '../../redux/reducers';
import { getUsername, getOauthToken } from '../../redux/selectors/user';
import { updateUsername, updateOauthToken } from '../../redux/actions/user';
import { connect } from 'react-redux';
import { AnyAction } from 'redux';

interface Props {
    onSubmit: (username: string, oauthToken: string) => void;
    updateUsername: (username: string) => AnyAction;
    updateOauthToken: (token: string) => AnyAction;
    username: string;
    oauthToken: string;
}

interface State { }

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
        switch (e.target.name) {
            case 'username':
                this.props.updateUsername(e.target.value);
                return;
            case 'oauthToken':
                this.props.updateOauthToken(e.target.value);
                return;
            default:
                console.error(`Input named "${e.target.name}" is not supported by the login form.`);
        }
    }

    handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        this.props.onSubmit(this.props.username, this.props.oauthToken);
        this.setState(() => initState);
    }

    render() {
        return (
            <form onSubmit={this.handleFormSubmit}>
                <input type="text" name="username" value={this.props.username} onChange={this.handleFormValueUpdate} placeholder="Username" />
                <input type="password" name="oauthToken" value={this.props.oauthToken} onChange={this.handleFormValueUpdate} placeholder="OAuth Token" />
                <button type="submit">Login</button>
            </form>
        );
    }
}

const mapStateToProps = (store: RootReducer) => ({
    username: getUsername(store),
    oauthToken: getOauthToken(store)
});
const mapDispatchToProps = {
    updateUsername,
    updateOauthToken
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginFormContainer);
