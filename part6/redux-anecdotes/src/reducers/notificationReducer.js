import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
    name: 'Notification',
    initialState: 'TestNotification',
    reducers: {
        updateNotification(state, action) {
            return action.payload
        }
    }
})

export const {updateNotification} = notificationSlice.actions
export default notificationSlice.reducer