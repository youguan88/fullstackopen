import { useSelector, useDispatch } from 'react-redux'
import { handleVote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

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
        dispatch(setNotification(`you voted ${anecdote.content}`, 5))
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