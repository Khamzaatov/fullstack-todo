import { configureStore } from '@reduxjs/toolkit'
import todo from './../features/todoSlice';

export const store = configureStore({
    reducer : {
        todo
    }
})
