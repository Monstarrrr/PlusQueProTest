import React, { FormEvent, useState } from "react"
import { getMoviesBySearch } from "../api/getMoviesBySearch"
import { SearchQuery } from "../types/searchQuery"
import { Movie } from "../types/movie"
import styled from "styled-components"

const Form = styled.form`
  margin: 28px auto 0;
  background-color: rgb(48, 48, 48);
  padding: 20px;
  border-radius: 20px;
`

const Inputs = styled.div`
  display: flex;
  max-width: 500px;
  justify-content: center;
  gap: 20px;
  flex-wrap: wrap;
`

const Label = styled.label`
  /* width: fit-content; */
`
const Input = styled.input`
  /* width: fit-content; */
`
const Button = styled.button`
  font-weight: bold;
  height: 40px;
  margin-top: 20px;
  width: 200px;
`
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
    <Form onSubmit={(e) => handleSearch(e)}>
      <Inputs>
        {inputFields.map((field) => (
          <div key={field.id}>
            <Label htmlFor={field.id}>{field.label}</Label>
            <br />
            <Input
              placeholder={field.placeholder}
              onChange={(e) => handleInputChange(e)}
              id={field.id}
              type={field.type}
              checked={field.type === 'checkbox' ? field.value as boolean : undefined}
              value={field.type === 'checkbox' ? undefined : field.value as string}
            />
          </div>
        ))}
      </Inputs>
      <Button type="submit">Search</Button>
    </Form>
  )
}