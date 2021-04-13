import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUsers } from '../reducers/userReducer'
import Table from 'react-bootstrap/Table'

const Users = () => {
    const dispatch = useDispatch()
    const users = useSelector(state => state.users)
    useEffect(() => {
        dispatch(getUsers())
    }, [])

    return (
        <div style={{ margin: '2rem 14rem' }}>
            <Table striped bordered hover>
                <thead>
                    <th>Author</th>
                    <th>blogs created</th>

                </thead>

                {users.map(user =>
                    <tr key={user.id}>
                        <td>{user.name}</td>
                        <td>{user.blogs.length}</td>
                    </tr>
                )}

            </Table>
        </div>
    )
}

export default Users
