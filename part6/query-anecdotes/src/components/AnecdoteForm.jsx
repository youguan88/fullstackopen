import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createAnecdote } from "../requests"
import { useNotificationDispatch } from "../NotificationContext"

const AnecdoteForm = () => {

  const queryClient = useQueryClient()
  const dispatch = useNotificationDispatch()

  const createAnecdoteMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: (newAnecdote) => {
      const anecdotes = queryClient.getQueryData(['anecdotes'])
      queryClient.setQueryData(['anecdotes'], anecdotes.concat(newAnecdote))
      dispatch({ type: 'NOTIFY', payload: `Added ${newAnecdote.content}` })
      setTimeout(() => { dispatch({ type: 'REMOVE' }) }, 5000)
    },
    onError: (res) => {
      dispatch({ type: 'NOTIFY', payload: res.response.data.error })
      setTimeout(() => { dispatch({ type: 'REMOVE' }) }, 5000)
    }
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    createAnecdoteMutation.mutate({ content, votes: 0 })
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' defaultValue="example" />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
