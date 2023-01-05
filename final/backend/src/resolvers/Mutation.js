const Mutation = {
  createUser: async (parent, { address }, { UserModel, pubSub }) => {
    console.log("called createUser");
    let user = await UserModel.findOne({ address });
    if(!user)
      user = await new UserModel({ address }).save();
    pubSub.publish("USER_CREATED", {
      userCreated: user,
    });
    return user
 },


  createQuestion: async (parent, { address, questionId }, { QuestionModel, pubSub }) => {
    console.log("called createQuestion");

    let newQuestion = await QuestionModel.findOne({ address, questionId }); 
    if(!newQuestion) 
      newQuestion = await new QuestionModel({address, questionId, isCorrect: false}).save();

    pubSub.publish("QUESTION_CREATED", {
      questionCreated: newQuestion,
    });
    return newQuestion
  },

  createQuestionData: async (parent, { questionId, name, description, example1, example2, code, others, answer }, { QuestionDataModel, pubSub }) => {
    const newQuestionData = new QuestionDataModel({ questionId, name, description, example1, example2, code, others, answer });
    await newQuestionData.save();
    pubSub.publish("QUESTION_DATA_CREATED", {
      questionDataCreated: newQuestionData,
    });
    return newQuestionData
  },

  updateQuestionStatus: async (parent, { address, questionId }, { QuestionModel, pubSub}) => {
    const question = await QuestionModel.findOneAndUpdate(
      { address, questionId },
      {
        $set: {
          isCorrect: true
        },
      }
    );
    pubSub.publish("QUESTION_STATUS_UPDATED", {
      itemUpdated: question,
    });
    const newQuestion = {
      address: question.address,
      questionId: question.questionId,
      isCorrect: true
    }
    return newQuestion;
  },

  updateAnswerRecord: async (parent, { address, questionId, tryId, isCorrect, record}, { QuestionModel, pubSub}) => {
    const oldquestion = await QuestionModel.findOne({address, questionId})
    const oldRecord = oldquestion.answerRecord
    if(!oldRecord)
      oldRecord = []

    const question = await QuestionModel.findOneAndUpdate(
      { address, questionId },
      {
        $set: {
          answerRecord:[...oldRecord, {
            tryId: tryId,
            isCorrect: isCorrect,
            record: record
          }]
        },
      }
    );
    return await QuestionModel.findOne({address, questionId})
  },

  setUserName: async (parent, {address, name},{UserModel, pubSub}) => {
    console.log("called setUserName");
    const user = await UserModel.findOneAndUpdate(
      { address },
      {
        $set: {
          address: address,
          name: name
        },
      }
    );

    return await UserModel.findOne({address}) 
  }

  

}
export default Mutation