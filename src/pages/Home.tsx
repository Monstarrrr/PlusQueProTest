import { Search } from "../components/Search"
import { getMovies } from "../api/getMovies";
import { useEffect, useState } from "react";
import { Movie } from "../types/movie";
import { Link } from "react-router-dom";
import { Loading } from "../components/Loading";

export const Home = () => {

  const [movies, setMovies] = useState<Movie[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const handleSearchResults = (movies: Movie[]) => {
    setMovies(movies)
  }

  useEffect(() => {
    const fetchApi = async () => {
      setLoading(true)
      try {
        await new Promise((resolve) => setTimeout(resolve, 400))
        const { data } = await getMovies()
        setMovies(data.results)
        setLoading(false)
      } catch (error: unknown) {
        setLoading(false)
        if (error instanceof Error) {
          setError(error.message)
        }
        console.error('Error:', error)
      }
    }
    fetchApi();
  }, []);

  return (
    <>
      <h1>Bienvenue,</h1>
      <h2>Des millions de films, émissions télévisées et artistes...</h2>
      <Search onSearchResults={handleSearchResults} />

      {movies.map((movie) => (
        <div key={movie.id}>
          <Link to={`/movie/${movie.id}`}>
            {movie.title}
          </Link>
          {/* https://developer.themoviedb.org/docs/image-basics */}
          <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
        </div>
      ))}

      {error && <p>Error: {error}</p>}

      {loading && <Loading />}
    </>
  )
}