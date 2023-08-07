import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface TodoItem {
    id: number,
    title: string,
    checked: boolean
}

export interface CommonState {
    todoList: TodoItem[]
}

const initialState: CommonState = {
    todoList: []
};

export const todoSlice = createSlice({
    name: 'todo',
    initialState,
    reducers: {
        setTodo(state, action: PayloadAction<TodoItem[]>) {
            state.todoList = action.payload;
        }
    }
});

export const { setTodo } = todoSlice.actions;

export default todoSlice;