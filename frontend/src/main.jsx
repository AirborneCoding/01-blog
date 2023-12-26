import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

import './styles/index.css'
import './styles/projectStyles.css'
// import './styles/mynormalize.css'

import { Provider } from "react-redux"
import { store } from "./redux/store.js"

import { Toaster } from 'react-hot-toast';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <Toaster />
      <App />
    </Provider>
  </React.StrictMode>,
)
