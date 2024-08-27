import axios from 'axios'

const apiUrl = import.meta.env.VITE_BACKEND_URL
const axios_options = { headers: { 'Content-Type': 'application/json' }, withCredentials: true }

const RUN_URL = `${apiUrl}/run`
const JUDGE_URL = `${apiUrl}/judge`

export const getProblems = async () => {
    const GET_PROBLEMS_URL = `${apiUrl}/problems`
    const response = await axios.get(GET_PROBLEMS_URL, axios_options)
    console.log(response.data)
    return response.data
}

export const getProblem = async (id) => {
    const GET_PROBLEM_URL = `${apiUrl}/problems/${id}/`
    const response = await axios.get(GET_PROBLEM_URL, axios_options)
    return response.data
}

export const createProblem = async (problem) => {
    const POST_PROBLEM_URL = `${apiUrl}/problems`
    const response = await axios.post(POST_PROBLEM_URL, JSON.stringify(problem), axios_options)
    return response.data
}

export const updateProblem = async (id, updatedProblem) => {
    const PUT_PROBLEM_URL = `${apiUrl}/problems/${id}`
    const response = await axios.put(PUT_PROBLEM_URL, JSON.stringify(updatedProblem), axios_options)
    return response.data
}

export const deleteProblem = async (id) => {
    const DELETE_PROBLEM_URL = `${apiUrl}/problems/${id}`
    console.log(DELETE_PROBLEM_URL)
    const response = await axios.delete(DELETE_PROBLEM_URL, axios_options)
    return response.data
}

export const run = async (formData) => {
    const response = await axios.post(RUN_URL, JSON.stringify(formData), axios_options)
    console.log(response)
    return response.data
}

export const judge = async (formData) => {
    const response = await axios.post(JUDGE_URL, JSON.stringify(formData), axios_options)
    console.log(response)
    return response.data
}