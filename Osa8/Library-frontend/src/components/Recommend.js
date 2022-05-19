import { useState, useEffect } from 'react'
import { useQuery } from '@apollo/client'
import { FAVORITE_BOOKS } from '../graphql/queries'

const Recommend = ({ show }) => {
  const [favoriteGenre, setFavoriteGenre] = useState(null)
  const [books, setBooks] = useState([])
  
  const { loading, data } = useQuery(FAVORITE_BOOKS)

  useEffect(() => {
    if (data) {
      setFavoriteGenre(data.me ? data.me.favoriteGenre : null)
      const genreBooks = data.allBooks.filter(b => b.genres.includes(favoriteGenre))
      setBooks(genreBooks) 
    }
  }, [data, favoriteGenre])

  if (!show) {
    return null
  }

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <h2>Recommendations</h2>
      <p> 
        books in your favorite genre <b>{favoriteGenre}</b>
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

export default Recommend