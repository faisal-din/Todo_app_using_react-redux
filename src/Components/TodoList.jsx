import { useSelector, useDispatch } from 'react-redux';
import {
  addTodo,
  removeTodo,
  toggleComplete,
  editTodo,
  saveTodoEdit,
  cancelTodoEdit,
} from '../Features/Todo/todoSlice';
import { useState } from 'react';

function TodoList() {
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todoList);
  const [input, setInput] = useState('');
  const [editInput, setEditInput] = useState('');

  const addTodoHandler = (e) => {
    e.preventDefault();
    if (input.trim() !== '') {
      dispatch(addTodo(input));
    }
    setInput('');
  };

  const saveEditHandler = (e, todo) => {
    e.preventDefault();
    if (editInput.trim() !== '') {
      dispatch(saveTodoEdit({ id: todo.id, text: editInput }));
    } else {
      dispatch(cancelTodoEdit({ id: todo.id }));
    }
  };

  return (
    <>
      <form onSubmit={addTodoHandler} className='space-x-3 mt-12'>
        <input
          type='text'
          className='bg-gray-800 rounded border border-gray-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-900 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out'
          placeholder='Enter a Todo...'
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button
          type='submit'
          className='text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg'
        >
          Add Todo
        </button>
      </form>

      {/* Todo List */}
      <h1 className='text-2xl text-white font-bold'>Todo List</h1>
      <ul className='list-none flex justify-center flex-col items-center'>
        {todos.map((todo) => (
          <li
            className='w-full md:w-1/2 mt-4 flex justify-between items-center bg-zinc-800 px-4 py-2 rounded'
            key={todo.id}
          >
            {/* Checkbox */}
            <input
              onClick={() => dispatch(toggleComplete(todo))}
              type='checkbox'
              defaultChecked={todo.completed}
              className='h-6 w-6 border-2 border-gray-300 rounded cursor-pointer'
            />

            {/* Todo Text or Edit Input */}
            
            <div className='w-full '>
              {todo.isEditing ? (
                <form
                  onSubmit={(e) => saveEditHandler(e, todo)}
                  className='flex justify-between '
                >
                  <input
                    type='text'
                    value={editInput}
                    onChange={(e) => setEditInput(e.target.value)}
                    className='bg-gray-700 text-white px-3 py-1 rounded w-full'
                    placeholder='Edit todo...'
                  />

                  <div className='w-1/3  inline-flex gap-3'>
                    <button
                      type='submit'
                      className='text-white bg-green-500 py-1 px-3 ml-2 rounded hover:bg-green-600'
                    >
                      Save
                    </button>
                    <button
                      type='button'
                      onClick={() => dispatch(cancelTodoEdit({ id: todo.id }))}
                      className='text-white bg-red-500 py-1 px-3 ml-2 rounded hover:bg-red-600'
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              ) : (
                <span
                  className={
                    todo.completed ? 'line-through text-gray-400' : 'text-white'
                  }
                >
                  {todo.text}
                </span>
              )}
            </div>

            {/* Buttons */}
            <div className='w-1/3  inline-flex gap-3'>
              {!todo.isEditing && (
                <>
                  {/* Edit Button */}
                  <button
                    onClick={() => {
                      dispatch(editTodo({ id: todo.id }));
                      setEditInput(todo.text);
                    }}
                    className='text-white bg-green-500 border-0 py-1 px-4 focus:outline-none hover:bg-green-600 rounded text-md'
                  >
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      fill='none'
                      viewBox='0 0 24 24'
                      strokeWidth={1.5}
                      stroke='currentColor'
                      className='w-6 h-6'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        d='M16.862 3.487a2.25 2.25 0 113.182 3.182L7.01 19.704a4.5 4.5 0 01-1.691 1.06l-3.018.966a.375.375 0 01-.475-.475l.966-3.018a4.5 4.5 0 011.06-1.691L16.862 3.487z'
                      />
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        d='M19.5 6.75L17.25 4.5'
                      />
                    </svg>
                  </button>
                  {/* Delete Button */}
                  <button
                    onClick={() => dispatch(removeTodo(todo.id))}
                    className='text-white bg-red-500 border-0 py-1 px-4 focus:outline-none hover:bg-red-600 rounded text-md'
                  >
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      fill='none'
                      viewBox='0 0 24 24'
                      strokeWidth={1.5}
                      stroke='currentColor'
                      className='w-6 h-6'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        d='M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0'
                      />
                    </svg>
                  </button>
                </>
              )}
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}

export default TodoList;
