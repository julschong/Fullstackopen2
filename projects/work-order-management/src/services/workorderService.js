import axios from 'axios'

const baseUrl = 'http://localhost:3001/workorders'

const getAll = async () => {
    const res = await axios.get(baseUrl)
    return res.data
}

const workorderService = { getAll }

export default workorderService
