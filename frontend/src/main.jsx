import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './pages/Home.jsx'
import Login from './pages/Login.jsx'
import SignIn from './pages/SignIn.jsx'
import SignUp from './pages/SignUp.jsx'

const router = createBrowserRouter([{
  element : <App />,
  children : [
    {
      path:"/",
      element : <Home />
    },
    {
      path:"/login",
      element : <Login />
    },
    {
      path:"/signin",
      element : <SignIn />
    },
    {
      path:"/signup",
      element : <SignUp />
    }
    // {
    //   path:"/products",
    //   element : <Products />
    // },
  ]
}
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
