import mongoose from 'mongoose';

const { Schema } = mongoose;

const ChatBoxSchema = new Schema({
    name: { type: String, require: [true, 'Name field is required'] },
    messages: [{
        sender: {type: String},
        body: {type: String},
    }],
});

const ChatBoxModel = mongoose.model('ChatBox', ChatBoxSchema);

export default ChatBoxModel;

// const UserSchema = new Schema({
//     username: {type: String, require: [true, 'Name field is required']},
//     chatBoxes: [{ type: mongoose.Types.ObjectId, ref: 'ChatBox' }],
//     password: {type: String},
// });

// const UserModel = mongoose.model('User', UserSchema);

// const MessageSchema = new Schema({
//     chatBox: { type: mongoose.Types.ObjectId, ref: 'ChatBox' },
//     sender: { type: mongoose.Types.ObjectId, ref: 'User' },
//     body: { type: String, require: [true, 'Body field is required'] },
// });

// const MessageModel = mongoose.model('Message', MessageSchema);

// const ChatBoxSchema = new Schema({
//     name: { type: String, require: [true, 'Name field is required'] },
//     users: [{ type: mongoose.Types.ObjectId, ref: 'User' }],
//     messages: [{ type: mongoose.Types.ObjectId, ref: 'Message' }],
// });

// const ChatBoxModel = mongoose.model('ChatBox', ChatBoxSchema);

// export { UserModel, MessageModel, ChatBoxModel };