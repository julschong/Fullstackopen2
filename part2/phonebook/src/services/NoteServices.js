import axios from "axios"

const baseURL = "/api/persons"

const getAll = () => {
  return axios.get(baseURL).then((result) => result.data)
}

const create = (newPerson) => {
  return axios.post(baseURL, newPerson).then((result) => result.data)
}

const deleteById = (id) => {
  return axios.delete(`${baseURL}/${id}`).then((result) => result)
}

const updatePersonById = (id, newPerson) => {
  return axios.put(`${baseURL}/${id}`, newPerson).then((result) => result)
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll, create, deleteById, updatePersonById }
