import React from 'react';
import { Button } from 'antd';

interface Props {
    downloadData: any;
    JSONName?: string;
}

class JSONDownloadComponent extends React.Component<Props> {
    downloadAnchor: HTMLAnchorElement | null = null;

    handleOnClick = (e: React.MouseEvent) => {
        let dataStr = 'data:text/json;charset=utf-8,';
        let stringifiedData = JSON.stringify(this.props.downloadData);
        dataStr += encodeURIComponent(stringifiedData);
        if (!this.downloadAnchor) {
            return;
        }
        this.downloadAnchor.setAttribute('href', dataStr);
        this.downloadAnchor.click();
    }

    render() {
        return [
            // eslint-disable-next-line
            <a
                hidden={true}
                ref={(el) => { this.downloadAnchor = el; }}
                download={this.props.JSONName ? `${this.props.JSONName}.json` : 'chat-export.json'}
                key="JSON-download-anchor"
            ></a>,
            <Button onClick={this.handleOnClick} key="JSON-download-button" icon="download"></Button>
        ];
    }
}

export default JSONDownloadComponent;
