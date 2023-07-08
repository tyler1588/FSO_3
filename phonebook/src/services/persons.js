import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/persons'

const getAll = () => axios.get(baseUrl)

const create = newObject => axios.post(baseUrl, newObject)

const deletePerson = id => axios.delete(`${baseUrl}/${id}`)

const updatePerson = (id, newObject) => axios.put(`${baseUrl}/${id}`, newObject)

const personService = {
    getAll,
    create,
    deletePerson,
    updatePerson
}
export default personService;