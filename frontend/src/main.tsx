import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { BasketProvider } from './context/BasketContext'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BasketProvider>
      <App />
    </BasketProvider>
  </React.StrictMode>,
)
