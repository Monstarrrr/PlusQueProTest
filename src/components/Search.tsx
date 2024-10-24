import React, { FormEvent, useState } from "react"
import { getMoviesBySearch } from "../api/getMoviesBySearch"
import { SearchQuery } from "../types/searchQuery"
import { Movie } from "../types/movie"

type SearchProps = {
  onSearchResults: (results: Movie[]) => void
}

export const Search: React.FC<SearchProps> = ({ onSearchResults }) => {
  const [query, setQuery] = useState<SearchQuery>({
    title: '',
    include_adult: false,
    language: 'fr',
    primary_release_year: '',
    page: 1,
    region: '',
    year: '',
  })
  const inputFields = [
    { label: 'Contains', id: 'title', type: 'text', placeholder: 'La Cité De La Peur...', value: query.title },
    { label: 'Include Adult', id: 'include_adult', type: 'checkbox', value: query.include_adult },
    { label: 'Language', id: 'language', type: 'text', placeholder: 'fr', value: query.language },
    { label: 'Region', id: 'region', type: 'text', placeholder: 'FR', value: query.region },
    { label: 'Year', id: 'year', type: 'text', placeholder: '2022', value: query.year },
  ]
  const handleSearch = async (e: FormEvent) => {
    e.preventDefault()
    console.log(`# query :`, query)
    const { data } = await getMoviesBySearch(query)
    onSearchResults(data.results)
  }
  const handleInputChange = (e: FormEvent) => {
    const target = e.target as HTMLInputElement
    const value =
      target.type === 'checkbox' ? target.checked : target.value;
    setQuery({
      ...query,
      [target.id]: value
    })
    console.log(`# query :`, query)
  }

  return (
    <form onSubmit={(e) => handleSearch(e)}>
      {inputFields.map((field) => (
        <React.Fragment key={field.id}>
          <label htmlFor={field.id}>{field.label}</label>
          <input
            placeholder={field.placeholder}
            onChange={(e) => handleInputChange(e)}
            id={field.id}
            type={field.type}
            checked={field.type === 'checkbox' ? field.value as boolean : undefined}
            value={field.type === 'checkbox' ? undefined : field.value as string}
          />
        </React.Fragment>
      ))}

      <button type="submit">Search</button>
    </form>
  )
}