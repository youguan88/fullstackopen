import { configureStore } from "@reduxjs/toolkit";
import notificationReducer from './reducers/notificationReducer'
import notificationSuccessReducer from './reducers/notificationSuccessReducer'
import blogReducer from "./reducers/blogReducer";
import loginReducer from "./reducers/loginReducer";
import userReducer from "./reducers/userReducer";

const store = configureStore({
    reducer: {
        notification: notificationReducer,
        notificationSuccess: notificationSuccessReducer,
        blogs: blogReducer,
        loginInfo: loginReducer,
        users: userReducer
    }
})

export default store