import React, { useState } from 'react'
import { useQuery } from '@apollo/client'
import { ALL_BOOKS } from '../graphql-requests/queries'
import _ from 'lodash'

const Books = () => {
    const [filter, setfilter] = useState('')

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

    return (
        <div>
            <h2>books</h2>

            <table>
                <tbody>
                    <tr>
                        <th>title</th>
                        <th>author</th>
                        <th>published</th>
                        <th>Genres</th>
                    </tr>
                    {filter === ''
                        ? books.map((a, i) => (
                              <tr key={a.title + i}>
                                  <td>{a.title}</td>
                                  <td>{a.author.name}</td>
                                  <td>{a.published}</td>
                                  <td>{a.genres.join(', ')}</td>
                              </tr>
                          ))
                        : books
                              .filter((book) => book.genres.includes(filter))
                              .map((a, i) => (
                                  <tr key={a.title + i}>
                                      <td>{a.title}</td>
                                      <td>{a.author.name}</td>
                                      <td>{a.published}</td>
                                      <td>{a.genres.join(', ')}</td>
                                  </tr>
                              ))}
                </tbody>
            </table>
            <button value="" onClick={(e) => setfilter(e.target.value)}>
                All
            </button>
            {_.uniq(_.flatten(books.map((book) => book.genres))).map(
                (genre) => (
                    <button
                        key={genre}
                        value={genre}
                        onClick={(e) => setfilter(e.target.value)}
                    >
                        {genre}
                    </button>
                )
            )}
        </div>
    )
}

export default Books
