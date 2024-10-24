import { Search } from "../components/Search"
import { getMovies } from "../api/getMovies";
import React, { useEffect, useRef, useState } from "react";
import { Movie } from "../types/movie";
import { Link } from "react-router-dom";
import { Loading } from "../components/Loading";
import styled from "styled-components";

const Welcome = styled.h1`
  margin-bottom: 0;
  text-align: center;
`;

const Subtext = styled.p`
  margin-top: 0;
  text-align: center;
  font-style: italic;
`;

const MoviesContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 20px;
  justify-content: center;
  gap: 20px;
`

const Title = styled.h3`
  color: #22aaa3;
  font-size: 20px;
  margin-bottom: 8px;
  max-width: 230px;
`;

const Img = styled.img`
  border-radius: 20px;
  width: 230px;
`
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
              console.log(`# chunk :`, chunk)
              setMovies([
                ...movies,
                ...data.results
              ])
              setChunk((prev) => prev + 1)
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chunk]);

  return (
    <>
      <Welcome>Bienvenue,</Welcome>
      <Subtext>Des millions de films, émissions télévisées et artistes...</Subtext>
      <Search onSearchResults={handleSearchResults} />

      <MoviesContainer>
        {movies.map((movie) => (
          <React.Fragment key={movie.id}>
            {movie.title && (
              <Link key={movie.id} to={`/movie/${movie.id}`}>
                <Title>
                  {movie.title}
                </Title>
                {/* https://developer.themoviedb.org/docs/image-basics */}
                <Img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
              </Link>
            )}
          </React.Fragment>
        ))}
      </MoviesContainer>

      {/* https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API */}
      <div ref={observerTarget} />

      {error && <p>Error: {error}</p>}

      {loading && <Loading />}

    </>
  )
}