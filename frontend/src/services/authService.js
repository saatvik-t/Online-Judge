import axios from 'axios'
const apiUrl = import.meta.env.VITE_BACKEND_URL

const REGISTER_URL = `${apiUrl}/auth/register`
const LOGIN_URL = `${apiUrl}/auth/login`
const LOGOUT_URL = `${apiUrl}/auth/logout`
const CHECKAUTH_URL = `${apiUrl}/auth/checkAuth`

const axios_options = { headers: { 'Content-Type': 'application/json' }, withCredentials: true }

export const register = async (formData) => {
    const response = await axios.post(REGISTER_URL, JSON.stringify(formData), axios_options)
    console.log('register', response)
    return response.data
}

export const login = async (formData) => {
    const response = await axios.post(LOGIN_URL, JSON.stringify(formData), axios_options)
    console.log('login', response)
    return response.data
}

export const validateToken = async () => {
    try {
        const response = await axios.get(CHECKAUTH_URL, axios_options)
        console.log('Validate token', response)
        return response.data
    } catch (error) {
        console.log('Catch in service', error)
    }
}

export const logout = async () => {
    await axios.post(LOGOUT_URL, {}, { withCredentials: true })
}