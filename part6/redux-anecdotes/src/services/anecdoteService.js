import axios from 'axios'

const base_Url = 'http://localhost:3004/anecdotes'
const getId = () => (100000 * Math.random()).toFixed(0)

const getAll = async () => {
    const res = await axios.get(base_Url)
    return res.data
}

const getOne = async (id) => {
    const res = await axios.get(`${base_Url}/${id}`)
    return res.data
}

const createOne = async (content) => {
    let res = await getAll()
    const newAnecdote = {
        content: content,
        id: getId(),
        votes: 0,
    }
    res = await axios.post(base_Url, newAnecdote)
    return res.data
}

const updateOne = async (body) => {
    const anecdoteId = body.id

    const res = await axios.put(`${base_Url}/${anecdoteId}`, body)
    return res.data

}

const anecdoteService = { getAll, createOne, updateOne, getOne }

export default anecdoteService
