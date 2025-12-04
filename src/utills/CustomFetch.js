import axios from "axios"

const CustomFetch = axios.create({
    baseURL : '/api',
     withCredentials: true,
})

export default CustomFetch