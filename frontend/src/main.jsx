import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {createBrowserRouter, RouterProvider} from "react-router-dom"
import './index.css'
import App from './App.jsx'
import SignUp from './pages/Signup/Signup.jsx'
import ChoosePath from './pages/ChoosePathPage/ChoosePath.jsx'
import PathPage from './pages/PathPage/PathPage.jsx'
import REPL from './pages/REPL/REPL.jsx'
const router = createBrowserRouter([
    {
        path: "/",
        element: <App/>,
        children:[

              {
                  path: "path",
                  element: <ChoosePath/>
              },
              {
                path: "/page/:pageName",
                element: <PathPage/>
              },
              {
                path: "/page/:pageName/:problemID",
                element: <REPL/>
              }

        ]
    },
      {
      path: "login",
      element: <SignUp/>
  },

]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
