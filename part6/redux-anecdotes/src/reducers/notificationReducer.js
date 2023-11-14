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
export default notificationSlice.reducer