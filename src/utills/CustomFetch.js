import axios from "axios"

const CustomFetch = axios.create({
    baseURL :import.meta.env.DEV? '/api' : 'https://harmonious-smile-production.up.railway.app/api',
     withCredentials: true,
})

export default CustomFetch