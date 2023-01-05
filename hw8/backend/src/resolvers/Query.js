import { checkOutChatBox, makeName } from "./utils";
// import ChatBoxModel from "../models/chatBox";

const Query = {
    chatbox: async (parent, { name1, name2 }, {ChatBoxModel}) => {
        // find it in the database, if not found, return chatbox prototype
        try {
            const chatBox = await ChatBoxModel.findOne({ name: makeName(name1, name2) });
            if (!chatBox) return { name: makeName(name1, name2), messages: [] };
            return chatBox;
        }
        catch (err) {
            console.log(err);
            return { name: makeName(name1, name2), messages: [] };

        }

        // return await ChatBoxModel.findOne({ name: makeName(name1, name2) });


        // return await checkOutChatBox(makeName(name1, name2));
    },
};

export default Query;