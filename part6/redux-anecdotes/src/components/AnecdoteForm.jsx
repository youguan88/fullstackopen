import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { updateNotification, removeNotification } from '../reducers/notificationReducer'

const AnecdoteForm = () => {
    const dispatch = useDispatch()
    const AddAnecdote = async (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value = ''
        dispatch(createAnecdote(content))
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