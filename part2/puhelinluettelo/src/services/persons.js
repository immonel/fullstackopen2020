import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

const get = () => {
    return axios.get(baseUrl)
                .then(response => {
                    console.log(response)
                    return response.data
                })
}

const add = (newPerson) => {
    return axios.post(baseUrl, newPerson)
                .then(response => {
                    console.log(response)
                    return response.data
                })
}

const update = (id, newPerson) => {
    return axios.put(`${baseUrl}/${id}`, newPerson)
                .then(response => {
                    console.log(response)
                    return response.data
                })
}

const del = (id) => {
    return axios.delete(`${baseUrl}/${id}`)
                .then(response => {
                    console.log(response)
                    return response.data
                })
}

export default { get, add, update, del }