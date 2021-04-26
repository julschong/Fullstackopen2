import React from 'react'

type Prop = {courseName: string}

const Header = ({courseName}:Prop) => {
    return (
        <h1>
            {courseName}
        </h1>
    )
}

export default Header
