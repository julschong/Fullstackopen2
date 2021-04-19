import React, { useState } from 'react'
import { useQuery, useMutation } from '@apollo/client'
import { ALL_AUTHORS } from '../graphql-requests/queries'
import { UPDATE_AUTHOR } from '../graphql-requests/mutations'

const Authors = (props) => {
    const result = useQuery(ALL_AUTHORS)
    const [updateAuthor] = useMutation(UPDATE_AUTHOR, {
        refetchQueries: [{ query: ALL_AUTHORS }],
    })

    const [name, setName] = useState('')
    const [born, setBorn] = useState('')

    const submitUpdate = async (event) => {
        event.preventDefault()
        await updateAuthor({ variables: { name, setBornTo: Number(born) } })
        setName('')
        setBorn('')
    }

    if (!props.show) {
        return null
    }

    let authors = []

    if (result.loading) {
        return (
            <div>
                <h2>authors</h2>
                <p>loading</p>
            </div>
        )
    } else {
        authors = result.data.allAuthors
    }

    return (
        <div>
            <h2>authors</h2>
            <table>
                <tbody>
                    <tr>
                        <th></th>
                        <th>born</th>
                        <th>books</th>
                    </tr>
                    {authors.map((a) => (
                        <tr key={a.name}>
                            <td>{a.name}</td>
                            <td>{a.born}</td>
                            <td>{a.bookCount}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <h2>Set Birth year</h2>
            <form onSubmit={submitUpdate}>
                <label>name </label>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <br />
                <label>born </label>
                <input
                    type="number"
                    value={born}
                    onChange={(e) => setBorn(e.target.value)}
                />
                <br />
                <button type="submit">update author</button>
            </form>
        </div>
    )
}

export default Authors