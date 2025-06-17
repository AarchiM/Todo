import { createRoot } from 'react-dom/client'
import React from 'react'
import './index.css'
import App from './App.jsx'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import TaskPage from './screens/TaskPage.jsx'
import store from './store/store.js'
import { Provider } from 'react-redux'
import SignUpPage from './screens/SignUpPage.jsx'

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<App />}/>
      <Route path='/tasks' element={<TaskPage />}/>
      <Route path='/signup' element={<SignUpPage />}/>
    </Routes>
  </BrowserRouter>
  </Provider>
)
