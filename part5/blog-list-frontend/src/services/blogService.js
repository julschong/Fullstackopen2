import axios from 'axios'

const base_Url = '/api/blogs'

const getAll = async () => {
    const res = await axios.get(base_Url)
    return res.data
}

const createOne = async (blog, token) => {
    const auth = { headers: { Authorization: 'bearer ' + token } }
    const res = await axios.post(base_Url, blog, auth)
    return res.data
}

const deleteOne = async function (blog, token) {
    const auth = { headers: { Authorization: 'bearer ' + token } }
    const res = await axios.delete(`${base_Url}/${blog.id}`, auth)
    return res.data
}

const updateOne = async (blog) => {
    const res = await axios.put(`${base_Url}/${blog.id}`, blog)
    return res.data
}


const blogService = { getAll, createOne, deleteOne, updateOne }

export default blogService