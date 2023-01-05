import { gql } from '@apollo/client';

const GET_USER_QUERY = gql
`
query user(
  $address: String!
) {
  user(address:$address){
    address
    name
    }
  }
`;

const GET_QUESTION_QUERY = gql
`
query question(
  $address: String!
  $questionId: Int!
) {
  question(
    address: $address, 
    questionId: $questionId
  ){
    address
    questionId
    isCorrect
    answerRecord {
      tryId
      isCorrect
      record
      }
    }
}
`;

const GET_ALL_QUESTION_OF_USER_QUERY = gql
`
query allQuestionOfUser(
  $address: String!
) {
  allQuestionOfUser(
    address:$address, 
){
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
`;

const GET_ALL_QUESTION_DATA_QUERY = gql
`
query getAllQuestionData{
  allQuestionData{
    questionId
    name
    description
    example1
    example2
    code
    others
    answer
    }
  }
`;

export {GET_USER_QUERY, GET_QUESTION_QUERY, GET_ALL_QUESTION_OF_USER_QUERY, GET_ALL_QUESTION_DATA_QUERY}
