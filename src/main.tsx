import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import ContextWrapper from "./context/ContextWrapper";

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <ContextWrapper>
        <React.StrictMode>
            <App />
        </React.StrictMode>
    </ContextWrapper>
)
