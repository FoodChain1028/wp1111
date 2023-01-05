import { gql } from '@apollo/client';

export const CREATE_USER_MUTATION = gql`
mutation CreateItem($address: String!) {
  createUser(address: $address) {
    address
    name
  }
}
`

export const CREATE_QUESTION_MUTATION = gql`
mutation CreateQuestion(
  $address: String!
  $questionId: Int!
) {
  createQuestion(
    address: $address,
    questionId: $questionId
  ) {
    address
    questionId
    isCorrect
  }
}
`

export const UPDATE_QUESTION_STATUS_MUTATION = gql`
mutation updateQuestionStatusMutation(
  $address: String!
  $questionId: Int!
) {
  updateQuestionStatus(
    address: $address,
    questionId: $questionId
  ) {
    address
    questionId
    isCorrect
    answerRecord
  }
}
`

export const CREATE_QUESTION_DATA_MUTATION = gql`
mutation createQuestionData(
  $address: String!,
  $questionId: Int!, 
  $name: String!, 
  $description: String!, 
  $example1: String!, 
  $example2: String!, 
  $code: String!, 
  $others: String!,
  $answer: String!
) {
  createQuestionData(
    address: $address,
    questionId: $questionId,
    name: $name,
    description: $decription, 
    example1: $example1, 
    example2: $example2, 
    code: $code, 
    others: $others
    answer: $answer
  ) {
    address
    questionId
    name
    description:
    example1
    example2
    code 
    others
    answer
  }
}
`

export const UPDATE_ANSWER_RECORD = gql`
mutation updateAnswerRecord(
  $address: String!,
  $questionId: Int!,
  $tryId: Int!,
  $isCorrect: Boolean!,
  $record: String! 
) {
  updateAnswerRecord(
    address: $address,
    questionId: $questionId,
    tryId: $tryId,
    isCorrect: $isCorrect,
    record: $record
  ) {
    address
    questionId
    isCorrect
    answerRecord{
      tryId
      isCorrect
      record
    }
  }
}
`

export const SET_USER_NAME_MUTATION = gql`
mutation setUserName($address: String!, $name: String!) {
  setUserName(address: $address, name: $name) {
    address
    name
  }
}
`

