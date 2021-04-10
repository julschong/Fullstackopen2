import React from 'react'
import { useSelector } from 'react-redux'

const Notification = () => {
    const notification = useSelector((state) => state.notification)

    const style = {
        border: `solid ${notification.color} 1px`,
        color: notification.color,
        lineHeight: "5px",
        borderRadius: "5px"
    }
    return (
        <>
            {(JSON.stringify(notification) !== '{}') ? (
                <div style={style}>
                    <h2>{notification.message}</h2>
                </div>
            ) : null}
        </>
    )
}

export default Notification
