import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/persons'

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => {
        return response.data
    })
}

const create = newObject => {
    const request = axios.post(baseUrl, newObject)
    return request.then(response => {
        return response.data
    })
}

const erase = (id) => {
    const urlToDelete = baseUrl + "/" + id
    const request = axios.delete(urlToDelete)
    return request.then(response => {
        return response.data
    })
}

const replace = (id, updatedContact) => {
    const urlToUpdate = baseUrl + "/" + id
    const request = axios.put(urlToUpdate, {
        id: id,
        name: updatedContact.name,
        number: updatedContact.number,
    })
    return request.then(response => {
        return response.data
    })
}

export default {
    getAll: getAll,
    create: create,
    erase: erase,
    replace: replace
}