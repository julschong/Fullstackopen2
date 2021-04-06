import axios from 'axios'

const base_Url = '/api/blogs'

const getAll = async () => {
    const res = await axios.get(base_Url)
    return res.data
}

const createOne = async (blog, token) => {
    const auth = { headers: { Authorization: "bearer " + token } }
    console.log(auth)
    const res = await axios.post(base_Url, blog, auth)
    return res.data
}


const blogService = { getAll, createOne }

export default blogService