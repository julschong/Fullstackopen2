import axios from 'axios'

const base_Url = '/api/login'

const login = async (cred) => {
    const res = await axios.post(base_Url, cred)
    return res.data
}

const loginService = { login }

export default loginService