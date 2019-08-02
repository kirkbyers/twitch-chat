import React from 'react';
import { connect } from 'react-redux';
import { AnyAction } from 'redux';
import { Button, Form, Input, Row, Col } from 'antd'

import './login-form.scss';
import { RootReducer } from '../../redux/reducers';
import { getUsername, getOauthToken } from '../../redux/selectors/user';
import { updateUsername, updateOauthToken } from '../../redux/actions/user';


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
            <Row type="flex" align="middle" justify="center" className="login-form">
                <Col span={12}>
                    <Form onSubmit={this.handleFormSubmit}>
                        <Form.Item>
                            <Input size="large" type="text" name="username" allowClear value={this.props.username} onChange={this.handleFormValueUpdate} placeholder="Username" />
                        </Form.Item>
                        <Form.Item>
                            <Input.Password size="large" type="password" name="oauthToken" value={this.props.oauthToken} onChange={this.handleFormValueUpdate} placeholder="OAuth Token" />
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit">Login</Button>
                        </Form.Item>
                    </Form>
                </Col>
            </Row>
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
