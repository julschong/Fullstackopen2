import React from "react"
import axios from "axios"

const baseURL = "http://localhost:3001/persons"

const getAll = () => {
  return axios.get(baseURL).then((result) => result.data)
}

const create = (newPerson) => {
  return axios.post(baseURL, newPerson).then((result) => result.data)
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll, create }
