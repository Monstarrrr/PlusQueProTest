import theMovieDb from './api'

export const getMovieById = async (id: number) => {
  await new Promise((resolve) => setTimeout(resolve, 400))
  return await theMovieDb.get(`/movie/${id}&language=en-US`)
}
