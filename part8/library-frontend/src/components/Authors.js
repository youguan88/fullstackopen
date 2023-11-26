import { useMutation, useQuery } from "@apollo/client"
import { All_Authors, editAuthor } from "../queries"
import { useState } from "react"

const SetBirthYearForm = () => {
  const [name, setName] = useState('')
  const [born, setBorn] = useState('')
  const [updateBirthYear] = useMutation(editAuthor, {
    refetchQueries: [{query: All_Authors}]
  })
  const handleUpdateAuthor = (event) => {
    event.preventDefault()
    updateBirthYear({variables: {name: name, setBornTo: Number(born)}})
    setName('')
    setBorn('')
  }

  return (
    <div>
      <h2>Set birthyear</h2>
      <form onSubmit={handleUpdateAuthor}>
        <div>name <input value={name} onChange={({ target }) => setName(target.value)} /></div>
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
      <SetBirthYearForm />
    </div>
  )
}

export default Authors
