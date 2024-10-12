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
import FourOhFour from './components/404.jsx';
import FiveHundred from './components/500.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />
  },
  {
    path:'/postView/:id',
    element:<PostView/>
  },
  {
    path:'/404',
    element:<FourOhFour/>
  },
  {
    path:'/500',
    element:<FiveHundred/>
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <PostProvider>
      <RouterProvider router={router} />
    </PostProvider>
  </StrictMode>,
)
