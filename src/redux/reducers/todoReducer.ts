import { createSlice } from '@reduxjs/toolkit';
import { InitialState } from '../../Types';

const initialState: InitialState = {
    tasks: [],
    filter: 'all',
};

const todoReducer = createSlice({
    name: 'Tasks',
    initialState,
    reducers: {
        addTask: (state, action) => {
            state.tasks.push({
                id: Date.now(),
                text: action.payload,
                completed: false,
            });
        },
        toggleTaskStatus: (state, action) => {
            const task = state.tasks.find((task) => task.id === action.payload);
            if (task) {
                task.completed = !task.completed;
            }
        },
        removeTask: (state, action) => {
            state.tasks = state.tasks.filter((task) => task.id !== action.payload);
        },
        setFilter: (state, action) => {
            state.filter = action.payload;
        },
    },
});

export const { addTask, toggleTaskStatus, removeTask, setFilter } = todoReducer.actions;
export default todoReducer.reducer;
