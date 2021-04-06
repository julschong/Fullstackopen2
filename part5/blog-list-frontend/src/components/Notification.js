import React from 'react'
import './Notification.css'


const Notification = ({ text, color }) => {
    return (
        <h3 className="error" style={{ color: color, borderColor: color }}> {text}</h3 >
    )
}

export default Notification
