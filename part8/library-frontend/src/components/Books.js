import { useQuery } from "@apollo/client"
import { All_Books } from "../queries"
import { useState } from "react"

const Books = (props) => {
  const [genreFilter, setGenreFilter] = useState('')
  const result = useQuery(All_Books, {
    variables: {genre: genreFilter}
  })
  if (!props.show) {
    return null
  }

  const books = result.loading ? [] : result.data.allBooks
  const genres = books.map(book => book.genres).flat()
  const uniqueGenres = [...new Set(genres)].concat('all genres')

  return (
    <div>
      <h2>books</h2>

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
      {uniqueGenres.map(genre => 
        <button key={genre} value={genre} onClick={()=>setGenreFilter(genre === 'all genres' ? '' : genre)}>{genre}</button>
        )}
    </div>
  )
}

export default Books
