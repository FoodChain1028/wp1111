import Typography from '@mui/material/Typography';
import DrawerHeader from './DrawerHeader';
import Main from './Main';
import { useSol } from '../containers/hook/useSol';
import { Link } from '@mui/material';

const Home = () => {
  const { navOpen } = useSol();
  return(
    <Main open={navOpen}>
      <DrawerHeader />
      <Typography variant='h4'> What is Solidibility ? </Typography>
      <br/>

      <Typography paragraph>
        Solidibility is a leetcode-like web application. We hope you can learn plenty of knowledge and skills of solidity progarmming from here.
      </Typography>

      <br/>
      <Typography variant='h5'> What is Solidity ? </Typography>
      <br/>
      <Typography paragraph>  
        Solidity is a smart-contract langauage which can be compiled and recorded in Ethereum or other related blockchain network. We can use IDE like <Link href="https://remix.ethereum.org/" underline='none'>Remix</Link> to connect with the smart contracts on the blockchain.
      </Typography> 
    </Main>
  )
}
export default Home;