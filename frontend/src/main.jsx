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
import { AuthProvider } from './context/AuthContext';
import Test from './pages/Test.jsx'

// --- 1. IMPORT THE NEW PAGE ---
import AdaptivePathPage from './pages/AdaptivePathPage/AdaptivePathPage.jsx'

const queryClient = new QueryClient();
const router = createBrowserRouter([
    {
        path: "/",
        element: <App/>,
        children:[

              // --- YOUR EXISTING ROUTE (UNCHANGED) ---
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
 
              // --- 2. ADD THE NEW ADAPTIVE PATH ROUTE ---
              {
                path: "my-path",
                element: <AdaptivePathPage />
              }
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
      <AuthProvider>
        <RouterProvider router={router}/>
      </AuthProvider>
    </QueryClientProvider>
  </StrictMode>,
)