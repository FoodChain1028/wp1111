import ChatBox from "./ChatBox";
import { makeName, checkOutChatBox } from "./utils";

const Mutation = {
    createChatBox: async (parent, { name1, name2 }) => {
        return await checkOutChatBox(makeName(name1, name2));
    },
    createMessage: async (parent, { name, to, body }, { pubsub }) => {
        const chatBoxName = makeName(name, to);
        const chatBox = await checkOutChatBox(chatBoxName);
        const newMsg = { sender: name, body };
        chatBox.messages.push(newMsg);
        await chatBox.save();

        pubsub.publish(`chatBox ${chatBoxName}`, { message: newMsg });

        return newMsg;
    },
    // createMessage: async (parent, { name, to, body }, { pubsub } )
    // => {
    //     const chatBox = await checkOutChatBox(makeName(name, to), ChatBoxModel);

    //     // ChatBox.messages
    // }
};

export default Mutation;