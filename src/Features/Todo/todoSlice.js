import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {  
    todoList: [
       
    ],
    };


const todoSlice = createSlice({
    name: "todo",
    initialState,
    reducers: {
        addTodo(state, action) {
         

            const newTodo = {
                id: nanoid(),
                title: action.payload,
                
            }
            state.todoList.push(newTodo);
        },
        removeTodo(state, action) {
            state.todoList = state.todoList.filter(todo => todo.id !== action.payload);
        },
        // toggleComplete(state, action) {
        //     const todo = state.todoList.find(todo => todo.id === action.payload.id);
        //     if (todo) {
        //         todo.completed = !todo.completed;
        //     }
        // }


    }
});

export const { addTodo, removeTodo, toggleComplete } = todoSlice.actions;

export default todoSlice.reducer;