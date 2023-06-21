import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <div>
      <h2>Sortable Table Example</h2>
      <App/>
    </div>
  </React.StrictMode>,
)
