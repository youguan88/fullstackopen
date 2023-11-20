const initialState = null
const notificationReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'NOTIFICATION':
            return action.payload
        default:
            return state
    }
}

export const setNewNotification = notification => {
    return {
        type: 'NOTIFICATION',
        payload: notification
    }
}

export const resetNotification = () => {
    return {
        type: 'NOTIFICATION',
        payload: initialState
    }
}

export default notificationReducer