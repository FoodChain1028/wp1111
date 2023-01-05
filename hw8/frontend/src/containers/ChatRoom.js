import { useState, useEffect, useRef } from "react";
import { Tabs, Input, message } from "antd";
import styled from "styled-components";
import { useChat } from "./hooks/useChat";
import Title from "../components/Title";
import Message from "../components/Message";
import ChatModal from '../components/ChatModal';

const ChatBoxesWrapper = styled(Tabs)`
    width: 100%;
    height: 300px;
    background: #eeeeee52;
    border-radius: 10px;
    margin: 20px;
    padding: 20px;
`;

const ChatBoxWrapper = styled.div`
    height: calc(240px - 36px);
    display: flex;
    flex-direction: column;
    overflow: auto;
`;

const FootRef = styled.div`
    height: 20px;
`

const ChatRoom = () => {
    const { me, messages, startChat, sendMessage, displayStatus, QueryChatbox, setFriend } = useChat();
    const [chatBoxes, setChatBoxes] = useState([]); // { label, children, key}
    const [activeKey, setActiveKey] = useState("");
    const [modalOpen, setModalOpen] = useState(false);
    const [username, setUsername] = useState('');
    const [msg, setMsg] = useState(''); // text input body
    const [msgSent, setMsgSent] = useState(false);

    const msgRef = useRef(null);
    const msgFooter = useRef(null);

    const renderChat = () => {
        return (messages.length) === 0 ? (
            <p style={{ color: '#ccc' }}>No messages... </p>
        ) : (
            <ChatBoxWrapper>
                {messages.map(({ sender, body }, i) => (
                    <Message key={i} isMe={sender === me} name={sender} message={body} />
                ))}
                <FootRef ref={msgFooter} />
            </ChatBoxWrapper>
        )
    }

    const scrollToBottom = () => {
        msgFooter.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    const createChatBox = async (friend) => {
        if (chatBoxes.some(({ key }) => key === friend)) {
            throw new Error(friend + "'s chat box has already opened.");
        }
        // const chat = extractChat(friend);
        // const chat = renderChat([]);
        // startChat(me, friend);
        await startChat({variables: { name1: me, name2: friend }});
        setChatBoxes([...chatBoxes, { label: friend, children: <></>, key: friend }]);
        return friend;
    }

    const removeChatBox =
        (targetKey, activeKey) => {
            const index = chatBoxes.findIndex(({ key }) => key === activeKey);
            const newChatBoxes = chatBoxes.filter(({ key }) => key !== targetKey);
            setChatBoxes(newChatBoxes);

            
            // const before_index = index -1 === -1 ? 0 : index - 1;
            // setFriend(chatBoxes[index]?.key? chatBoxes[index].key : '');
            // setActiveKey(chatBoxes[index]?.key ? chatBoxes[index].key : '');
            return (
                activeKey ?
                    activeKey === targetKey ?
                        index === 0 ?
                            '' : chatBoxes[index - 1].key
                        : activeKey
                    : ''
            );
        };

    useEffect(() => {
        console.log('msgSent changed');
        scrollToBottom();
        setMsgSent(false);
    }, [msgSent]);

    useEffect(() => {
        // update the children of chatbox
        // check exist
        console.log("render")
        const chat = renderChat();
        setChatBoxes(
            chatBoxes.map((element) => {
                return (element.key === activeKey ? { label: activeKey, children: chat, key: activeKey } : { label: element.label, children: <></>, key: element.key });
            })
        )
        setMsgSent(true);
        // scrollToBottom();

        // async
        //
        // console.log("active key changed");
        // console.log(activeKey);
        // const index = chatBoxes.findIndex(({ key }) => key === activeKey);
        // if (index === -1) {
        //     return;
        // }
        // const chat = renderChat();

        // // wait for the scroll to finish            
        // let newChatBoxes = [...chatBoxes];
        // // console.log(newChatBoxes);

        // newChatBoxes[index].children = chat;
        // // console.log(newChatBoxes);
        // setChatBoxes(newChatBoxes);
        // setMsgSent(true);
        //
        // scrollToBottom();
        // const newChatBoxes = chatBoxes.map(({ label, key }) => {
        //     return { label, children: extractChat(key), key };
        // });

        // setChatBoxes(newChatBoxes);
    }, [messages]);

    // console.log("chatBoxes", chatBoxes);

    return (
        <>
            <Title name={me} />
            <ChatBoxesWrapper
                tabBarStyle={{ height: '36px' }}
                type="editable-card"
                activeKey={activeKey}
                onChange={async (key) => {
                    // await startChat(me, key);
                    // const res = await startChat({variables: { name1: me, name2: key }});
                    // console.log("res", res);
                    setFriend(key);
                    // const res = await getChatbox({variables: { name1: me, name2: key }});
                    // await QueryChatbox();
                    // console.log(messages);

                    console.log("change", key)
                    // console.log("res", res);

                    setActiveKey(key);
                    // extractChat(key);
                    // setUsername(key);
                }}
                onEdit={(targetKey, action) => {
                    if (action === 'add') setModalOpen(true);
                    else if (action === 'remove') {
                        const index = removeChatBox(targetKey, activeKey);
                        console.log("index", index);
                        setActiveKey(index);
                        setFriend(index);
                        
                    }
                }}
                items={chatBoxes}
            />
            <ChatModal
                open={modalOpen}
                displayStatus={displayStatus}
                onCreate={async ({ name }) => {
                    console.log("Create");
                    await createChatBox(name);
                    setFriend(name);
                    setActiveKey(name);
                    // startChat(me, name);
                    // console.log('me: ', me);
                    // console.log('name: ', name);
                    // await startChat({variables: { name1: me, name2: name }});
                    // console.log("res", res);

                    // console.log('chatbox created');

                    // extractChat(name);
                    setModalOpen(false);
                    // setUsername(name);
                }}
                onCancel={() => { setModalOpen(false) }}
            />
            <Input.Search
                value={msg}
                onChange={(e) => setMsg(e.target.value)}
                enterButton="Send"
                placeholder="Type a message here..."
                ref={msgRef}
                onSearch={(msg) => {
                    console.log('me: ', me);
                    // console.log('username: ', username);
                    if (chatBoxes.length === 0) {
                        displayStatus({
                            type: 'error',
                            msg: 'Please open a chat box.'
                        })
                        return
                    }

                    if (!msg) {
                        displayStatus({
                            type: 'error',
                            msg: 'Please enter a username and message body.'
                        })
                        return
                    }

                    // sendMessage({ username, body: msg })
                    // sendMessage(me, activeKey, msg);
                    sendMessage({variables: { name: me, to: activeKey, body: msg }});
                    setMsg('')
                    // setMsgSent(true);
                }}
            ></Input.Search>
        </>
    )
    // <chatBoxesWrapper></>

}

export default ChatRoom;