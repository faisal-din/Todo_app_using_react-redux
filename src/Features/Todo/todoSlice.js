import { createSlice, nanoid } from '@reduxjs/toolkit';

const initialState = {
  todoList: [],
};

const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    addTodo(state, action) {
      const newTodo = {
        id: nanoid(),
        text: action.payload,
        completed: false,
        isEditing: false,
      };
      state.todoList.push(newTodo);
    },
    removeTodo(state, action) {
      state.todoList = state.todoList.filter(
        (todo) => todo.id !== action.payload
      );
    },
    toggleComplete(state, action) {
      const todo = state.todoList.find((todo) => todo.id === action.payload.id);
      if (todo) {
        todo.completed = !todo.completed;
      }
    },
    editTodo(state, action) {
      const todo = state.todoList.find((todo) => todo.id === action.payload.id);
      if (todo) {
        todo.isEditing = true;
      }
    },
    saveTodoEdit(state, action) {
      const todo = state.todoList.find((todo) => todo.id === action.payload.id);
      if (todo) {
        todo.text = action.payload.text;
        todo.isEditing = false;
      }
    },
    cancelTodoEdit(state, action) {
      const todo = state.todoList.find((todo) => todo.id === action.payload.id);
      if (todo) {
        todo.isEditing = false;
      }
    },
  },
});

export const { addTodo, removeTodo, toggleComplete, editTodo, saveTodoEdit, cancelTodoEdit } =
  todoSlice.actions;

export default todoSlice.reducer;
