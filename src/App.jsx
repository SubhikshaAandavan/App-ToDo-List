import { useState } from 'react'

const App=() =>{

  const[todo,setTodo]=useState('');
  const[todoList,setTodoList]=useState([]);

     const [editId, setEditId] = useState(null); 
    const [editText, setEditText] = useState(''); 

  const addTodo=()=>{
    if(todo.trim()=== '') return;
    setTodoList([...todoList,{id:Date.now(),text:todo,completed:false}])
    setTodo('');
  }

  const toggleComplete=(id)=>{
    setTodoList(
      todoList.map((item)=>
        item.id===id ? {...item,completed: !item.completed}:item
    )

    )
  }
  const deleteTodo=(id)=>{
    setTodoList(
      todoList.filter((item)=>item.id != id)
    )
  }
  const completedTasksCount = todoList.filter(item => item.completed).length;
  const activeTasksCount = todoList.filter(item => !item.completed).length;

  const handleEdit = (item) => {
  setEditId(item.id);
  setEditText(item.text);
};

const handleSave = (id) => {
  setTodoList(
    todoList.map((item) =>
      item.id === id ? { ...item, text: editText } : item
    )
  );
  setEditId(null); 
  setEditText('');
};


  return(
    <div className='app-container'>
        <h1>To-Do List</h1>
        <p>Active: {activeTasksCount} | Completed: {completedTasksCount}</p>
        <div className="input-container">
          <input
             type="text"
             placeholder='Add a new task...'
             value={todo}
             onChange={(e)=>setTodo(e.target.value)}
           />
           <button className='add-btn' onClick={addTodo}> Add</button>
        </div>
        <ul className='todo-list'>
  {todoList.map((item) => (
    <li key={item.id} className={item.completed ? 'completed' : ''}>
      {editId === item.id ? (
        <>
          <input
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
          />
          <button className='save-btn' onClick={() => handleSave(item.id)}>
            Save
          </button>
        </>
      ) : (
        <>
          <span onClick={() => toggleComplete(item.id)}>
            {item.text}
          </span>
          <div>
            <button className='edit-btn' onClick={() => handleEdit(item)}>
              Edit
            </button>
            <button className='delete-btn' onClick={(e) => {
                e.stopPropagation();
                deleteTodo(item.id);
              }}>
              Delete
            </button>
          </div>
        </>
      )}
    </li>
  ))}
</ul>
        
    </div>
  )

}

export default App
