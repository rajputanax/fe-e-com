import axios from "axios"

const CustomFetch = axios.create({
    baseURL :import.meta.env.DEV? '/api' : 'https://harmonious-smile-production.up.railway.app',
     withCredentials: true,
})

export default CustomFetch