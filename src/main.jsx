
import ReactDom from 'react-dom/client'
import React from 'react'
import {BrowserRouter}from 'react-router-dom'
import App from './App.jsx'

ReactDom.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
)
