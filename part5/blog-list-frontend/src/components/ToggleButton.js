import React, { useState, useImperativeHandle } from 'react'
import Button from 'react-bootstrap/Button'
import 'bootstrap/dist/css/bootstrap.min.css'
import './ToggleButton.css'

const ToggleButton = React.forwardRef((prop, ref) => {
    const [visibility, setVisibility] = useState(true)

    const hideWhenVisible = visibility === true ? 'none' : ''
    const showWhenVisible = visibility === true ? '' : 'none'

    const toggle = () => {
        setVisibility(!visibility)
    }

    useImperativeHandle(ref, () => ({ toggle }))

    return (
        <div className="toggle-container">
            <div style={{ display: showWhenVisible }}>
                <Button className="hide" variant="outline-primary" onClick={() => setVisibility(!visibility)}>hide</Button>
                <br></br>
                <div className="toggled">
                    {prop.children}
                </div>
            </div>
            <div style={{ display: hideWhenVisible }}>
                <Button className="show" variant="outline-primary" onClick={() => setVisibility(!visibility)}>show</Button>
            </div>
        </div>
    )
})

export default ToggleButton
