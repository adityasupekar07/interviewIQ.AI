import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

//to use route we need to wrap our app in browser router
import { BrowserRouter } from 'react-router-dom'
import store from './redux/store.js'
import App from './App.jsx'
import { Provider } from 'react-redux'
createRoot(document.getElementById('root')).render(
  <StrictMode>

    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>

  </StrictMode>,
)
