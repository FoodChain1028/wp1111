import { useEffect } from "react";
import imgX from '../img/x.png';

const Main = (
    {   // props from parent Component
        list, setList, 
        isListEmpty, setIsListEmpty, 
        currentId, setCurrentId, 
        totalNum, setTotalNum,
        completedNum, setCompletedNum
    }) => {
  
    useEffect(() => {
        if (list.length !== 0 && isListEmpty === false) {
            setIsListEmpty(true);
        }
        console.log(list);
        // console.log(totalNum, completedNum);
    }, [list, isListEmpty, setIsListEmpty])
    
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
            setTotalNum(previousNum => previousNum + 1);
            setIsListEmpty(false);
        }
    }
    // 處理 checkbox 按下後會更新內容的狀態 & 更新 completed task 的數量
    const handleCheck = (e) => {
        const id = parseInt(e.target.id);
        setList(list => {
            if (list[id].isCompleted === false) {
                setCompletedNum(++completedNum);
                return [
                    ...list.slice(0, id),
                    {
                        id: list[id].id,
                        content: list[id].content,
                        isCompleted: true,
                        style: "todo-app__item-detail-completed"
                    },
                    ...list.slice(id+1)
                ]
            }
            else {
                setCompletedNum(--completedNum);
                return [
                    ...list.slice(0, id),
                    {
                        id: id,
                        content: list[id].content,
                        isCompleted: false,
                        style: "todo-app__item-detail"
                    },
                    ...list.slice(id+1)
                ]
            }
        })
    }

    const handleDelete = (e) => {
        const id = parseInt(e.target.id);
        setList(list => {
            if (list[id].isCompleted === true) {
                setCompletedNum(previousNum => previousNum - 1);
                setTotalNum(previousNum => previousNum - 1);
                return([
                    ...list.slice(0,id),
                    ...list.slice(id+1)
                ])
            }
            else {
                setTotalNum(previousNum => previousNum - 1);
                return([
                    ...list.slice(0,id),
                    ...list.slice(id+1)
                ])
            }
        });
    }
    return (             
        <section className="todo-app__main">
            <input className="todo-app__input" 
            placeholder="What needs to be done?"
            onKeyPress = {e => handleInputEnter(e)}/>
            {   
                isListEmpty &&
                list.map((todo) => {
                    return(
                        <ul className="todo-app__list" id="todo-list" key={todo.id}>
                            <li className="todo-app__item">
                                <div className="todo-app__checkbox">
                                    <input type="checkbox" id={todo.id} onClick={ e => handleCheck(e) }/>
                                    <label htmlFor={todo.id}></label>
                                </div>
                                <h1 className={todo.style}>{ todo.content }</h1>
                                <img 
                                    src={imgX} 
                                    alt="item-x" 
                                    className="todo-app__item-x" 
                                    id={todo.id} 
                                    onClick={ e => handleDelete(e) }/>
                            </li>
                        </ul>
                    )
                })
            }
        </section>
    );
}
 
export default Main;