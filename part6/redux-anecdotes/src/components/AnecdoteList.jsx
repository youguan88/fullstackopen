import { useSelector, useDispatch } from 'react-redux'
import { Vote } from '../reducers/anecdoteReducer'

const AnecdoteList = () => {
    const dispatch = useDispatch()
    const anecdotes = useSelector(
        ({ anecdotes, filter }) =>
            anecdotes
                .filter(x => x.content.includes(filter))
                .sort((a, b) => b.votes - a.votes)
    )
    const vote = (id) => {
        console.log('vote', id)
        dispatch(Vote(id))
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
                        <button onClick={() => vote(anecdote.id)}>vote</button>
                    </div>
                </div>
            )}
        </>
    )

}

export default AnecdoteList