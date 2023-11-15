import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

export const getAnecdotes = async () => {
    return await axios.get(baseUrl).then(res => res.data)
}

export const createAnecdote = async (newObj) => {
    return await axios.post(baseUrl, newObj).then(res => res.data)
}