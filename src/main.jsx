import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import './index.css'
import { MainRouter } from './routers/MainRouter/index.jsx'
import App from './components/App.jsx'

createRoot(document.getElementById('root')).render(
    <App />
)
