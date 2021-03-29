import axios from "axios"

const baseURL = "http://localhost:3001/persons"

const getAll = () => {
  return axios.get(baseURL).then((result) => result.data)
}

const create = (newPerson) => {
  return axios.post(baseURL, newPerson).then((result) => result.data)
}

const deleteById = (id) => {
  return axios.delete(`${baseURL}/${id}`).then((result) => result)
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll, create, deleteById }
