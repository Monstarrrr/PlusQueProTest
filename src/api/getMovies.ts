import theMovieDb from './api'

export const getMovies = async () => {
  // Adding delay to display loading screen
  await new Promise((resolve) => setTimeout(resolve, 400))
  return await theMovieDb.get('/trending/all/day?language=en-US')
}
