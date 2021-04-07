import React, { useState, useImperativeHandle } from 'react'
import Button from 'react-bootstrap/Button'
import 'bootstrap/dist/css/bootstrap.min.css'
import './ToggleButton.css'

const ToggleButton = React.forwardRef((prop, ref) => {
    const [visibility, setVisibility] = useState(true)

    const userLoggedIn = prop.appState === 'LOGGED_IN'
    const hideWhenVisible = visibility === true ? 'none' : ''
    const showWhenVisible = visibility === true ? '' : 'none'

    const toggle = () => {
        setVisibility(!visibility)
    }

    useImperativeHandle(ref, () => ({ toggle }))

    return (
        <div>
            <>
                <body className="toggle-container" style={{ display: showWhenVisible }}>
                    {userLoggedIn
                        ? <Button className="hide" variant="outline-primary" onClick={() => setVisibility(!visibility)}>hide</Button>
                        : null}

                    <div className="toggled">
                        {prop.children}
                    </div>
                </body>
                <body className="toggle-container" style={{ display: hideWhenVisible }}>
                    {userLoggedIn
                        ? <Button className="show" variant="outline-primary" onClick={() => setVisibility(!visibility)}>show</Button>
                        : null}
                </body>
            </>
        </div>
    )
})

export default ToggleButton
