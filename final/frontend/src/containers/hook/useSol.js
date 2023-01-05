import { useState, createContext, useContext } from 'react';
import { useQuery, useLazyQuery, useMutation } from '@apollo/client';
import { 
  GET_USER_QUERY, 
  GET_QUESTION_QUERY,
  GET_ALL_QUESTION_OF_USER_QUERY, 
  GET_ALL_QUESTION_DATA_QUERY 
} from '../../graphql/queries';
import { 
  CREATE_USER_MUTATION, 
  CREATE_QUESTION_MUTATION, 
  UPDATE_QUESTION_STATUS_MUTATION, 
  CREATE_QUESTION_DATA_MUTATION, 
  UPDATE_ANSWER_RECORD, 
  SET_USER_NAME_MUTATION 
} from '../../graphql/mutations';

const SolContext = createContext({
	navOpen:false,
  setNavOpen: () => {},
  signedIn: false,
  setSignedIn: () => {},
  account: "",
  setAccount: () => {},
  problemSet: [],
  code:"",
  setCode: () => {},
  getUser: async() => {},
  getQuestion: async() => {},
  getQuestionOfUser: async() => {},
  createUser: async() => {},
  createQuestion: async() => {},
  updateQuestionStatus: async() => {},
  createQuestionData: async() => {},
  updateAnswerRecord: async() => {},
  setUserName: async() => {},
  getAllQuestion: async() => {},

});

const SolProvider = (props) => {

  //States comes here
  const [navOpen, setNavOpen] = useState(false);
  const [signedIn, setSignedIn] = useState(false);
  const [account, setAccount] = useState("");
  const [code, setCode] = useState("")

  //Queries
  const [getUser] = useLazyQuery(GET_USER_QUERY);
  const [getQuestion] = useLazyQuery(GET_QUESTION_QUERY);
  const [getQuestionOfUser] = useLazyQuery(GET_ALL_QUESTION_OF_USER_QUERY);
  const [getAllQuestion] = useLazyQuery(GET_ALL_QUESTION_DATA_QUERY);

  const problemSet = [
    {
      id:1,
      description:"problem 1",  
      isCorrect: true  
    },
    {
      id:2,
      description:"problem 2",
      isCorrect: true
    },
    {
      id:3,
      description:"problem3",
      isCorrect: false
    }
  ]

  //Mutations
  const [createUser] = useMutation(CREATE_USER_MUTATION);
  const [createQuestion] = useMutation(CREATE_QUESTION_MUTATION);
  const [updateQuestionStatus] = useMutation(UPDATE_QUESTION_STATUS_MUTATION);
  const [createQuestionData] = useMutation(CREATE_QUESTION_DATA_MUTATION);
  const [updateAnswerRecord] = useMutation(UPDATE_ANSWER_RECORD);
  const [setUserName] = useMutation(SET_USER_NAME_MUTATION);


  return (
	  <SolContext.Provider
		value={
			{
        navOpen,
        setNavOpen,
        signedIn,
        setSignedIn,
        account,
        setAccount,
        problemSet,
        code,
        setCode,
        getUser,
        getQuestion,
        getQuestionOfUser,
        createUser,
        createQuestion,
        updateQuestionStatus,
        createQuestionData,
        updateAnswerRecord,
        setUserName,
        getAllQuestion,

			}
		}
		{...props}
	  />
  )
}

const useSol = () => useContext(SolContext);
export { SolProvider, useSol };