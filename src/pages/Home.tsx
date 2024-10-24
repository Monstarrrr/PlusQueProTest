import { Search } from "../components/Search"
import { getMovies } from "../api/getMovies";
import { useEffect, useRef, useState } from "react";
import { Movie } from "../types/movie";
import { Link } from "react-router-dom";
import { Loading } from "../components/Loading";

export const Home = () => {
  const observerTarget = useRef(null);

  const [movies, setMovies] = useState<Movie[]>([])
  const [chunk, setChunk] = useState(1)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const handleSearchResults = (movies: Movie[]) => {
    setMovies(movies)
  }

  useEffect(() => {

    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting) {
          const fetchApi = async () => {
            setLoading(true)
            try {
              await new Promise((resolve) => setTimeout(resolve, 400))
              const { data } = await getMovies(chunk)
              console.log(`# data :`, data)
              setMovies([
                ...movies,
                ...data.results
              ])
              setChunk(data.page + 1)
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
        }
      },
      { threshold: 1 }
    );

    const target = observerTarget.current;
    if (target) {
      observer.observe(target);
    }

    return () => {
      if (target) {
        observer.unobserve(target);
      }
    };
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

      {/* https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API */}
      <div ref={observerTarget} />

      {error && <p>Error: {error}</p>}

      {loading && <Loading />}

    </>
  )
}