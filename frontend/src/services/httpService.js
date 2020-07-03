import Axios from 'axios';
import { toast } from 'react-toastify'

Axios.defaults.baseURL = process.env.REACT_APP_API_URL

Axios.interceptors.response.use(null, error => {
    const expectedError = error.response && error.response.status >= 400 && error.response.status < 500
    if(!expectedError){
        toast.error('An unexpected error occured');
    }
    return Promise.reject(error)
})

function setToken(token){
    Axios.defaults.headers.common["x-auth-token"] = token
}

export default {
    get : Axios.get,
    post : Axios.post,
    put : Axios.put,
    delete : Axios.delete,
    setToken
}