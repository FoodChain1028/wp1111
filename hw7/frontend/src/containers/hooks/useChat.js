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

const ChatProvider = (props) => {
    const [status, setStatus] = useState({});
    const [messages, setMessages] = useState([]);
    const [signedIn, setSignedIn] = useState(false); 
    const [me, setMe] = useState( savedMe || '');

    client.onmessage = (byteString) => {
        const { data } = byteString;
        const [task, payload] = JSON.parse(data);
        console.log(`Recieved task:${task}`);
        switch (task) {
            case "output" : { 
                setMessages(() => [...messages, ...payload]);
                break;
            }
            case "status": {
                setStatus(payload);
                break;
            }
            case "init": {
                setMessages(() => [...messages, ...payload]);
                break;
            }
            case "cleared": {
                setMessages([]);
                break;
            }
            default: break;
        }
    }

    const sendData = async (data) => {
        client.send(JSON.stringify(data));
        console.log(`Message sent to backend`);
    };

    // 通知後端現在要開始聊天
    const startChat = (name, to) => {
        if (!name || !to) {
            throw new Error("Name or to required.");
        }
        sendData([
            "CHAT",
            {name, to}
        ]);
    }

    // 把 data 送到後端
    const sendMessage = (name, to, body) => {
        console.log(name, to, body)
        if (!name || !to || !body) {
            throw new Error("name or to or body required.");
        }
        // update messages and status
        sendData([
            "MESSAGE",
            { name, to, body}
        ]);
    }

    const clearMessages = () => {
        sendData(["clear"]);
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