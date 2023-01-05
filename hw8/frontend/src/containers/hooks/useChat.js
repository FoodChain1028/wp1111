 import { createContext, useContext, useEffect, useState } from "react";
import { message } from "antd";
import { useQuery, useLazyQuery, useMutation } from "@apollo/client";
import { CHATBOX_QUERY, CREATE_CHATBOX_MUTATION, CREATE_MESSAGE_MUTATION, MESSAGE_SUBSCRIPTION } from "../../graphql";

const LOCALSTORAGE_KEY = "save-me";
const savedMe = localStorage.getItem(LOCALSTORAGE_KEY);

const ChatContext = createContext({
    status: {},
    me: "",
    signedIn: false,
    messages: [],
    startChat: () => {},
    sendMessage: () => { },
    clearMessages: () => { }
});

// const client = new WebSocket('ws://localhost:4000');
// client.onopen = () => {console.log("Backend socket server connected!")};
// client.onclose = () => {
//     // displayStatus({type: "error", msg: "Backend socket server disconnected!"});
//     message.error({content: "Backend socket server disconnected!", duration: 0.5});
//     console.log("Backend socket server disconnected!")
// };

const ChatProvider = (props) => {
    const [status, setStatus] = useState({});
    const [me, setMe] = useState(savedMe || "");
    const [signedIn, setSignedIn] = useState(false);
    const [messages, setMessages] = useState([]);
    const [password, setPassword] = useState("");
    // const [friend, setFriend] = useState("");
    const [friend, setFriend] = useState("");

    // use lazy query to avoid query on initial render
    const [getChatbox, { data, loading, subscribeToMore }] = useLazyQuery(CHATBOX_QUERY, {
        variables: { name1: me, name2: friend},
    });
    
    // const QueryChatbox = async (friend) => {
    //     await getChatbox({variables: { name1: me, name2: friend }});
    //     console.log(friend)
    //     console.log("query", data);
    //     setMessages(data?.chatbox?.messages);
    // }

    useEffect(() => {
        const QueryChatbox = async () => {            
            await getChatbox();
            console.log("friend", friend)
            console.log("query", data);
            // if (!data) setMessages([]);
            
            // if (!data?.chatbox) {
            //     setMessages([]);
            //     return;
            // }
            // else {
            if (data?.chatbox?.messages) setMessages(data?.chatbox?.messages);
            else setMessages([]);
            // setMessages(data?.chatbox?.messages);
            // }            
        }
        QueryChatbox();
    }, [friend])

    const makeName = (x, y) => {
        return ([x,y].sort().join('_'))
    }

    useEffect(() => {
        try {
            subscribeToMore({
                document: MESSAGE_SUBSCRIPTION,
                variables: { from: me, to: friend },
                updateQuery: (prev, { subscriptionData }) => {
                    console.log("update the query");
                    console.log("sub", subscriptionData)
                    if (!subscriptionData.data) return prev;
                    // setMessages([...messages, subscriptionData.data.message]);
                    const newMessage = subscriptionData.data.message;
                    const chatBoxName = makeName(me, friend);
                    return {
                        chatbox: {
                            messages: [...prev.chatbox.messages, newMessage],
                        },
                    };
                },
            });
            setMessages(data.chatbox.messages);
        }
        catch (err) {
            // console.log(err);
        }
    }, [subscribeToMore, { data, loading }]);

    console.log("data", data);


    useEffect(() => {
        if (signedIn) {
            localStorage.setItem(LOCALSTORAGE_KEY, me);
        }
    }, [me, signedIn]);

    const displayStatus = (s) => {
        if (s.msg) {
            const { type, msg } = s;
            const content = {
                content: msg, duration: 0.5
            }
            switch (type) {
                case 'success':
                    if (msg === "Login successful.") {
                        setSignedIn(true);
                    }
                    message.success(content);
                    break;
                case 'info':
                    message.info(content);
                    break;
                case 'error':
                default:
                    message.error(content);
                    break;
            }
        }
    }

    // console.log(client);
    // client.onmessage = (byteString) => {
    //     const { data } = byteString;
    //     const [task, payload] = JSON.parse(data);
    //     console.log(data);
    //     console.log(payload);
    //     switch (task) {
    //         case 'CHAT': {
    //             setMessages([...payload]);
    //             break;
    //         }
    //         case 'MESSAGE': {
    //             setMessages([...messages, ...payload]);
    //             break;
    //         }
    //         case 'init': {
    //             setMessages(payload);
    //             break;
    //         }
    //         case 'output': {
    //             setMessages(() => [...messages, ...payload]);
    //             break;
    //         }
    //         case 'status': {
    //             setStatus(payload);
    //             break;
    //         }
    //         case 'cleared': {
    //             setMessages([]);
    //             break;
    //         }
    //         default:
    //             break;
    //     }
    // }

    const sendData = async (data) => {
        // await client.send(JSON.stringify(data));
    };

    const sendLoginData = async (username, password) => {
        // sendData(
        //     {
        //         task: "LOGIN",
        //         payload: {
        //             username,
        //             password
        //         }  
        //     }
        // )
    };

    const sendSignUpData = async (username, password) => {
        // sendData(
        //     {
        //         task: "SIGNUP",
        //         payload: {
        //             username,
        //             password
        //         }
        //     }
        // )
    };

    // const startChat = (username, to) => {
    //     if (!username || !to) throw new Error("Name or to required");

    //     sendData({
    //         task: 'CHAT',
    //         payload: {username, to},
    //     });
    // };

    const [startChat] = useMutation(CREATE_CHATBOX_MUTATION);

    const [sendMessage] = useMutation(CREATE_MESSAGE_MUTATION);

    // const sendMessage = (username, to, body) => {
    //     if (!username || !to || !body) throw new Error("Name, to or body required");
    //     sendData({
    //         task: 'MESSAGE',
    //         payload: {username, to, body},
    //     });
    // }

    const clearMessages = () => {
        sendData(["clear"]);
    };

    return (
        <ChatContext.Provider
            value={{
                status, me, signedIn, messages, setMe, setSignedIn, sendLoginData, sendSignUpData, startChat, sendMessage,setFriend, clearMessages, displayStatus, password, setPassword
            }}
            {...props}
        />
    );

};

const useChat = () => useContext(ChatContext);

export { ChatProvider, useChat };