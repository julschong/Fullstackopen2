import React from 'react'
import {useDispatch, useSelector} from 'react-redux'

const WorkorderList = () => {
    const dispatch = useDispatch()
    const workorders = useSelector(state => state.workorders)
    return (
        <div>
            {workorders.map(workorder=>workorder.number)}
        </div>
    )
}

export default WorkorderList
