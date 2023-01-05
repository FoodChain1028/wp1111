import mongoose from "mongoose";
//  @UserSchema
//  - user: address
//  - name: String (optional) 
//  - question_status[]: question[]
//  - score: Number
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    address: String, 
    name: String
});
  
//  @QuestionSchema
//  user: address
//  questionId: Number 
//  isCorrect: Boolean
const QuestionSchema = new Schema({
  address: String,
  questionId: Number,
  isCorrect: Boolean,
  answerRecord: [{
    tryId: Number,
    isCorrect: Boolean,
    record: String
  }]

});


//  @QuestionDataSchema
//  questionId: Number 
//  description: String
const QuestionDataSchema = new Schema({
    questionId: Number,
    name: String,
    description: String,
    example1: String,
    example2: String,
    code: String,
    others: String,
    answer: String
});



const UserModel = mongoose.model('User', UserSchema)
const QuestionModel = mongoose.model('Question', QuestionSchema);
const QuestionDataModel = mongoose.model('QuestionData', QuestionDataSchema);


export { UserModel, QuestionModel, QuestionDataModel }
;
