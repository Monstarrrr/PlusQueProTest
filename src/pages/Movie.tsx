import { useEffect, useState } from "react";
import * as type from "../types/movie";
import { getMovieById } from "../api/getMovieById";
import { useParams } from "react-router-dom";
import { Loading } from "../components/Loading";

export const Movie = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState<type.Movie | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchApi = async () => {
      setLoading(true)
      try {
        await new Promise((resolve) => setTimeout(resolve, 400))
        const { data } = await getMovieById(Number(id))
        setMovie(data)
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
  }, [id]);

  return (
    <>
      {movie && (
        <>
          <h1>{movie.title}</h1>
          {/* https://developer.themoviedb.org/docs/image-basics */}
          <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
          <p>{movie.overview}</p>
        </>
      )}
      {loading && <Loading />}
      {error && <p>Error: {error}</p>}
    </>
  )
}