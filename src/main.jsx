import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './components/App.jsx'
import PostView from './components/PostView.jsx';
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
  },
  {
    path: '/postView/:id',
    element: <PostView />
  },
]);

createRoot(document.getElementById('root')).render(
  <PostProvider>
    <RouterProvider router={router} />
  </PostProvider>
)
