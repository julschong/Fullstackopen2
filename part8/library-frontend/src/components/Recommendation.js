import React, { useEffect } from 'react'
import { useLazyQuery } from '@apollo/client'
import { BOOKS_BY_GENRE } from '../graphql-requests/queries'
import _ from 'lodash'

const Recommendation = ({ userinfo }) => {
    const [bookByGenre, { data }] = useLazyQuery(BOOKS_BY_GENRE)
    let books = []

    useEffect(() => {
        if (!_.isEmpty(userinfo)) {
            bookByGenre({ variables: { genre: userinfo.favoriteGenre } })
        }
    }, [userinfo, bookByGenre])

    if (data) {
        books = data.allBooks
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
    } else {
        return (
            <div>
                <h2>recommendations</h2>
                <p>loading</p>
            </div>
        )
    }
}

export default Recommendation
