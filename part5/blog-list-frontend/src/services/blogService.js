import axios from 'axios'

const base_Url = '/api/blogs'

const getAll = async () => {
    const res = await axios.get(base_Url)
    return res.data
}

export default { getAll }