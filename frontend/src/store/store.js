import { configureStore } from "@reduxjs/toolkit";
import tasksReducer from "./features/tasksSlice.js"

const store = configureStore({
    reducer: {
        tasks: tasksReducer,
    }
})

export default store;