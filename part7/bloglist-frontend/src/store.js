import { configureStore } from "@reduxjs/toolkit";
import notificationReducer from './reducers/notificationReducer'
import notificationSuccessReducer from './reducers/notificationSuccessReducer'
import blogReducer from "./reducers/blogReducer";
import loginReducer from "./reducers/loginReducer";

const store = configureStore({
    reducer: {
        notification: notificationReducer,
        notificationSuccess: notificationSuccessReducer,
        blogs: blogReducer,
        loginInfo: loginReducer
    }
})

export default store