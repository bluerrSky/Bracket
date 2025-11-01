import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {createBrowserRouter, RouterProvider} from "react-router-dom"
import './index.css'
import App from './App.jsx'
import SignUp from './pages/Signup/Signup.jsx'
import ChoosePath from './pages/ChoosePathPage/ChoosePath.jsx'
import PathPage from './pages/PathPage/PathPage.jsx'
import REPL from './pages/REPL/REPL.jsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from './context/AuthContext'; // 👈 Import AuthProvider
import Test from './pages/Test.jsx'

const queryClient = new QueryClient();
const router = createBrowserRouter([
    // ... your router config remains the same
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
              },
 

        ]
    },
      {
      path: "login",
      element: <SignUp/>
      },
        {
        path: "test",
        element: <Test/>
      }

]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider> {/* 👈 Wrap with AuthProvider */}
        <RouterProvider router={router}/>
      </AuthProvider>
    </QueryClientProvider>
  </StrictMode>,
)