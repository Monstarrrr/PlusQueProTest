import axios from 'axios'

// API INSTANCE
const theMovieDb = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${import.meta.env.VITE_THEMOVIEDB_SECRET}`,
  },
})

// INTERCEPTORS
// On request
theMovieDb.interceptors.request.use(
  async (req) => {
    console.log('# Intercepted request:', req)
    return req
  },
  (error) => {
    console.error(
      '# request error :',
      error?.reponse?.data?.detail ??
        error?.response?.data ??
        error?.response ??
        error
    )
    return Promise.reject(error)
  }
)

export default theMovieDb
