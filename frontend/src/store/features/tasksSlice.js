import { createSlice } from "@reduxjs/toolkit";

let initialState = {
    tasks: JSON.parse(localStorage.getItem("tasks")) || [], // ✅ Load stored tasks
};

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addNewTask: (state, action) => {
      const newTask = {
        id: Date.now(),
        ...action.payload,
      };
      state.tasks.push(newTask);
      localStorage.setItem("tasks", JSON.stringify(state.tasks));
    },
    deleteTask: (state, action) => {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload.id);
      localStorage.setItem("tasks", JSON.stringify(state.tasks));
    },
    updateTask: (state, action) => {
      state.tasks = state.tasks.map((task) =>
        task.id === action.payload.id
          ? { ...task, text: action.payload.text }
          : task
      );
      localStorage.setItem("tasks", JSON.stringify(state.tasks));
    },
    completeTask: (state, action) => {
        state.tasks = state.tasks.map((task)=> (task.id===action.payload.id ? {...task, complete: !task.complete} : task))
        localStorage.setItem("tasks", JSON.stringify(state.tasks));
    }
  },
});

export const { addNewTask, deleteTask, completeTask, updateTask } = tasksSlice.actions;
export default tasksSlice.reducer;
