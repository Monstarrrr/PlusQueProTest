import theMovieDb from './api'

export const getMovie = async (id: number) => {
  await new Promise((resolve) => setTimeout(resolve, 400))
  return await theMovieDb.get(`/movie/${id}&language=en-US`)
}
