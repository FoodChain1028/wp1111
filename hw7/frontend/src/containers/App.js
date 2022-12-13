import '../App.css'
// import { Button, Input, message, Tag } from 'antd'
import styled from 'styled-components';
import { useEffect, useState, useRef } from 'react';
import { useChat } from './hooks/useChat';
import ChatRoom from './ChatRoom';
import SignIn from './SignIn';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 500px;
  margin: auto;
`;

const App = () => {
  const { me, status, signedIn, displayStatus } = useChat();
  
  useEffect(() => {
    displayStatus(status)
  }, [status]);

  return (
    <Wrapper> 
      { signedIn ? <ChatRoom /> : <SignIn me={me} /> } 
    </Wrapper>
  ) 
}

export default App;
