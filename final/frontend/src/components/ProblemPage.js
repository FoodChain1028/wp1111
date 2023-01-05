import { forwardRef, useEffect, useState } from 'react';
import DrawerHeader from './DrawerHeader';
import { useParams, useNavigate } from 'react-router-dom'
import { useSol } from '../containers/hook/useSol'
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Editor from "@monaco-editor/react";
import Button from '@mui/material/Button';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { border, margin, sizing, width } from '@mui/system';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { useQuery } from '@apollo/client';
import { GET_ALL_QUESTION_DATA_QUERY, GET_QUESTION_QUERY } from '../graphql/queries';

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const typoStyle = {
  marginLeft: '20px',
  marginTop: '10px'
};

const ProblemPage = () => {

  const [open, setOpen] = useState(false);
  const [correct, setCorrect] = useState(false);
  const { getAllQuestion } = useSol();

  const { id } = useParams();
  const { account, problemSet, setCode, code, navOpen, updateAnswerRecord, updateQuestionStatus } = useSol();
  const navigate = useNavigate();
  const answer = "124";
  // deal with css
  let drawerWidth = 290;
  let eWidth = 290;
  let width = `75%`;
  console.log(account);

  const res1 = useQuery(GET_ALL_QUESTION_DATA_QUERY);
  console.log(account, id);
  const res2 = useQuery(GET_QUESTION_QUERY, {
    variables: {
      address: account,
      questionId: Number(id)
    }
  })

  const {loading, data: questionData} = res1;
  if (loading || !questionData) return <p>Loading...</p>
  const thisData = questionData.allQuestionData[id-1];

  const {loading: _loading, data: _questionData} = res2;
  if (_loading || !_questionData) return <p>Loading...</p>
  console.log(_questionData);
  const tryId = _questionData.question.answerRecord.length - 1
  
  if (navOpen) {
    drawerWidth = 440;
    eWidth = 440;
    width = `78%`;
  }

  const handleOnChange = (e) => {
    setCode(e)
  }

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  // 提交答案
  const handleClick = async  () => {
    console.log(code);
    if (code !== thisData.answer) {
      setCorrect(false);
      // TO_DO 更新題目回答
      await updateAnswerRecord({
        variables:{
          address:account,
          questionId:thisData.questionId,
          tryId: tryId, //to modified
          isCorrect: false,
          record: code
        }
      })
    }
    else {
      setCorrect(true);
      // TO_DO 更新題目回答
      await updateAnswerRecord({
        variables:{
          address:account,
          questionId:thisData.questionId,
          tryId:0, //to modified
          isCorrect: true,
          record: code
        }
      })
      updateQuestionStatus({
        variables:{
          address:account,
          questionId:thisData.questionId
        }
      })
    }
    setOpen(true);
  };



  return(
    <>
    <div style={{
      width: '50%',
      marginTop: '35px',
      marginLeft: drawerWidth,
      marginRight: drawerWidth,
      alignItems: 'center'
    }}>
      <DrawerHeader/>
      <Button onClick={() => {navigate('/quiz')}}>
          <ArrowBackIosIcon />
      </Button>
      <Typography variant='h4' style={typoStyle}> {`Problem ${id}: ${thisData.name}`} </Typography>
      <Typography paragraph style={typoStyle}>
        {thisData.description}
      </Typography>
      <Typography paragraph style={typoStyle}>
        {`Example1:${thisData.example1}`}
      </Typography>
      <Typography paragraph style={typoStyle}>
        {`Example2:${thisData.example2}`}
      </Typography>
      <Typography paragraph style={typoStyle}>
        {`${thisData.others}`}
      </Typography>
    </div>

    <div style={{
      marginTop: '40px',
      marginLeft: eWidth
      }}
    >
      <Editor
        height="65vh"
        width={width}
        language={"javascript"}
        value={code}
        theme="vs-dark"
        defaultValue={thisData.code}
        onChange={(e) => {
          handleOnChange(e)
        }}
      />
      <br />
      <Button variant="outlined" color="error" onClick={() => handleClick()} style={typoStyle}>
        SUBMIT
      </Button>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        {
          correct ? 
          <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
            You Are Correct!
          </Alert> :
          <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
            You Are Wrong!
          </Alert>
        }
      </Snackbar>
    </div>
    </>

    
  )
}

export default ProblemPage