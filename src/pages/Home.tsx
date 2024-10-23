import { useLoaderData } from "react-router-dom"
import { Search } from "../components/Search"

export const Home = () => {
  const movies = useLoaderData();
  return (
    <>
      <h1>Bienvenue,</h1>
      <h2>Des millions de films, émissions télévisées et artistes...</h2>
      <Search />

      <pre>
        {JSON.stringify(movies, null, 2)}
      </pre>
    </>
  )
}