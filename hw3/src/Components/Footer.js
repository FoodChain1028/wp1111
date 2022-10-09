const Footer = ({isListEmpty, currentId, setCurrentId}) => {
    return ( 
        <>
        {
            isListEmpty &&
            <footer className="todo-app__footer" id="todo-footer">
                <div className="todo-app__total">{ currentId - 1} left</div>
                <ul className="todo-app__view-buttons">
                    <button>All</button>
                    <button>Active</button>
                    <button>Completed</button>
                </ul>
                <div className="todo-app__clean">Clear completed</div>
            </footer>
        }
        </>
     );
}
 
export default Footer;