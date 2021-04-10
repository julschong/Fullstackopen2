import { setNotification } from '../reducers/notificationReducer'

export const displayNotification = (
    notification,
    dispatch,
    message,
    color,
    duration
) => {
    if (JSON.stringify(notification) !== '{}') {
        clearTimeout(notification.timeoutId)
    }
    const timeoutId = setTimeout(() => {
        dispatch(setNotification())
    }, duration)
    dispatch(setNotification(message, color, timeoutId))
}
