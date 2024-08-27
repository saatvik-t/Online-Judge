import axios from 'axios'

const axios_options = { headers: { 'Content-Type': 'application/json' }, withCredentials: true }

// Fetch all submissions
export const getSubmissions = async () => {
    const apiUrl = import.meta.env.VITE_BACKEND_URL
    const GET_SUBMISSIONS_URL = `${apiUrl}/submissions`
    const response = await axios.get(GET_SUBMISSIONS_URL, axios_options)
    console.log('In getSubmissions')
    console.log(response.data)
    return response.data
}