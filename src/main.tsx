import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { Movie } from './pages/Movie.tsx';
import { Error } from './pages/Error.tsx';
import MainLayout from './MainLayout.tsx';
import { Home } from './pages/Home.tsx';
import { getMovies } from './api/getMovies.ts';
import { getMovie } from './api/getMovie.ts';
import { Loading } from './pages/Loading.tsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <Home />,
        loader: async () => getMovies(),
      },
      {
        path: "/movie/:id",
        element: <Movie />,
        loader: async ({ params }) => await getMovie(Number(params.id)),
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
