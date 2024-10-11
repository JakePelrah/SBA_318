import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './components/App.jsx'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './index.css'
import PostProvider from './components/PostProvider.jsx';


const router = createBrowserRouter([

  {
    path: '/',
    element: <App />
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <PostProvider>
      <RouterProvider router={router} />
    </PostProvider>
  </StrictMode>,
)
