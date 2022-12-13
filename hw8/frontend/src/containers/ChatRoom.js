import styled from 'styled-components';
import { Tabs, Input } from 'antd'
import Title from "../components/Title";
import { useEffect, useState, useRef } from 'react';
import { useChat } from './hooks/useChat';
import Message from '../components/Message.js';
import ChatModal from '../components/ChatModal';

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
    height: 20px
`;

const ChatRoom = () => {
    const { me, messages, setMessages, setFriend, sendMessage, displayStatus, startChat } = useChat();
    const [chatBoxes, setChatBoxes] = useState([]); // { label: 對不同人聊天室的標記, children: 該聊天室下的訊息, key } 
    const [activeKey, setActiveKey] = useState(''); // 目前 hightlight 的聊天室

    const [msg, setMsg] = useState(''); // text input body
    const [msgSent, setMsgSent] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);

    const msgFooter = useRef(null);

    const displayChat = (chat) => (
        messages.length === 0 ? (
            <p style={{ color: '#ccc' }}> No messages... </p>
        ) : (
            <ChatBoxWrapper>
            {
                chat.map(({sender, body}, i) => (
                    <Message isMe={(sender === me)} message={ body } key={i} />
                ))
            }
            <FootRef ref={msgFooter} />
            </ ChatBoxWrapper>
        )
    )

    const extractChat = (chat) => {
        return displayChat(
            messages
            // .filter(({name, body}) => ((name === friend) || (name === me)))
        );
    }

    const createChatBox = (friend) => {
        if (chatBoxes.some(({key}) => key === friend)) {
            throw new Error(friend + "'s chat box has already opened.");
        }
        const chat = extractChat(friend);
        setChatBoxes([...chatBoxes,
        {
            label: friend,
            children: chat,
            key: friend
        }]);
        setMsgSent(true);
        return friend;
    }

    const removeChatBox = (targetKey, activeKey) => {
        const index = chatBoxes.findIndex(({key}) => key === activeKey);
        const newChatBoxes = chatBoxes.filter(({key}) => key !== targetKey);
        setChatBoxes(newChatBoxes);

        return activeKey
            ? activeKey === targetKey
                ? index === 0
                    ? ''
                    : chatBoxes[index - 1].key
                :activeKey
            : '';
    }

    const scrollToBottom = () => {
        msgFooter.current?.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    };

    useEffect(() => {
        messages.forEach(element => {
            console.log(element);
        });
        const activeChatBox = chatBoxes.find(({key}) => key === activeKey)

        if (activeChatBox?.children) {
            activeChatBox.children = displayChat(
                messages.filter(({sender, body}) => (sender === activeKey) || (sender === me))
            )
        }

        if (messages?.length >= 0) {
            setMsgSent(true)
        }
    }, [messages, activeKey, chatBoxes, me]);

    useEffect(() => {
        scrollToBottom()
        setMsgSent(false)
    }, [msgSent])

    return (
        <>
            <Title name={me} />
            {/* <Button type="primary" danger onClick={()=>clearMessages(me, activeKey)} >Clear</Button> */}
            <>
                <ChatBoxesWrapper
                    tabBarStyle={{height: '36px' }}
                    type="editable-card"
                    activeKey={activeKey}

                    onChange={ async (key) => {
                        
                        setActiveKey(key);
                        setFriend(key)

                        const data = await startChat({
                            variables: {
                                name1: me,
                                name2: key,
                            }
                        });
                        const msgs = data.data.createChatBox.messages 
                        setMessages(msgs);
                        // extractChat(key);
                        // startChat(me, key);
                    }}

                    onEdit={(targetKey, action) => {
                        if (action === 'add') setModalOpen(true);
                        else if (action === 'remove') {
                            setActiveKey(removeChatBox(targetKey, activeKey));
                        }
                    }}
                    items={chatBoxes}
                />
                <ChatModal 
                    open={modalOpen}
                    onCreate= { async ({ name }) => {
                        setActiveKey(createChatBox(name));
                        setModalOpen(false);
                        const data = await startChat({
                            variables: {
                                name1: me,
                                name2: name,
                            }
                        });
                        const msgs = data.data.createChatBox.messages 
                        setMessages(msgs);
                    }}
                    onCancel={() => {
                        setModalOpen(false);
                    }}
                ></ChatModal>
            
                <Input.Search
                    value={msg}
                    onChange={(e) => setMsg(e.target.value)}
                    enterButton="Send"
                    placeholder="Type a message here..."
                    onSearch={(msg) =>{ // 按下 send 可以送出訊息
                        if (!msg) {
                            displayStatus({
                                type: 'error',
                                msg: 'Please Enter a message body'
                            })
                            return;
                        }
                        else if (activeKey === '') {
                            displayStatus({
                                type:'error',
                                msg:'Please add a chatbox first.',
                            });
                            setMsg('')
                            return;
                        }
                        // extractChat(me)
                        sendMessage({
                            variables: {
                                name: me,
                                to: activeKey,
                                body: msg
                            }
                        });
                        setMsg('');
                        setMsgSent(true);
                    }}
                ></Input.Search>
            </>
        </>
    );
}
export default ChatRoom;

