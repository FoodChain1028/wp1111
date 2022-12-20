import { useChat } from './hooks/useChat';
import { Input, Tabs} from 'antd';
import { useState, useEffect, useRef } from 'react';
import Title from "../components/Title";
import Message from "../components/Message";
import styled from 'styled-components';
import ChatModal from "../components/ChatModal";
import { CHATBOX_QUERY, MESSAGE_SUBSCRIPTION } from "../graphql/index"
import { useLazyQuery, useQuery } from '@apollo/client';

const ChatBoxesWrapper = styled(Tabs)`
  width: 100%;
  height: 300px;
  background: #eeeeee52;
  border-radius: 10px;
  margin: 20px;
  padding: 20px;
  overflow: auto; 
`;

const ChatBoxWrapper = styled.div`
  height: calc(240px - 36px);
  display: flex;
  flex-direction: column;
  overflow: auto;
  `;
  
  const FootRef = styled.div`
  height: 20px;
  `;
  
  const ChatRoom = () => {
    
  const { me, friend, messages, sendMessage, displayStatus, startChat, setFriend, setMessages, data, loading, subscribeToMore } = useChat();
    
    
  const [chatBoxes, setChatBoxes] = useState([]); //{label, children, key}
  const [activeKey, setActiveKey] = useState("");
  
  const [msgSent, setMsgSent] = useState(false);
  const [msg, setMsg] = useState("");
  const [isBoxChange, setIsBoxChange] = useState(false); 

  const [getChatBox, { lazyData, lazyLoading }] = useLazyQuery(CHATBOX_QUERY);

  const msgFooter = useRef(null);
  const [modalOpen, setModalOpen] = useState(false);

  const renderChat = (chat) => (  
      <ChatBoxWrapper>
            { loading  ? 
              <p style={{ color: '#ccc' }}>Loading...</p>
              :
              chat.length === 0 ? 
                
              (<p style={{ color: '#ccc' }}>No messages...</p> ): 
                
                ( 
                  chat.map(({sender, body}, i) => (
                      <Message isMe={sender === me} name={sender} message={body} key={i}/>
                  ))
                )
              
            }
        <FootRef ref={ msgFooter }/>
      </ChatBoxWrapper>
  ); 

  const extractChat = (friend) => {
    return renderChat(
      messages.filter(({name}) => 
        (
          (name === friend) || (name === me)))
        );
  }

  const createChatBox = (friend) => {
    if (chatBoxes.some(({key}) => key === friend)) {
        displayStatus({
          type: 'error',
          msg: `${friend}'s chat box has already opened.`
        })
        return;
    }
    const chats = extractChat(friend);
    setChatBoxes([...chatBoxes,
      { label: friend, children: chats, key: friend }]);
    setMsgSent(true);
    return friend;
  };

  const removeChatBox = (targetKey, activeKey) => {
    const index = chatBoxes.findIndex(({key}) => key===activeKey);
    const newChatBoxes = chatBoxes.filter(({key}) => key !== targetKey);
    setChatBoxes(newChatBoxes);

    return(
      activeKey? 
        activeKey === targetKey? 
            index === 0? 
            '' : chatBoxes[index - 1].key 
        : activeKey 
      : ''
    )
  };

  const scrollToBottom = () => {
    msgFooter.current?.scrollIntoView
    ({ behavior: 'smooth', block: "start" });
  };

  const handleOnCreate = async (name) => {
    setFriend(name);
    setActiveKey(createChatBox(name));
    
    setModalOpen(false)
    const newChatbox = await startChat({
      variables:{
        name1: me,
        name2: name,
      }
    })
    
    if(!newChatbox) return
    const oldMessages = newChatbox.data.createChatBox.messages
    setMessages(() => oldMessages);
    setMsgSent(true);
  };

  useEffect(() => {
    console.log("MESSAGE LOG HERE!======================")
    // messages.map((each) => {
    //   console.log(each);
    // })
    

    const activeChatBox = chatBoxes.find(({key}) => key === activeKey)
    if (activeChatBox?.children) {
      activeChatBox.children = renderChat
      (messages.filter
          (({sender, body}) => ((sender === activeKey) || (sender === me))))
    }
    if(messages.length !== 0){
      setMsgSent(true);
    }
    
  },[messages, chatBoxes, msgSent]);

  useEffect(() => {
    setMsgSent(false);
    scrollToBottom();
    }, [msgSent, messages, setActiveKey, activeKey]
  );

  // useEffect(() => {
  //   console.log(1);
  //   if (loading) console.log("Loading!");
  //   if (!data) return;
  //   else if (data.chatBox.name.length < 3) return;
  //   else {
  //     // console.log(lastData);
  //     // if (lastData?.chatBox?.messages?.length === data?.chatBox.messages.length ) return;
  //     // setLastData(data);
  //     const msgs = data.chatBox.messages.filter(({sender}) => (sender === me || sender === activeKey));
  //     setMessages(msgs);
  //   }
  //   setIsBoxChange(false)
  // }, [isBoxChange]);

  useEffect(() => {
    console.log(2);
    if (loading) console.log("Loading!");
    if (!data) return;
    else if (data.chatBox.name.length < 3) return;
    else {
      const msgs = data.chatBox.messages.filter(({sender}) => (sender === me || sender === activeKey));
      setMessages(msgs);
    }
    setMsgSent(false);
    scrollToBottom();
  }, [msgSent, data]);

  return (
    <>
      <Title name = {me} />
        <ChatBoxesWrapper 
          tabBarStyle={{height: '36px'}}
          type="editable-card"
          activeKey={activeKey}
          onChange={(key) => {
            setActiveKey(key);
            setFriend(key);
            setIsBoxChange(true);
          }}
          onEdit = {(targetKey, action) => {
            if(action === 'add') 
              setModalOpen(true);  
            else if (action === 'remove') {
              setActiveKey(removeChatBox(targetKey, activeKey))
          }}}
          items={chatBoxes}
        />

        
        <ChatModal 
            open = {modalOpen}
            onCreate = {async ({name}) => handleOnCreate(name)}
            onCancel={() => { setModalOpen(false) }}
        />      

        {/* Type message */}
        <Input.Search
          value = {msg}
          onChange = {(e) => setMsg(e.target.value)}
          enterButton="Send"
          placeholder="Type a message here..."
          // ref = {bodyRef}
          onSearch = {(msg) => {
            if(activeKey === ""){
              displayStatus({
                type: 'error',
                msg: 'Please open a chatroom.'
              })
              return;
            }
            if(!msg){
              displayStatus({
                type:'error',
                msg: 'Please enter a username and a message body'
              })
              return
            }
            else{
              sendMessage({ variables:{from: me, to: activeKey, body: msg }});
              setMsg('');
              setMsgSent(true);
              displayStatus({
                type:'success',
                msg: 'Successfully Sent!!!'
              })
            }
            }}   
        ></Input.Search>
      </>
  
  )
}

export default ChatRoom;