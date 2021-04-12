import { isEmpty } from '../utils/helper'

const initialState = {}

export default (state = initialState, action) => {
    switch (action.type) {
    case 'SET_NOTIFICATION':
        if(!isEmpty(state)) {
            clearTimeout(state.timeoutId)
        }
        return action.data
    case 'RESET':
        return action.data
    default:
        return state
    }
}

export const setNotification = (message, color, duration) => {
    return async (dispatch) => {
        const timeoutId = setTimeout(() => {
            dispatch({
                type: 'RESET',
                data: {},
            })
        }, duration)

        dispatch({
            type: 'SET_NOTIFICATION',
            data: { message: message, color: color, timeoutId: timeoutId },
        })
    }
}
