import React from 'react'
import { useQuery } from '@apollo/client'
import { BOOKS_BY_GENRE } from '../graphql-requests/queries'

const Recommendation = ({ userinfo }) => {
    const result = useQuery(BOOKS_BY_GENRE, {
        variables: { genre: userinfo.favoriteGenre || '' },
    })

    let books = []

    if (result.loading) {
        return (
            <div>
                <h2>recommendations</h2>
                <p>loading</p>
            </div>
        )
    } else {
        books = result.data.allBooks
    }

    return (
        <div>
            <h2>recommendations</h2>
            <p>
                books in your favorite genre{' '}
                <strong>{userinfo.favoriteGenre}</strong>
            </p>
            <table>
                <tbody>
                    <tr>
                        <th>title</th>
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

export default Recommendation
