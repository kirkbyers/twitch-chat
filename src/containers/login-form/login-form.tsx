import React from 'react';
import { connect } from 'react-redux';
import { AnyAction } from 'redux';
import { Button, Form, Input, Row, Col, Checkbox } from 'antd'

import './login-form.scss';
import { RootReducer } from '../../redux/reducers';
import { getUsername, getOauthToken, getAutoLogin } from '../../redux/selectors/user';
import { updateUsername, updateOauthToken, updateAutoLogin } from '../../redux/actions/user';


interface Props {
    onSubmit: (username: string, oauthToken: string) => void;
    updateUsername: (username: string) => AnyAction;
    updateOauthToken: (token: string) => AnyAction;
    updateAutoLogin: (autoLogin: boolean) => AnyAction;
    username: string;
    oauthToken: string;
    autoLogin: boolean;
}

interface State { }

class LoginFormContainer extends React.Component<Props, State> {
    componentDidMount() {
        if (this.props.autoLogin) {
            this.props.onSubmit(this.props.username, this.props.oauthToken);
        }
    }

    handleFormValueUpdate = (e: React.ChangeEvent<HTMLInputElement> | any) => {
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
            case 'autoLogin':
                this.props.updateAutoLogin(e.target.checked);
                return;
            default:
                console.error(`Input named "${e.target.name}" is not supported by the login form.`);
        }
    }

    handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        this.props.onSubmit(this.props.username, this.props.oauthToken);
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
                            <Checkbox checked={this.props.autoLogin} onChange={this.handleFormValueUpdate} name="autoLogin">Auto Login</Checkbox>
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
    oauthToken: getOauthToken(store),
    autoLogin: getAutoLogin(store),
});
const mapDispatchToProps = {
    updateUsername,
    updateOauthToken,
    updateAutoLogin,
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginFormContainer);
