import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { TokenProvider } from './TokenContext'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <TokenProvider>
      <App />
    </TokenProvider>
  </StrictMode>,
)
