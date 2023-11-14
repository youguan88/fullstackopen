import { useDispatch } from 'react-redux'
import { addAnecdote } from '../reducers/anecdoteReducer'
import { updateNotification, removeNotification } from '../reducers/notificationReducer'
import anecdoteService from '../services/anecdotes'

const AnecdoteForm = () => {
    const dispatch = useDispatch()
    const AddAnecdote = async (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value = ''
        const newAnecdote = await anecdoteService.createAnecdote(content)
        dispatch(addAnecdote(newAnecdote))
        dispatch(updateNotification(`you added ${content}`))
        setTimeout(()=>{
            dispatch(removeNotification())
        }, 5000)
    }
    return (
        <>
            <h2>create new</h2>
            <form onSubmit={AddAnecdote}>
                <div><input name='anecdote' /></div>
                <button type='submit'>create</button>
            </form>
        </>
    )
}

export default AnecdoteForm