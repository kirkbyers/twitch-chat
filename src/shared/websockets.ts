import { TWITCH_CHAT_ADDRESS } from './constants';
import { ChatMessage } from '../interfaces/messages';

export class TwitchWebSocket {
    address: string = TWITCH_CHAT_ADDRESS;
    connection: WebSocket = {} as WebSocket;

    dial = async (): Promise<WebSocket> => {
        const result = new WebSocket(this.address);
        const openPromise: Promise<boolean> = new Promise<boolean>((resolve, reject) => {
            result.addEventListener('open', () => {
                result.addEventListener('error', this.handleWSErrorEvnet);
                result.addEventListener('message', this.handlePingEvent);
                resolve(true);
            });
            result.addEventListener('error', (e) => {
                reject(e);
            });
        });
        await openPromise.catch(() => this.connection);
        this.connection = result;
        return result;
    }

    handleWSErrorEvnet = (e: Event) => {
        console.error(e);
    }

    handlePingEvent = (ev: MessageEvent) => {
        if ((ev.data as string).startsWith('PING')) {
            this.connection.send('PONG :tmi.twitch.tv');
        }
    }

    parseWSMessage = (ev: MessageEvent): ChatMessage[] => {
        const messageLines = ev.data.split('\r\n');
        const resultMessages: ChatMessage[] = messageLines.map((line: string) => {
            let resultMessage: ChatMessage = {} as ChatMessage;
            resultMessage.dateTime = new Date();
            const spaceSplit = line.split(' ');
            switch (spaceSplit[1]) {
                case 'PRIVMSG':
                    const colonSplit = line.split(' :');
                    resultMessage.content = colonSplit[colonSplit.length - 1];
                    resultMessage.stream = spaceSplit[2].substring(1);
                    resultMessage.from = spaceSplit[0].substring(1, spaceSplit[0].indexOf('!'));
                    return resultMessage;
                default:
                    return undefined;
            }
        });
        return resultMessages;
    }

    signIn = (username: string, oauthToken: string) => {
        this.connection.send(`PASS ${oauthToken}`);
        this.connection.send(`NICK ${username}`);
    }

    joinChannel = (channel: string) => {
        this.connection.send(`JOIN #${channel.toLowerCase()}`);
    }

    leaveChannel = (channel: string) => {
        this.connection.send(`PART #${channel.toLowerCase()}`);
    }

    messageChannel = (channel: string, message: string) => {
        this.connection.send(`PRIVMSG #${channel}> :${message}`);
    }
}

export default new TwitchWebSocket();
