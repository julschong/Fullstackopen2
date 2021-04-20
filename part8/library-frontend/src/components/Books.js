import React from 'react'
import { useQuery } from '@apollo/client'
import { ALL_BOOKS } from '../graphql-requests/queries'

const Books = (props) => {
    const result = useQuery(ALL_BOOKS)
    let books = []

    if (result.loading) {
        return (
            <div>
                <h2>books</h2>
                <p>loading</p>
            </div>
        )
    } else {
        books = result.data.allBooks
    }

    if (!props.show) {
        return null
    }

    return (
        <div>
            <h2>books</h2>

            <table>
                <tbody>
                    <tr>
                        <th></th>
                        <th>author</th>
                        <th>published</th>
                    </tr>
                    {books.map((a, i) => (
                        <tr key={a.title + i}>
                            <td>{a.title}</td>
                            <td>{a.author.name}</td>
                            <td>{a.published}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default Books
