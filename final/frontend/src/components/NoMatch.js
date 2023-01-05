import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';

const NoMatch = () => {

  const drawerWidth = 240;
  const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-start',
  }));

  const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: drawerWidth,
    ...(open && {
      transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: drawerWidth,
    }),
    }),
  );

  return(
    <>
    <Main>
      <DrawerHeader />
      <Typography paragraph>
        <h1>Error 404</h1>
        <p>Cannot find anything here, please get back to home.</p>
      </Typography>
      <Typography paragraph>
      </Typography> 
    </Main>
    </>
    
  )

}
export default NoMatch;