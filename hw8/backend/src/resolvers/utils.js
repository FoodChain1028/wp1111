import ChatBoxModel from "../models/chatBox";

const makeName = (name1, name2) => ([name1, name2].sort().join("_"));
const checkOutChatBox = async (name) => {
    let box = await ChatBoxModel.findOne({ name });
    if (!box)
        box = await new ChatBoxModel({ name }).save();
    return box;
};

export { makeName, checkOutChatBox }