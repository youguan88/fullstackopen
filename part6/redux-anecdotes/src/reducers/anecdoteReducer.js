import { createSlice } from "@reduxjs/toolkit"

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
export default anecdoteSlice.reducer