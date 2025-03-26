// // src/App.js
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const App = () => {
//     const [todos, setTodos] = useState([]);
//     const [text, setText] = useState('');

//     useEffect(() => {
//         fetchTodos();
//     }, []);

//     const fetchTodos = async () => {
//         const response = await axios.get('http://localhost:5000/todos');
//         setTodos(response.data);
//     };

//     const addTodo = async () => {
//         if (!text) return;
//         const response = await axios.post('http://localhost:5000/todos', { text });
//         setTodos([...todos, response.data]);
//         setText('');
//     };

//     const updateTodo = async (id, completed) => {
//         const response = await axios.put(`http://localhost:5000/todos/${id}`, { completed: !completed });
//         setTodos(todos.map(todo => (todo._id === id ? response.data : todo)));
//     };

//     const deleteTodo = async (id) => {
//         await axios.delete(`http://localhost:5000/todos/${id}`);
//         setTodos(todos.filter(todo => todo._id !== id));
//     };

//     return (
//         <div>
//             <h1>To-Do App</h1>
//             <input
//                 type="text"
//                 value={text}
//                 onChange={(e) => setText(e.target.value)}
//                 placeholder="Add a new task"
//             />
//             <button onClick={addTodo}>Add</button>
//             <ul>
//                 {todos.map(todo => (
//                     <li key={todo._id}>
//                         <span style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>{todo.text}</span>
//                         <button onClick={() => updateTodo(todo._id, todo.completed)}>Toggle</button>
//                         <button onClick={() => deleteTodo(todo._id)}>Delete</button>
//                     </li>
//                 ))}
//             </ul>
//         </div>
//     );
// };

// export default App;




// // src/App.js
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const App = () => {
//     const [todos, setTodos] = useState([]);
//     const [removedTodos, setRemovedTodos] = useState([]); // State for removed items
//     const [text, setText] = useState('');

//     useEffect(() => {
//         fetchTodos();
//     }, []);

//     const fetchTodos = async () => {
//         const response = await axios.get('http://localhost:5000/todos');
//         setTodos(response.data);
//     };

//     const addTodo = async () => {
//         if (!text) return;
//         const response = await axios.post('http://localhost:5000/todos', { text });
//         setTodos([...todos, response.data]);
//         setText('');
//     };

//     const updateTodo = async (id, completed) => {
//         const response = await axios.put(`http://localhost:5000/todos/${id}`, { completed: !completed });
//         setTodos(todos.map(todo => (todo._id === id ? response.data : todo)));
//     };

//     const deleteTodo = async (id) => {
//         const deletedTodo = todos.find(todo => todo._id === id); // Find the deleted todo
//         await axios.delete(`http://localhost:5000/todos/${id}`);
//         setTodos(todos.filter(todo => todo._id !== id));
//         setRemovedTodos([...removedTodos, deletedTodo]); // Add to removed todos
//     };

//     return (
//         <div>
//             <h1>To-Do App</h1>
//             <input
//                 type="text"
//                 value={text}
//                 onChange={(e) => setText(e.target.value)}
//                 placeholder="Add a new task"
//             />
//             <button onClick={addTodo}>Add</button>
//             <h2>Active Todos</h2>
//             <ul>
//                 {todos.map(todo => (
//                     <li key={todo._id}>
//                         <span style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>{todo.text}</span>
//                         <button onClick={() => updateTodo(todo._id, todo.completed)}>Toggle</button>
//                         <button onClick={() => deleteTodo(todo._id)}>Delete</button>
//                     </li>
//                 ))}
//             </ul>
//             <h2>Removed Todos</h2>
//             <ul>
//                 {removedTodos.map(todo => (
//                     <li key={todo._id}>
//                         <span style={{ textDecoration: 'line-through' }}>{todo.text}</span>
//                     </li>
//                 ))}
//             </ul>
//         </div>
//     );
// };

// export default App;



// src/App.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
    const [todos, setTodos] = useState([]);
    const [text, setText] = useState('');
    const [editId, setEditId] = useState(null);

    useEffect(() => {
        fetchTodos();
    }, []);

    const fetchTodos = async () => {
        const response = await axios.get('http://localhost:5000/todos');
        setTodos(response.data);
    };

    const addTodo = async () => {
        if (!text) return;
        const response = await axios.post('http://localhost:5000/todos', { text });
        setTodos([...todos, response.data]);
        setText('');
    };

    const updateTodo = async (id, updatedText) => {
        const response = await axios.put(`http://localhost:5000/todos/${id}`, { text: updatedText });
        setTodos(todos.map(todo => (todo._id === id ? response.data : todo)));
        setEditId(null);
        setText('');
    };

    const deleteTodo = async (id) => {
        await axios.delete(`http://localhost:5000/todos/${id}`);
        setTodos(todos.filter(todo => todo._id !== id));
    };

    return (
        <div className="container mt-5">
            <h1 className="text-center">To-Do List</h1>
            <div className="input-group mb-3">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Add a new task"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                />
                <button className="btn btn-primary" onClick={addTodo}>Add</button>
            </div>
            <ul className="list-group">
                {todos.map(todo => (
                    <li key={todo._id} className="list-group-item d-flex justify-content-between align-items-center">
                        {editId === todo._id ? (
                            <input
                                type="text"
                                defaultValue={todo.text}
                                onBlur={(e) => updateTodo(todo._id, e.target.value)}
                            />
                        ) : (
                            <span>{todo.text}</span>
                        )}
                        <div>
                            <button className="btn btn-warning btn-sm" onClick={() => setEditId(todo._id)}>Edit</button>
                            <button className="btn btn-danger btn-sm" onClick={() => deleteTodo(todo._id)}>Delete</button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default App;