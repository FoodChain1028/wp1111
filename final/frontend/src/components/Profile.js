import React from 'react'
import Typography from '@mui/material/Typography';
import { useSol } from '../containers/hook/useSol';
import { Box, Avatar, IconButton, Tooltip} from '@mui/material'
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import { EmojiEvents } from '@mui/icons-material'
import Fade from 'react-reveal/Fade';
import {styled} from '@mui/material/styles';
import Modal from '@mui/material/Modal';
import { useState } from 'react';
import InputAdornment from '@mui/material/InputAdornment';  
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useQuery } from '@apollo/client';
import { GET_USER_QUERY } from '../graphql/queries';

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
}));

let width = 1400;
let marginLeft = 0;
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  marginLeft: marginLeft,
  width: width,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
};
const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const pic = [
  "https://cdn-icons-png.flaticon.com/512/1864/1864514.png",
  "https://cdn-icons-png.flaticon.com/512/1864/1864475.png",
  "https://cdn-icons-png.flaticon.com/512/1998/1998713.png",
  "https://cdn-icons-png.flaticon.com/512/1864/1864589.png",
  "https://cdn-icons-png.flaticon.com/512/4710/4710941.png",
  "https://cdn-icons-png.flaticon.com/512/3069/3069172.png",
  "https://cdn-icons-png.flaticon.com/512/1864/1864507.png",
  "https://cdn-icons-png.flaticon.com/512/3975/3975047.png",
  "https://cdn-icons-png.flaticon.com/512/3077/3077443.png",
  "https://cdn-icons-png.flaticon.com/512/2977/2977310.png"
]

const Profile = () => {
  const { account, navOpen, setUserName } = useSol();
  const [modalOpen, setModalOpen] = useState(false);
  const [name, setName] = useState("")
  const [num, setNum] = useState(0)
  const correctNumber = 0;
  let width = 1400;
  let marginLeft = 0;
  const {loading, data: userData} = useQuery(GET_USER_QUERY,{
    variables:{
      address:account,
    }
  })
  if(loading) return <p>Loading...</p>
  const _name = userData.user.name;
  
  if (navOpen) {
    width = 1000;
    marginLeft = 150;
  }

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    marginLeft: marginLeft,
    width: width,
    bgcolor: 'background.paper',
    boxShadow: 24,
  };
  const handleClick = () => {
    setModalOpen(true)
  }
  const handleSubmit = async () => {
    await setUserName({
      variables:{
        address: account,
        name: name
      }
    });
    setModalOpen(false)
  }
  const handleSetName = (e) => {
    setName(e.target.value)
  }

  return(
    <div style={style}>
      <DrawerHeader style={{marginTop: '0px'}} />
      <Box id="aboutme"
        sx={{ height: { xs: '200vh', sm: '100vh' }, width: '110%', display: 'flex', flexWrap: 'wrap'
        }}
      >
        <Box
          sx={{height: { xs: '100vh', sm: '100%' }, width: { xs: '100%', sm: "40%" }, bgcolor: 'white',
            display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative'
          }}
        >
          <Box
            sx={{display: 'flex',flexDirection: 'column',alignItems: 'center',
              height: '50%',width: '80%',justifyContent: 'space-between'
            }}
          >
          <Fade left>
            <Avatar sx={{width: '250px',height: '250px',marginBottom:"30px", cursor: 'pointer', border: '0.1px solid lightgray'}} src={pic[num]} onClick={() => setNum((num+1)%10)}  />
            <Typography variant={'h6'} sx={{marginBottom: '1vh',textAlign: 'center',
              color: 'black',fontSize: '18px',fontWeight: '500'
            }}>
              {"Account: " + account}
            </Typography>
            <Typography variant={'h6'} sx={{ textAlign: 'center',
              color: 'black',fontSize: '18px',fontWeight: '500'
            }}>
              {name ? `Name:${name}`:`Name: ${_name}`}
            </Typography>
            <Tooltip title='Change Your Name'>
              <IconButton onClick={handleClick}>
                <ModeEditOutlineIcon/>
              </IconButton>
            </Tooltip>
            
          </Fade>
        </Box>
      </Box>
      <Box
        sx={{height: { xs: '100vh', sm: '100%' }, width: { xs: '100%', sm: "55%" }, bgcolor: 'grey',
          display: 'flex', justifyContent: 'center', alignItems: 'center'
        }}
      >
        <Box sx={{
          width: '80%',
          height: '30%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-around'
        }}>
          {/* Achievement */}
          <Fade right>
            <Typography variant='h4' color={'white'} fontSize="40px" fontWeight={800}>
              Achievement
            </Typography>
            <Box gap={3} sx={{
              display: 'flex',
              justifyContent: 'flex-start',
              alignItems: 'center'}}>

              <EmojiEvents sx={{
                color: 'yellow',
                fontSize: '30px'
              }} />
              <Typography fontSize={'18px'} color="white" fontWeight={600}>
                {"You have solved " + correctNumber + " questions!" }
              </Typography>
            </Box>
          </Fade>
          {/* Record */}
          <Fade right>
            <Typography variant='h4' color={'white'} fontSize="40px" fontWeight={800}>
              Record
            </Typography>

            <Box gap={3} sx={{
              display: 'flex',
              justifyContent: 'flex-start',
              alignItems: 'center'}}>

              <EmojiEvents sx={{
                color: 'yellow',
                fontSize: '30px'
              }} />
              <Typography fontSize={'18px'} color="white" fontWeight={600}>
                Problem 1 Solved
              </Typography>
            </Box>
          </Fade>
        </Box>
      </Box>
    </Box>
    <Modal
    open={modalOpen}
    onClose={()=>setModalOpen(false)}
    aria-labelledby="modal-modal-title"
    aria-describedby="modal-modal-description"
    >
    <Box sx={modalStyle}>
      <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            "Please enter your name"
      </Typography>
      <p></p>
 
        <TextField 
          id="users-name" 
          label="name" 
          variant="outlined" 
          required 
          value={name} 
          onChange={handleSetName}
          
        />
        <p></p>
        <Button variant="outlined" color="error" onClick={() => handleSubmit()}>
            SET
        </Button>
        
      
    </Box>
    </Modal>
    </div>
    
  )

}
export default Profile;