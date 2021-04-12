import React from 'react'
import './Notification.css'
import { useSelector } from 'react-redux'
import { isEmpty } from '../utils/helper'


const Notification = () => {
    const notification = useSelector(state => state.notification)
    return (
        <>
            {isEmpty(notification)
                ? null
                : <h3 className="error"
                    style={{ color: notification.color, borderColor: notification.color }}>
                    {notification.message}
                </h3 >}
        </>
    )
}

export default Notification
