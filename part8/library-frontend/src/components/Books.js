import { useQuery } from "@apollo/client"
import { All_Books } from "../queries"
import { useState } from "react"
import BookTable from "./BookTable"

const Books = (props) => {
  const [genreFilter, setGenreFilter] = useState('all genres')
  const  { loading, data, refetch } = useQuery(All_Books, {
    variables: { genre: genreFilter === "all genres" ? '' : genreFilter }
  })
  if (!props.show) {
    return null
  }

  const books = loading ? [] : data.allBooks
  const genres = books.map(book => book.genres).flat()
  const uniqueGenres = [...new Set(genres)].concat('all genres')
  const handleGenreFilter = (genre) => {
    setGenreFilter(genre)
    refetch()
  }
  return (
    <div>
      <h2>books</h2>
      <div>in genre <b>{genreFilter}</b></div>
      <BookTable books={books} />
      {uniqueGenres.map(genre =>
        <button key={genre} value={genre} onClick={()=>handleGenreFilter(genre)}>{genre}</button>
      )}
    </div>
  )
}

export default Books
