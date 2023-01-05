import { styled } from '@mui/material/styles';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import PetsRoundedIcon from '@mui/icons-material/PetsRounded';
import { useSol } from './hook/useSol';

const NavigationBar = () => {

  const { navOpen, setNavOpen } = useSol();

  const drawerWidth = 350;

  const handleDrawerOpen = () => {
    setNavOpen(true);
  };

  const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',})
      (({ theme, open }) => ({
        transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      ...(open && {
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: drawerWidth,
      }),
    }));

  return(
    <AppBar position="fixed" open={navOpen} color='primary'>
      <Toolbar>
        <IconButton
        color="inherit"
        aria-label="open drawer"
        edge="end"
        onClick={handleDrawerOpen}
        sx={{ ...(navOpen && { display: 'none' }) }}
        >
          <MenuIcon />
        </IconButton>
        
        <Typography 
          variant="h4" 
          align='center' 
          noWrap sx={{ flexGrow: 1 }} 
          component="div"
          fontFamily="serif"
        > 
          <PetsRoundedIcon/> <> </>
            Solidibility
        </Typography>

      </Toolbar>
    </AppBar>
  )
}
export default NavigationBar;