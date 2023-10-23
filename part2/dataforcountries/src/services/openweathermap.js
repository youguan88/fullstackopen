import axios from 'axios'
const baseUrl = "https://api.openweathermap.org/data/2.5/"

const getAll = (country, api_key) => axios.get(`${baseUrl}weather?q=${country.capital}&appid=${api_key}&units=metric`)

export default {getAll}