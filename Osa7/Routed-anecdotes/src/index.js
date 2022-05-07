import { BrowserRouter as Router } from "react-router-dom"
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import Footer from './components/Footer'

ReactDOM.createRoot(document.getElementById('root')).render(
  <Router>
    <App />
    <Footer />
  </Router>
)
