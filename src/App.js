import React, { useState } from 'react';

const App = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [editTodo, setEditTodo] = useState(null);

  const handleInputChange = (e) => {
    setNewTodo(e.target.value);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (newTodo.trim() !== '') {
      if (editTodo === null) {
        setTodos([...todos, { text: newTodo, completed: false }]);
      } else {
        const updatedTodos = todos.map((todo, index) => {
          if (index === editTodo) {
            return { ...todo, text: newTodo };
          }
          return todo;
        });
        setTodos(updatedTodos);
        setEditTodo(null);
      }
      setNewTodo('');
    }
  };

  const handleTodoDelete = (index) => {
    setTodos(todos.filter((_, i) => i !== index));
  };

  const handleTodoEdit = (index) => {
    setEditTodo(index);
    setNewTodo(todos[index].text);
  };

  const handleTodoComplete = (index) => {
    const updatedTodos = todos.map((todo, i) => {
      if (i === index) {
        return { ...todo, completed: !todo.completed };
      }
      return todo;
    });
    setTodos(updatedTodos);
  };

  return (
    <div className="max-w-md mx-auto p-4 ">
      <h1 className="text-2xl font-bold mb-4 text-center">Todo List</h1>
       <h4  className=" font-bold mb-4 text-center">Add your task of the day</h4>
      <form onSubmit={handleFormSubmit} className=" mb-4">
      <div className='flex'>
        <input
          type="text"
          placeholder="Enter a new todo"
          value={newTodo}
          onChange={handleInputChange}
          className="rounded-lg px-4 py-2 w-full focus:outline-none focus:ring focus:border-blue-300 mr-4"
        />
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold rounded-lg px-4 py-2 mr-4"
        >
          {editTodo !== null ? 'Update' : 'Add'}
        </button>
        </div>
      </form>

      {todos.map((todo, index) => (
        <div
          key={index}
          className={`flex items-center justify-between bg-gray-100 rounded-lg p-4 mb-2 ${
            todo.completed ? 'line-through' : ''
          }`}
        >
          <span>{todo.text}</span>
          <div className='flex flex-wrap gap-3'>
            <button
              onClick={() => handleTodoComplete(index)}
              className="text-white hover:text-green-700 mr-1 bg-green-500 rounded-lg px-4 py-2"
            >
              {todo.completed ? 'Undo' : 'Complete'}
            </button>
            <button
              onClick={() => handleTodoEdit(index)}
              className="bg-blue-500 text-white  hover:text-blue-700 px-4 py-2 rounded-lg mr-1"
            >
              Edit
            </button>
            <button
              onClick={() => handleTodoDelete(index)}
              className="bg-red-500 text-white rounded-lg px-4 py-2 hover:text-red-700"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default App;
