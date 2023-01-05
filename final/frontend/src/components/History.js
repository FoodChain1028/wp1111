import { Box, Typography, styled, Button, Modal } from '@mui/material'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import CheckCircleSharpIcon from '@mui/icons-material/CheckCircleSharp';
import CancelSharpIcon from '@mui/icons-material/CancelSharp';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import Tooltip from '@mui/material/Tooltip';
import React, { useState } from 'react'
import { useSol } from '../containers/hook/useSol';
import { useNavigate, useParams } from 'react-router-dom';
import DrawerHeader from './DrawerHeader';
import Main from './Main';
import CopyButton from './CopyButton';
import { useQuery } from '@apollo/client';
import { GET_QUESTION_QUERY } from '../graphql/queries';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));
  
  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 800,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  const typoStyle = {
    marginLeft: '20px'
  };

const History = () => {

  const { id } = useParams()
  const { problemSet, setCode, code, navOpen, account } = useSol();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const numId = Number(id)
  
  const {loading, data: question} = useQuery(GET_QUESTION_QUERY,{
    variables:{
      address:account,
      questionId:numId
    }
  })

  if(loading) return <p>Loading...</p>

  const questionData = question.question.answerRecord
  console.log(questionData);

  

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  let width = 300;
  if (navOpen) width = 450;
  return(
    <>
      <Main open={navOpen} style={{
        marginLeft: width
      }}>
        <DrawerHeader/>
        <Button onClick={() => {navigate('/quiz')}}>
          <ArrowBackIosIcon />
        </Button>
        
        <p></p>
        <Typography variant='h4' style={typoStyle}> { "Quiz " + id + " History" } </Typography>
        <p></p>
        <Typography variant='paragraph' style={typoStyle}> ✔️  You can checkout your answer history here! </Typography>
        <p></p>
      <Box sx={{
        height: '100vh',
        width: { xs: "100%", sm: '100%' },
        bgcolor: 'white',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'top',
        marginTop: '10vh'
      }}
      >
        <TableContainer component={Paper} sx={{
          height: '50vh',
          width: {xs: '100%', sm: '100%'},
          bgcolor: 'white',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'top',
        }}>
          <Table sx={{ minWidth: `100%` }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>History Id</StyledTableCell>
                <StyledTableCell align="center">Checkout</StyledTableCell>
                <StyledTableCell align="right"> </StyledTableCell>
                <StyledTableCell align="right"> </StyledTableCell>
                <StyledTableCell align="center">Status</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {questionData.map((problem) => (
                <StyledTableRow key={problem.tryId}>
                  <StyledTableCell component="th" scope="row">
                      <Button>{problem.tryId+2}</Button>
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    <Button color={ problem.isCorrect ? 'success' : 'warning'} onClick={handleOpen}>
                      Press To Check Your History Answer 
                    </Button>
                    <Modal
                      open={open}
                      onClose={handleClose}
                      aria-labelledby="modal-modal-title"
                      aria-describedby="modal-modal-description"
                    >
                      <Box sx={style}>
                        
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                          Your Answer:
                        </Typography>
                        <CopyButton code={problem.record}/>
                        <Typography sx={{ mt: 2 }}>
                          {problem.record}
                        </Typography>
                      </Box>
                    </Modal>
                  </StyledTableCell>
                  <StyledTableCell align="right"></StyledTableCell>
                  <StyledTableCell align="right"></StyledTableCell>
                  <StyledTableCell align="center">
                        {  
                            problem.isCorrect ? 
                            <CheckCircleSharpIcon color='success' fontSize='large'/> : 
                            <CancelSharpIcon color='warning' fontSize='large'/>
                        }
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        </Box>
      </Main>
    </>
  )
}

export default History;