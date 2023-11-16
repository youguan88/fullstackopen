import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { getAnecdotes, updateAnecdote } from '../requests'
import { useNotificationDispatch } from '../NotificationContext'

const AnecdoteList = () => {

    const dispatch = useNotificationDispatch()
    const updateVoteMutation = useMutation({
        mutationFn: updateAnecdote,
        onSuccess: (updatedAnecdote) => {
            const anecdotes = queryClient.getQueryData(['anecdotes'])
            const newAnecdotes = anecdotes.map((anecdote) => {
                return anecdote.id === updatedAnecdote.id ? updatedAnecdote : anecdote
            })
            queryClient.setQueryData(['anecdotes'], newAnecdotes)
            dispatch({ type: 'NOTIFY', payload: `anecdote '${updatedAnecdote.content}' voted` })
            setTimeout(() => { dispatch({ type: 'REMOVE' }) }, 5000)
        }
    })
    const handleVote = (anecdote) => {
        updateVoteMutation.mutate({ ...anecdote, votes: anecdote.votes + 1 })
    }

    const queryClient = useQueryClient()
    const result = useQuery({
        queryKey: ['anecdotes'],
        queryFn: getAnecdotes
    })
    if (result.isLoading) {
        return <div>loading data...</div>
    }
    const anecdotes = result.data

    return (
        anecdotes.map(anecdote =>
            <div key={anecdote.id}>
                <div>
                    {anecdote.content}
                </div>
                <div>
                    has {anecdote.votes}
                    <button onClick={() => handleVote(anecdote)}>vote</button>
                </div>
            </div>
        )
    )
}

export default AnecdoteList