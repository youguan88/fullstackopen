import { useMutation, useQuery } from "@apollo/client"
import { All_Authors, editAuthor } from "../queries"
import { useState } from "react"

const SetBirthYearForm = ({ authors }) => {
  const initialName = authors.length > 0 ? authors[0].name : ''
  const [name, setName] = useState(initialName)
  const [born, setBorn] = useState('')
  const [updateBirthYear] = useMutation(editAuthor, {
    refetchQueries: [{ query: All_Authors }]
  })
  const handleUpdateAuthor = (event) => {
    event.preventDefault()
    updateBirthYear({ variables: { name: name, setBornTo: Number(born) } })
    setName(initialName)
    setBorn('')
  }

  if (authors.length === 0)
  {
    return null
  }

  return (
    <div>
      <h2>Set birthyear</h2>
      <form onSubmit={handleUpdateAuthor}>
        <div>
            <select onChange={({ target }) => setName(target.value)}>
              {authors.map(author => 
                  <option key={author.name} value={author.value}>{author.name}</option>
              )}
            </select>
        </div>
        <div>born <input value={born} onChange={({ target }) => setBorn(target.value)} /></div>
        <div><button type="submit">update author</button></div>
      </form>
    </div>
  )
}

const Authors = (props) => {
  const result = useQuery(All_Authors)

  if (!props.show) {
    return null
  }
  const authors = result.loading ? [] : result.data.allAuthors

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <SetBirthYearForm authors={authors} />
    </div>
  )
}

export default Authors
