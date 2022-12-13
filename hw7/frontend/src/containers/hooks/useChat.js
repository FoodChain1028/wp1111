import { useState, useEffect, useContext, createContext } from "react";
import { message } from "antd";

// for local storage user names
const LOCALSTORAGE_KEY = "save-me";
const savedMe = localStorage.getItem(LOCALSTORAGE_KEY);

const ChatContext = createContext({
    status: {},
    me: "",
    signedIn: false,
    messages: [],
    startChat: () => {},
    sendMessage: () => {},
    clearMessages: () => {}
});

const client = new WebSocket('ws://localhost:4000');
client.onopen = () => console.log("Connected to DB.");

client.onclose = () => {
    alert("Server Disconnected!!!!")
}

const ChatProvider = (props) => {
    const [status, setStatus] = useState({});
    const [messages, setMessages] = useState([]);
    const [signedIn, setSignedIn] = useState(false); 
    const [me, setMe] = useState( savedMe || '');


    client.onmessage = (byteString) => {
        const { data } = byteString;
        const {task, payload} = JSON.parse(data);
        console.log(`hooks/useChat: Recieved task:${task}, Payload: ${data}`);
        switch (task) {
            case "MESSAGE": {
                setMessages(() => [
                    ...messages, {name: payload.message.name, body: payload.message.body}
                ]);
                console.log(`hooks/useChat: MESSAGE: ${messages}`);
                break;
            }

            case "CHAT": {
                console.log(`hooks/useChat: CHAT: ${payload}`);
                setMessages(payload);
                break;
            }

            case "STATUS": {
                setStatus(payload);
                break;
            }

            case "CLEAR": {
                console.log(`hooks/useChat: CLEAR`)
                setMessages([]);
                break;
            }
            default: break;
        }
    }

    const sendData = async (data) => {
        client.send(JSON.stringify(data));
    };

    // 通知後端現在要開始聊天
    const startChat = (name, to) => {
        if (!name || !to) {
            throw new Error("Name or to required.");
        }
        sendData({
            type: "CHAT",
            payload: {name, to}
        });
    }

    // 把 data 送到後端
    const sendMessage = (payload) => {
        const {name, to, body} = payload;
        if (!name || !to || !body) {
            throw new Error("name or to or body required.");
        }
        console.log(name, to, body)
        // update messages and status
        sendData({
            type: "MESSAGE", 
            payload: { name, to, body}
        });
    }

    const clearMessages = (name, to) => {
        sendData({
            type: "CLEAR",
            payload: {name, to}
        });
    }

    const displayStatus = (payload) => {
      if (payload.msg) {
        const {type, msg} = payload;
        const content = {
          content: msg, 
          duration: 0.5
        }
        switch (type) {
          case 'success':
            message.success(content)
            break
          case 'error':
          default:
            message.error(content)
            break;
    }}}

    useEffect(() => {
        if (signedIn) {
            localStorage.setItem(LOCALSTORAGE_KEY, me)
        }
    }, [me, signedIn]);

    return (
        <ChatContext.Provider
            value={{
                status,
                me,
                signedIn,
                messages,
                setMe,
                setSignedIn, 
                sendMessage,
                startChat, 
                clearMessages,
                displayStatus
            }} 
            {...props}
        />
    )
}

const useChat = () => useContext(ChatContext);

export { ChatProvider, useChat };