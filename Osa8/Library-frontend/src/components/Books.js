import { useState, useEffect } from 'react'
import { useQuery } from '@apollo/client'
import { ALL_BOOKS_AND_GENRES } from '../graphql/queries'

const Books = (props) => {
  const [books, setBooks] = useState([])
  const [genres, setGenres] = useState([])
  const [genre, setGenre] = useState('all genres')

  const { loading, data, refetch } = useQuery(ALL_BOOKS_AND_GENRES)

  useEffect(() => {
    if (data) {
      setBooks(data.allBooks)
      setGenres(data.allGenres)
    }
  }, [data])
  
  if (!props.show) {
    return null
  }

  if (loading) {
    return <div>Loading...</div>
  }

  const handleGenreChange = async (selectedGenre) => {
    setGenre(selectedGenre)
    const genreFilter = selectedGenre === 'all genres' ? undefined : selectedGenre
    refetch({ genre: genreFilter })
  }

  return (
    <div>
      <h2>books</h2>
      {genres.map((genre, index) => 
        <button key={index} onClick={() => handleGenreChange(genre)}>
          {genre}
        </button>  
      )}
      <p> 
        in genre <b>{genre}</b>
      </p>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Books
