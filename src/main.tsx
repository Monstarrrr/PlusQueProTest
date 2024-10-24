import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { Movie } from './pages/Movie.tsx';
import { Error } from './pages/PageError.tsx';
import MainLayout from './MainLayout.tsx';
import { Home } from './pages/Home.tsx';
import { Loading } from './components/Loading.tsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/movie/:id",
        element: <Movie />,
      },
    ]
  },
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider
      router={router}
      fallbackElement={<Loading />}
    />
  </StrictMode>,
)
