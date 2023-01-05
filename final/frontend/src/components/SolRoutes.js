//All the Route stuffs comes here

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Home';
import Profile from './Profile';
import Quiz from './Quiz';
import About from './About';

const SolRoutes = () => {

  return(

    <Router>
      <Routes>
        <Route path="/profile" element={<Profile />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/about-us" element={<About />} />
        <Route exact path="/" element={<Home />} />
      </Routes>
    </Router> 
    
  )

}

export default SolRoutes