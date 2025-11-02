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
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute.jsx'
const queryClient = new QueryClient();
import AdaptivePathPage from './pages/AdaptivePathPage/AdaptivePathPage.jsx'
// main.jsx (Modified Router Configuration

const router = createBrowserRouter([
    {
        path: "/",
        element: <App/>, // App is the main layout for ALL routes starting at '/'
        children:[
            // The root path ("/") renders the Hero/Cards logic inside App.jsx

            // --- PROTECTED ROUTES GROUP ---
            {
                element: <ProtectedRoute />, // All children of this element are protected
                children: [
                    // Path is now relative to the parent ('/')
                    {
                        path: "path", // Matches /path
                        element: <ChoosePath/>
                    },
                    {
                        path: "page/:pageName", // Matches /page/dp
                        element: <PathPage/>
                    },
                    {
                        path: "page/:pageName/:problemID", // Matches /page/dp/1
                        element: <REPL/>
                    },
                    {
                      path: "my-path",
                      element: <AdaptivePathPage />
                    }
                ]
            },
 

        ]
    },
    // Public Route: Login is a standalone route without the App layout
    {
      path: "login",
      element: <SignUp/>
    },

]);

// ... (rest of the createRoot call remains the same)


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider> {/* 👈 Wrap with AuthProvider */}
        <RouterProvider router={router}/>
      </AuthProvider>
    </QueryClientProvider>
  </StrictMode>,
)