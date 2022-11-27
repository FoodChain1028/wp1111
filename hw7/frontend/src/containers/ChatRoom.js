import styled from 'styled-components';
import { Tabs, Input, Tag } from 'antd'
import Title from "../components/Title";
import { useEffect, useState, useRef } from 'react';
import { useChat } from './hooks/useChat';
import Message from '../components/Message';
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
    height: calc(240px - 360px);\
    display: flex;
    flex-direction: column;
    overflow: auto;
`;

const FootRef = styled.div`
    height: 20px
`;

const ChatRoom = () => {
    const { me, messages, sendMessage, displayStatus, startChat } = useChat();
    const [chatBoxes, setChatBoxes] = useState([]); // { label: 對不同人聊天室的標記, children: 該聊天室下的訊息, key } 
    const [activeKey, setActiveKey] = useState(''); // 目前 hightlight 的聊天室

    const [toName, setToName] = useState('');

    const [msg, setMsg] = useState(''); // text input body
    const [msgSent, setMsgSent] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);

    const msgFooter = useRef(null);

    const displayChat = (name, chat) => {
        <ChatBoxWrapper>
            <div className="App-messages">
                {
                    chat.length === 0 ? 
                    (
                        <p style={{ color: '#ccc' }}> No messages... </p>
                    ) 
                        : 
                    (
                        chat.map
                        (({ name, msg }, i) => 
                        ( <Message name={name} isMe={name === me} message={msg} key={i}/>))
                    )
                }
            </div>
            <FootRef ref={ msgFooter }/>
        </ChatBoxWrapper>
    }

    const extractChat = (friend, chat) => {
        return displayChat(
            friend, messages
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
        console.log(messages);
        
        if (messages.length !== 0) {
            const show = displayChat(me, messages)

            let ans = []
            console.log('=======')

            chatBoxes.map((each) => {
                console.log(each)
                if (each.label === activeKey) {
                    ans.push({
                        label: activeKey, 
                        children: show, 
                        key: activeKey
                    })
                }
                else {
                    ans.push(each)
                }
            })
            setChatBoxes(() => ans)
            scrollToBottom()
            setMsgSent(false)
        }
        else {
            displayChat(me, [])
        }
    }, [messages]);

    return (
        <>
            <Title name={me} />
            <>
                <ChatBoxesWrapper
                    tabBarStyle={{height: '36px' }}
                    type="editable-card"
                    activeKey={activeKey}

                    onChange={(key) => {
                        setActiveKey(key);
                        extractChat(key);
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
                    onCreate={({ name }) => {
                        setActiveKey(createChatBox(name));
                        setModalOpen(false);
                        setToName(name);
                        startChat(me, name);
                        // extractChat(name, messages);
                    }}
                    onCancel={() => {
                        setModalOpen(false);
                    }}
                />
            </>
            
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
                    console.log(messages);
                    extractChat(me)
                    sendMessage(me, toName, msg);
                }}
            ></Input.Search>
        </>
    );
}
export default ChatRoom;

