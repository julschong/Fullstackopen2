import axios from 'axios'

const base_Url = '/api/users'

const registerUser = async (registration) => {
    const res = await axios.post(base_Url, registration)
    return res.data
}

const registerUserService = { registerUser }

export default registerUserService