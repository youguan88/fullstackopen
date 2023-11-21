import { createSlice } from "@reduxjs/toolkit"
import blogService from '../services/blogs'

const blogSlice = createSlice({
    name: 'blogs',
    initialState: [],
    reducers: {
        setBlogs(state, action) {
            return action.payload
        },
        appendBlog(state, action) {
            state.push(action.payload)
        },
        changeBlog(state, action) {
            return state.map((blog) =>
                blog.id === action.payload.id
                    ? action.payload
                    : blog)
        },
        deleteBlog(state, action) {
            return state.filter((blog) =>
                blog.id !== action.payload.id)
        }
    }
})

export const initializeBlogs = () => {
    return async dispatch => {
        const blogs = await blogService.getAll()
        dispatch(setBlogs(blogs))
    }
}

export const createBlog = (blog, user) => {
    return async dispatch => {
        const newBlog = await blogService.create(blog)
        user.token = null
        newBlog.user = user
        dispatch(appendBlog(newBlog))
    }
}

export const updateBlog = (blog) => {
    return async dispatch => {
        const updatedblog = {
            ...blog,
            likes: blog.likes + 1,
            user: blog.user.id
        }
        await blogService.update(blog.id, updatedblog)
        dispatch(changeBlog({ ...blog, likes: blog.likes + 1 }))
    }
}

export const removeBlog = (blog) => {
    return async dispatch => {
        await blogService.deleteBlog(blog.id)
        dispatch(deleteBlog(blog))
    }
}

export const { setBlogs, appendBlog, changeBlog, deleteBlog } = blogSlice.actions
export default blogSlice.reducer