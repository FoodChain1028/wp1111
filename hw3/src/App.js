import { useState } from 'react';
import './styles.css';
import Header from './Components/Header';
import Main from './Components/Main';
import Footer from './Components/Footer';

const App = () => {
  const [list, setList] = useState([]);
  const [isListEmpty, setIsListEmpty] = useState(false); // 看 list 中有無東西 => 與顯示有關
  const [currentId, setCurrentId] = useState(0);
  const [totalNum, setTotalNum] = useState(0);
  const [completedNum, setCompletedNum] = useState(0);

  return (
    <div id='root' className='todo-app__root'>
      <Header />
      <Main  
        list={list} setList={setList} 
        currentId={currentId} setCurrentId={setCurrentId}
        isListEmpty={isListEmpty} setIsListEmpty={setIsListEmpty}
        totalNum={totalNum} setTotalNum={setTotalNum}
        completedNum={completedNum} setCompletedNum={setCompletedNum}
      />
      <Footer 
        isListEmpty={isListEmpty} setIsListEmpty={setIsListEmpty}
        currentId={currentId} setCurrentId={setCurrentId}
        totalNum={totalNum} setTotalNum={setTotalNum}
        completedNum={completedNum} setCompletedNum={setCompletedNum}
      />
    </div>
    );
}

export default App;
