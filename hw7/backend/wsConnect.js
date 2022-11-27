import mongoose from "mongoose";
import {  UserModel, MessageModel, ChatBoxModel } from "./models/chatbox.js"

const makeName = (name, to) => {
    return [name, to].sort().join("_");
}

// 檢查名字是否存在 
// 有 => 呼叫資料
// 沒有 => 建立資料

const validateUser = async (name) => {
    console.log(`Finding ... ${name}`);
    let existing = await UserModel.findOne({ name });
    if (!existing){
        existing = new UserModel({name})
        await existing.save()
        console.log(`Storing New User: ${name}`)
    }
    return existing
}

const validateChatBox = async (name, participants) => {
    let box = await ChatBoxModel.findOne({ name });
    if (!box) {
        box = new ChatBoxModel({ name, users: participants })
        await box.save();
    }
    let result = await box.populate([
        "users",
        { path: 'messages', populate: 'sender' }
    ])

    // console.log('\n============\n' + result.messages );

    return result;
}

const sendData = (data, ws) => {
    console.log(data)
    ws.send(JSON.stringify(data)); 
}

const sendStatus = (payload, ws) => {
    sendData(["status", payload], ws);
}

const broadcastMessage = (wss, data, status ) => {
    wss.client.forEach((client) => {
        sendData(data, client);
        sendStatus(status, client);
    })
}


export default {
    // initData: (ws) => {
    //     Message.find().limit(20).sort({ created_at: -1 })
    //         .exec((err, res) => {
    //             if (err) { throw err; }
    //             // initialize app with existing messages
    //             sendData(["init", res], ws);
    //             // console.log(res)
    //         });
    // },
    onMessage: (ws) => (
        async (byteString) => {
            const {data} = byteString
            // console.log(data)
            const [task, payload] = JSON.parse(data)
            
            switch (task) {
                case "MESSAGE": {
                    const { name, to, body } = payload;
                    console.log(`Recieved task: ${task}`);
                    
                    // save payload to DB
                    const sender = await UserModel.findOne({name: name})
                    const chatBox = await ChatBoxModel.findOne({name: makeName(name, to)});
                    // console.log(chatBox)

                    const message = new MessageModel({
                        'chatBox': chatBox._id,
                        'sender': sender._id,
                        body
                    })

                    try {
                        await message.save(); // update db
                        await ChatBoxModel.updateOne({ _id: chatBox._id }, { $push: {messages: message._id} });
                        console.log("Message saved to DB");
                    }
                    catch(e) {
                        throw new Error("Message DB save error" + e);
                    }
                    break;
                }

                case "CHAT": {
                    console.log(`Recieved task: ${ task }`);

                    const { name, to } = payload;
                    const chatBoxName = makeName(name, to);
                    const existing = await ChatBoxModel.findOne({name: chatBoxName})
                    
                    // 資料庫裡面沒有 name -> 創立一個新的聊天室（User）-> 回傳給前端
                    if (!existing) {
                        const fromUser = await validateUser(name);
                        const toUser = await validateUser(to);
                        console.log(fromUser, toUser);

                        // create box
                        const newBox = await validateChatBox(chatBoxName, [fromUser._id, toUser._id]);
                        // console.log(`newBox: ${newBox}`);

                        await UserModel.updateOne({_id: fromUser._id}, { $push: {chatBoxes: newBox._id}});
                        await UserModel.updateOne({_id: toUser._id}, { $push: {chatBoxes: newBox._id}});
                        console.log(`Create a new chat room`)
                    }
                    // 聊天室存在 -> 回傳資料給前端 to manifest
                    else {
                        const fromUser = await validateUser(name);
                        const toUser = await validateUser(to);
                        const oldBox = await validateChatBox(chatBoxName, [fromUser._id, toUser._id]);
                        // console.log('OldBox:' + oldBox)
                        const accept = []

                        oldBox.users.map((each) => accept.push(each.name))

                        let newMessages = []

                        oldBox.messages.map((each) => {
                            // from
                            if (each.sender.name == accept[0]) {
                                newMessages.push({
                                    name: each.sender.name,
                                    to: accept[1],
                                    body: each.body,
                                })
                            }
                            else {
                                newMessages.push({
                                    name: each.sender.name,
                                    to: accept[0],
                                    body: each.body,
                                })
                            }
                        })
                        // console.log(newMessages);

                        sendData(['init', [newMessages]], ws);
                        sendStatus({
                            type: 'success',
                            msg: 'Message sent.'
                        }, ws);             
                    }
                }

                case "clear": {

                    break;
                }
                default: break
            }    
        }
    )
}