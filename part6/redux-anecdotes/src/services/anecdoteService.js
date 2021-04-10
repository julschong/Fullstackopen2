import axios from 'axios'

const base_Url = 'http://localhost:3004/anecdotes'

const getAll = () => {
    return axios.get(base_Url).then((res) => res.data)
}

const anecdoteService = { getAll }

export default anecdoteService
