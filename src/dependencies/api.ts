import axios from 'axios'

const api = axios.create({baseURL:'https://github.com/IanMoraes/Heroes/blob/master/heroes.json'})

export default api;