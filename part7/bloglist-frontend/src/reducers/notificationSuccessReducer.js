const initialState = true
const notificationSuccessReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_STATUS':
            return action.payload
        default:
            return state
    }
}

export const setNotificationStatus = notificationStatus => {
    return {
        type: 'SET_STATUS',
        payload: notificationStatus
    }
}

export default notificationSuccessReducer