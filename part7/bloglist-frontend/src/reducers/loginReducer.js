import { createSlice } from "@reduxjs/toolkit"
import loginService from '../services/login'
import blogService from "../services/blogs"

const loginSplice = createSlice({
    name: 'loginDetails',
    initialState: null,
    reducers: {
        setLoginDetails(state, action) {
            return action.payload
        },
        removeLoginDetails(state, action) {
            return null
        }
    }
})

export const loginAction = (username, password) => {
    return async dispatch => {
        const user = await loginService.login({ username, password })
        window.localStorage.setItem('loggedInUser', JSON.stringify(user))
        blogService.setToken(user.token)
        dispatch(setLoginDetails(user))
    }
}

export const initializeLogin = (user) => {
    return dispatch => {
        blogService.setToken(user.token)
        dispatch(setLoginDetails(user))
    }
}

export const initializeLogout = () => {
    return dispatch => {
        window.localStorage.clear()
        dispatch(removeLoginDetails())
    }
}

export const { setLoginDetails, removeLoginDetails } = loginSplice.actions

export default loginSplice.reducer