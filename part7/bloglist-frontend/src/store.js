import { configureStore } from "@reduxjs/toolkit";
import notificationReducer from './reducers/notificationReducer'
import notificationSuccessReducer from './reducers/notificationSuccessReducer'

const store = configureStore({
    reducer: {
        notification: notificationReducer,
        notificationSuccess: notificationSuccessReducer
    }
})

export default store