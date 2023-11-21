import { configureStore } from "@reduxjs/toolkit";
import notificationReducer from './reducers/notificationReducer'
import notificationSuccessReducer from './reducers/notificationSuccessReducer'
import blogReducer from "./reducers/blogReducer";

const store = configureStore({
    reducer: {
        notification: notificationReducer,
        notificationSuccess: notificationSuccessReducer,
        blogs: blogReducer
    }
})

export default store