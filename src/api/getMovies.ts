import theMovieDb from './api'

export const getMovies = async (page: number = 1) => {
  await new Promise((resolve) => setTimeout(resolve, 400))
  return await theMovieDb.get(`/trending/all/day?language=en-US&page=${page}`)
}
