import { createSlice } from "@reduxjs/toolkit"
import anecdoteService from '../services/anecdotes'

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    vote(state, action) {
      const id = action.payload
      const anecdoteToBeUpdated = state.find(a => a.id === id)
      const changedAnecdote = { ...anecdoteToBeUpdated, votes: anecdoteToBeUpdated.votes + 1 }
      return state.map(anecdote => anecdote.id !== anecdoteToBeUpdated.id ? anecdote : changedAnecdote)
    },
    addAnecdote(state, action) {
      return state.concat(action.payload)
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  }
})

export const { vote, addAnecdote, setAnecdotes } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = (content) => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createAnecdote(content)
    dispatch(addAnecdote(newAnecdote))
  }
}

export const handleVote = (anecdote) => {
  return async dispatch => {
    const newObj = {...anecdote, votes: anecdote.votes + 1}
    await anecdoteService.updateAnecdote(anecdote.id, newObj)
    dispatch(vote(anecdote.id))
  }
}

export default anecdoteSlice.reducer