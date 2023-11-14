import { useSelector, useDispatch } from 'react-redux'
import { handleVote } from '../reducers/anecdoteReducer'
import { updateNotification, removeNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
    const dispatch = useDispatch()
    const anecdotes = useSelector(
        ({ anecdotes, filter }) =>
            anecdotes
                .filter(x => x.content.includes(filter))
                .sort((a, b) => b.votes - a.votes)
    )
    const Vote = (anecdote) => {
        console.log('vote', anecdote.id)
        dispatch(handleVote(anecdote))
        dispatch(updateNotification(`you voted ${anecdote.content}`))
        setTimeout(()=> {
            dispatch(removeNotification())
        }, 5000)
    }
    return (
        <>
            {anecdotes.map(anecdote =>
                <div key={anecdote.id}>
                    <div>
                        {anecdote.content}
                    </div>
                    <div>
                        has {anecdote.votes}
                        <button onClick={() => Vote(anecdote)}>vote</button>
                    </div>
                </div>
            )}
        </>
    )

}

export default AnecdoteList