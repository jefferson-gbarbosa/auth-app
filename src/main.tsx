import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { App } from './app'
import './index.css'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import React from 'react'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
    <ToastContainer /> 
  </StrictMode>,
)