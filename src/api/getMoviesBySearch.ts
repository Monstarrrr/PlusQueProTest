import { SearchQuery } from '../types/searchQuery'
import theMovieDb from './api'

export const getMoviesBySearch = async (searchQuery: SearchQuery) => {
  const { title, include_adult, language, page, region, year } = searchQuery
  await new Promise((resolve) => setTimeout(resolve, 400))
  return await theMovieDb.get(
    `/search/movie?query=${title}&include_adult=${include_adult}&page=${page}&region=${region}&year=${year}&language=${language}`
  )
}
