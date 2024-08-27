import { useRef, useState, useEffect } from "react"
import { useNavigate, useLocation, Link } from "react-router-dom"
import { useAuth } from "../hooks/useAuth";
import { login } from "../services/authService"

const LoginForm = () => {
  const { setAuth } = useAuth()

  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state?.from?.pathname || '/'

  const emailRef = useRef()
  const errorRef = useRef()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    emailRef.current.focus()
  }, [])

  useEffect(() => {
    setErrorMessage('')
  }, [email, password])

  const handleLogin = async (e) => {
    e.preventDefault()
    const formData = { email, password }
    try {
      const response = await login(formData)
      const user = response?.user
      setAuth({ user })
      setEmail('')
      setPassword('')
      navigate(from, { replace: true })
    } catch (error) {
      if (!error?.response) {
        setErrorMessage('No Server Response')
      } else if (error.response?.status === 400) {
        setErrorMessage('Missing Email or Password')
      } else if (error.response?.status === 401) {
        setErrorMessage('Unauthorized')
      } else {
        setErrorMessage('Login failed')
      }
      errorRef.current.focus()
    }
  }

  return (
    <div className='flex items-center justify-center min-h-[calc(100vh-160px)] bg-gray-100'>
      <div className='w-full max-w-md p-8 space-y-6 bg-white rounded shadow-md'>
        <h2 className='text-2xl font-bold text-center'>Login</h2>

        <p
          ref={errorRef}
          className={
            errorMessage
              ? 'text-red-600 bg-red-100 p-2 rounded mb-4'
              : 'sr-only'
          }
        >
          {errorMessage}
        </p>

        <form
          className='space-y-4'
          method='POST'
          onSubmit={handleLogin}
        >
          <div>
            <label
              htmlFor='email'
              className='block text-sm font-medium text-gray-700'
            >
              Email
            </label>
            <input
              type='email'
              id='email'
              name='email'
              className='w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring focus:ring-indigo-200 focus:border-indigo-300'
              value={email}
              ref={emailRef}
              autoComplete='off'
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label
              htmlFor='password'
              className='block text-sm font-medium text-gray-700'
            >
              Password
            </label>
            <input
              type='password'
              id='password'
              name='password'
              className='w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring focus:ring-indigo-200 focus:border-indigo-300'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type='submit'
            className='w-full px-4 py-2 text-white bg-indigo-500 rounded-md hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
          >
            Sign In
          </button>
        </form>
        <p className='text-sm text-gray-600'>
          Need an Account?
          <br />
          <span className='inline-block mt-2'>
            <Link
              to='/register'
              className='text-indigo-600 hover:text-indigo-800 font-medium'>
              Sign Up
            </Link>
          </span>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;