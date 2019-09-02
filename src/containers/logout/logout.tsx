import React from 'react';
import { Button } from 'antd';
import { connect } from 'react-redux';

import { setIsLoggedIn, updateAutoLogin } from '../../redux/actions/user';
import twitchWebSocket from '../../shared/websockets';

interface Props {
    setIsLoggedIn: (isLoggedIn: boolean) => void;
    updateAutoLogin: (autoLoggin: boolean) => {};
}

interface State { }

class LogoutButton extends React.Component<Props, State> {
    logoutUser = (e: React.MouseEvent) => {
        this.props.updateAutoLogin(false);
        twitchWebSocket.close();
        this.props.setIsLoggedIn(false);
    }

    render() {
        return (
            <Button onClick={this.logoutUser}>Logout</Button>
        )
    }
}

const mapStateToProps = () => ({});
const mapDispatchToProps = {
    setIsLoggedIn,
    updateAutoLogin,
};

export default connect(mapStateToProps, mapDispatchToProps)(LogoutButton);
