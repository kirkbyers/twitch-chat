# Twitch Chat Stats

This is a react app that interacts with the Twitch API directly using a provided username and oauth token for the twitch API.

## Getting Started

Run `npm i && npm start` to get app up and running.

This app was created with `create-react-app`. See the [create-react-app README](./CRA_README.md) for more information.

Upon successfully starting the app, you'll be greeted with a login form. Provide a username and client app token for the Twitch API. For information on obtaining a Twitch API client app token, see the [Twitch API docs](https://dev.twitch.tv/docs/authentication/#registration).

## Functionality

- Connect to multiple stream's chat
- View chat metrics in real time
- Send messages to chat

### Todo

- Export chat stats and messages as JSON file
- Detect anomalous chat activity in near real time
- Clip a stream on anomaly detection
