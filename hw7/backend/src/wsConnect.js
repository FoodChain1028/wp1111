import {  UserModel, MessageModel, ChatBoxModel } from "../models/chatbox.js"

const makeName = (name, to) => {
    return [name, to].sort().join("_");
}

// 檢查名字是否存在 
// 有 => 呼叫資料
// 沒有 => 建立資料

const validateUser = async (name) => {
    console.log(`Finding ... ${name}`);
    const existing = await UserModel.findOne({ name });
    if (!existing){
        const newUser = new UserModel({ name }).save()
        console.log(`Storing New User: ${name}`)
        return newUser;
    }
    return existing
};

// 這邊的 name 會直接傳入 Alice_Bob
const validateChatBox = async (name, participants) => {
    let box = await ChatBoxModel.findOne({ name });
    if (!box) {
        box = await new ChatBoxModel({name, users: participants}).save();
    }
    return box.populate([
        "users",
        { path: 'messages', populate: 'sender' }
    ]);
}

const sendData = (data, ws) => {
    ws.send(JSON.stringify(data)); 
}

const sendStatus = (payload, ws) => {
    sendData(["STATUS", payload], ws);
}

const broadcastMessage = (wss, data, status ) => {
    wss.client.forEach((client) => {
        sendData(data, client);
        sendStatus(status, client);
    })
}

const getModelsFromName = async (name, to) => {
    const sender = await validateUser(name);
    const receiver = await validateUser(to);
    const chatBoxName = makeName(name, to);
    const chatBox = await validateChatBox(chatBoxName, [sender, receiver]);
    return {sender, receiver, chatBox};
}

const chatBoxes = {} // global variable

export default {
    // 3 Main Tasks:
    // CHAT: 開啟新的 chatbox 或是切換 active chatbox, 需要重 新 load 相關的 messages
    // MESSAGE: 當新的訊息送到後端時，要去根據此 chatbox name 通知相關的 ChatRooms
    // CLEAR: 當清除對話指令送達時，要去根據此 chatbox name 通知相關的 ChatRooms
    // 以上三種 tasks 回傳給前端之後，都要伴隨一個 STATUS 的 notice
    onMessage: (ws) => (
        async (byteString) => {
            const { data } = byteString;
            const raw = JSON.parse(data);
            const task = raw.type;
            const payload = raw.payload;
            console.log(`wsConnect: task: ${task}, payload: ${payload}`);

            switch (task) {
                case "MESSAGE": {
                    const { name, to, body } = payload;
                    console.log(`Recieved task: ${task}`);
                    console.log(`MESSAGE: ${name}, ${to}, ${body}`);
                    // save payload to DB
                    const { sender, receiver, chatBox } = await getModelsFromName(name, to);
                    const chatBoxName = makeName(name, to)
                    // console.log(chatBox)

                    const message = new MessageModel({
                        chatBox,
                        sender,
                        body
                    })
                    console.log(`MESSAGE: new msg \n ${message}`)
                    // save message into db
                    try {
                        await message.save(); // update message into db
                        console.log("Message saved to DB");
                    }
                    catch(e) {
                        throw new Error("Message - save error" + e);
                    }
                    // save chabox into db
                    

                    chatBox.messages.push(message);
                    console.log(chatBox.messages);
                    try {
                        await chatBox.save();
                    }
                    catch(e) {
                        throw new Error("Message - 'chatBox' save error")
                    }
                    console.log("MESSAGE: " + chatBox.messages)
                    console.log("In MESSAGE: send msg")
                    console.log("110" + chatBoxes[chatBoxName]);

                    chatBoxes[chatBoxName].forEach((client) => {
                        client.send( JSON.stringify({
                            task: "MESSAGE",
                            payload: {
                                message: { name, body }
                            }
                        }))

                        client.send(JSON.stringify({
                            task: "STATUS",
                            payload: {
                                type: "success",
                                msg: "Sent Message"
                            }
                        }))
                    })
                    break;
                }

                case "CHAT": {
                    console.log(`Recieved task: ${ task }`);
                    console.log("Payload: " + payload);
                    const { name, to } = payload;
                    const chatBoxName = makeName(name, to);
                    // const existing = await ChatBoxModel.findOne({name: chatBoxName})
                    // console.log(ws.box)

                    // ChatRoom 轉換時或是 web socket 因故關閉，要將 webSocket 從舊的 chatBoxes[chatBoxName] 中拿掉
                    if (ws.box !== "" && chatBoxes[ws.box])
                        // user(ws) was in another chatbox 
                        chatBoxes[ws.box].delete(ws);
                    
                    // reset ws.box
                    ws.box = chatBoxName
                    
                    // 如果不曾有過 chatBoxName 的對話，將 chatBoxes[chatBoxName] 設定為 empty Set
                    if (!chatBoxes[chatBoxName])
                        // 代表新的紀錄
                        chatBoxes[chatBoxName] = new Set();
                    
                    // add this open connection into chatbox
                    chatBoxes[chatBoxName].add(ws) 
    
                    console.log(ws.box)
                    // 資料庫裡面沒有 name -> 創立一個新的聊天室（User）-> 回傳給前端
                    // console.log(name);
                    const { sender, receiver, chatBox } = await getModelsFromName(name, to)
                    // console.log(sender);
                    const messages = chatBox.messages.map((body) => { 
                        console.log(161, body);
                        return {name: body.sender.name, body:body.body}
                    })

                    console.log("in CHAT map messages", messages)
                    await chatBoxes[chatBoxName].forEach((client) => {
                        client.send(JSON.stringify(
                            {
                                task: "CHAT",
                                payload: messages
                            }
                        ))
                    })
                    break;
                }

                case "CLEAR": {
                    const {name, to} = payload;
                    const chatBoxName = makeName(name, to);

                    const {sender, receiver, chatBox} = await getModelsFromName(name, to);
                    chatBox.messages = [];
                    chatBox.save();

                    // chatBoxes[chatBoxName].forEach((client) => {
                    //     client.send(JSON.stringify(
                    //         { task: 'CLEAR',
                    //           payload: {} }
                    //         ))
                    //     })
                    break;
                }
                default: break
            }    
        }
    )
}