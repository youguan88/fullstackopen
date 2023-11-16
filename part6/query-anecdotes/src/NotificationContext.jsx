/* eslint-disable react/prop-types */
import { useContext, useReducer } from "react"
import { createContext } from "react"

const initialState = ''

const notificationReducer = (state, action) => {
    switch(action.type) {
        case "NOTIFY":
            return action.payload
        case "REMOVE":
            return initialState
        default:
            return state
    }
}

const NotificationContext = createContext()

export const NotificationContextProvider = (props) => {
    const [notification, notificationDispatch] = useReducer(notificationReducer, initialState)
    return (
        <NotificationContext.Provider value={[notification, notificationDispatch]}>
            {props.children}
        </NotificationContext.Provider>
    )
}

export const useNotificationValue = () => {
    const counterAndDispatch = useContext(NotificationContext)
    return counterAndDispatch[0]
  }
  
  export const useNotificationDispatch = () => {
    const counterAndDispatch = useContext(NotificationContext)
    return counterAndDispatch[1]
  }

export default NotificationContext