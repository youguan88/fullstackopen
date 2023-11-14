/* eslint-disable no-unused-vars */
import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
    name: 'Notification',
    initialState: '',
    reducers: {
        updateNotification(state, action) {
            return action.payload
        },
        removeNotification(state, action) {
            return ''
        }
    }
})

export const {updateNotification, removeNotification} = notificationSlice.actions

export const setNotification = (content, time) => {
    return async dispatch => {
        dispatch(updateNotification(content))
        setTimeout(() => {
            dispatch(removeNotification())
        }, time*1000);
    }
}

export default notificationSlice.reducer