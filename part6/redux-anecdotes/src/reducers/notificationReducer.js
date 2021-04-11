const initialState = {}

const notificationReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_NOTIFICATION':
            return action.data

        default:
            return state
    }
}

export const setNotification = (message, color, timeoutId) => {
    return {
        type: 'SET_NOTIFICATION',
        data: { message: message, color: color, timeoutId: timeoutId },
    }
}

export default notificationReducer
