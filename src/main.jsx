import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

import CartProvider from './pages/context/cartprovider'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    < CartProvider>
    <App />
   
    </ CartProvider>
      <ToastContainer position='top-center'/>
  </StrictMode>,
)
