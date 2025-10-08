import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {createBrowserRouter, RouterProvider} from "react-router-dom"
import './index.css'
import App from './App.jsx'
import SignUp from './pages/Signup/Signup.jsx'
import ChoosePath from './pages/ChoosePathPage/ChoosePath.jsx'

const router = createBrowserRouter([
    {
        path: "/",
        element: <App/>
    },
    {
        path: "login",
        element: <SignUp/>
    },
    {
        path: "choosePath",
        element: <ChoosePath/>
    }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
