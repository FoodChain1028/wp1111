const Query = {

  user: async (parent, { address }, { UserModel }) => {
    let user = await UserModel.findOne({ address });
    if(!user)
      user = await new UserModel({ address }).save();
    return user
  },

  question: async (parent, { address, questionId }, {QuestionModel}) => {
    let question = await QuestionModel.findOne({address, questionId });
    if(!question)
      question = await new QuestionModel({ address, questionId }).save()
    return question;
  },

  questionData: async (parent, params, {QuestionDataModel}) => {
    const questionData = await QuestionDataModel.find().sort();
    return questionData;
  },

  allQuestionOfUser: async (parent, { address }, {QuestionModel}) => {
    const allQuestion = await QuestionModel.find({address}).sort();
    console.log("called allQuestionUser");
    return allQuestion;
  },
  
  allQuestionData: async (parent, params, { QuestionDataModel }) => {
    let questionData = await QuestionDataModel.find();
    console.log("called allQuestionData");
    return questionData
  },


}
export default Query;