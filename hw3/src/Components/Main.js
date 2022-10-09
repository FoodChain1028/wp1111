import { useState, useEffect } from "react";
import imgX from '../img/x.png';

const Main = ({list, setList, isListEmpty, setIsListEmpty, currentId, setCurrentId}) => {

    const [value, setValue] = useState(''); // input 的值
    const [completedTasks, setCompletedTasks] = useState([]);

    useEffect(() => {
        if (list.length !== 0 && isListEmpty === false) {
            setIsListEmpty(true);
        }
        console.log(list);
    }, [list])
    
    // 處理 input 後按下 Enter 後如何處理
    const handleInputEnter = (e) => {
        if (e.key === 'Enter' && e.target.value !== '')  { // input 為空白時不輸入
            setList(previousList => ([
                ...previousList,
                {
                    id: currentId,
                    content: e.target.value,
                    isCompleted: false,
                    style: "todo-app__item-detail"
                }
            ]));
            setCurrentId(previousId => previousId + 1);
            setValue(''); 
            setIsListEmpty(false);
        }
    }
    // 處理 checkbox 按下後會更新
    const handleCheck = (e) => {
        const id = parseInt(e.target.id);
        if (list[id].isCompleted === false) {
            list[id].isCompleted = true;
            list[id].style = "todo-app__item-detail-completed";
            setCompletedTasks(list.filter(todo => todo.isCompleted === true));
        }else {
            list[id].isCompleted = false;
            list[id].style = "todo-app__item-detail";
            setCompletedTasks([list.filter(list.isCompleted === true)]);
        }
        console.log(list)
        console.log(completedTasks)
    }

    return (             
        <section className="todo-app__main">
            <input className="todo-app__input" 
            placeholder="What needs to be done?"
            onChange = {e => setValue(e.target.value)} 
            onKeyPress = {e => handleInputEnter(e)}/>

            {   
                isListEmpty &&
                list.map((todo) => {
                    return(
                        <ul className="todo-app__list" id="todo-list" key={todo.id}>
                            <li className="todo-app__item">
                                <div className="todo-app__checkbox">
                                    <input type="checkbox" id={todo.id} onClick={(e) => handleCheck(e)}/>
                                    <label htmlFor={todo.id}></label>
                                </div>
                                <h1 className={todo.style}>{ todo.content }</h1>
                                <img src={imgX} alt="item-x" className="todo-app__item-x" />
                            </li>
                        </ul>
                    )
                })
            }
        </section>
    );
}
 
export default Main;