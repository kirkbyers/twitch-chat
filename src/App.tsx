import React from 'react';
import './App.scss';

import ChatComponent from './containers/chat/chat';

const App: React.FC = () => {
  return (
    <div className="App">
      <ChatComponent></ChatComponent>
    </div>
  );
}

export default App;
