import { useEffect } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';

// for wallet connection
import Web3 from "web3";
import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";
import CoinbaseWalletSDK from "@coinbase/wallet-sdk";

import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useSol } from './hook/useSol';


// wallet connection
const INFURA_ID = process.env.INFURA_ID;
const providerOptions = {
  walletconnect: {
    package: WalletConnectProvider, // required
    options: {
      infuraId: INFURA_ID, // required
    },
  },
  coinbasewallet: {
    package: CoinbaseWalletSDK, // Required
    options: {
      appName: "web3modal", // Required
      infuraId: INFURA_ID, // Required
      rpc: "", // Optional if `infuraId` is provided; otherwise it's required
      chainId: 1, // Optional. It defaults to 1 if not provided
      darkMode: false, // Optional. Use dark theme, defaults to false
    },
  },
  binancechainwallet: {
    package: true,
  },
};
const web3Modal = new Web3Modal({
  network: "goerli", // optional
  cacheProvider: true, // optional
  providerOptions, // required
});
const connectWallet = async () => {
  if (window.ethereum) {
    const provider = await web3Modal.connect();
    const web3 = new Web3(provider);
    await window.ethereum.send("eth_requestAccounts");
    const accounts = await web3.eth.getAccounts();
    const account = accounts[0];


    return account;
  } else {
    // Show alert if Ethereum provider is not detected
    alert("Please install Mask");
  }
};

const Copyright = (props) => {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit">
        笑死不要亂改 copyright
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

const SignIn = () => {
  const { account, setAccount, setSignedIn, createUser, createQuestion } = useSol();

  //TODO: handleSignIn 
  const handleConnect = async (event) => {
    event.preventDefault();
    const addr = await connectWallet()
    setAccount(addr);
    await createUser({
      variables:{
        address:addr
      }
    });
    for(let i = 0; i < 3; i++){
      await createQuestion({
        variables:{
          address: addr,
          questionId: i+1
        }
      })
    }
  };

  useEffect(() => {
    if (account !== "") {
      setSignedIn(true);
    }
  }, [account]);

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(https://source.unsplash.com/random)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5" sx={{mt: 3}}>
              Connect Your Wallet to Login.
            </Typography>
            
            <Box component="form" noValidate onSubmit={handleConnect} sx={{ mt: 5 }}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 0, mb: 2 }}
              >
                Connect
              </Button>
              <Copyright sx={{ mt: 45 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}

export default SignIn;