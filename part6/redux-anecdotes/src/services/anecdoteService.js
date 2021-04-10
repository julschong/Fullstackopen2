import axios from 'axios'

const base_Url = 'http://localhost:3004/anecdotes'
const getId = () => (100000 * Math.random()).toFixed(0)

const getAll = () => {
    return axios.get(base_Url).then((res) => res.data)
}

const createOne = async (content) => {
    let res = await getAll()

    const newAnecdote = {
        content: content,
        id: getId(),
        vote: 0,
    }
    res = await axios.post(base_Url, newAnecdote)
    return res.data
}

const anecdoteService = { getAll, createOne }

export default anecdoteService
