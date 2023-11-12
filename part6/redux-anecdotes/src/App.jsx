import { useDispatch } from 'react-redux'
import { AddAnecdote } from './reducers/anecdoteReducer'
import AnecdoteForm  from './components/AnecdoteForm'

const App = () => {

  const dispatch = useDispatch()

  const addAnecdote = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    dispatch(AddAnecdote(content))
  }

  return (
    <div>
      <AnecdoteForm />
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div><input name='anecdote' /></div>
        <button type='submit'>create</button>
      </form>
    </div>
  )
}

export default App