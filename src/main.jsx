import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import CreateView from './CreateView.jsx';
import PostView from './PostView.jsx';
import UserView from './UserView.jsx';
import App from './App.jsx'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './index.css'
import PostProvider from './PostProvider.jsx';


const router = createBrowserRouter([

  {
    path: '/',
    element: <App />
  },
  {
    path: '/post/:id',
    element: <PostView />
  },
  {
    path: '/user/:id',
    element: <UserView />
  },
  {
    path: '/create/:id',
    element: <CreateView />
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <PostProvider>
      <RouterProvider router={router} />
    </PostProvider>
  </StrictMode>,
)
