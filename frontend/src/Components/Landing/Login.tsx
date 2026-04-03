import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import google from '../../Assets/google.svg'

const Login = () => {
    const navigate = useNavigate()
    const { signIn } = useAuth()

    // Form state
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState<string | null>(null)
    const [loading, setLoading] = useState(false)

    // Handle form submission
    const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault()
        setError(null)
        setLoading(true)

        try {
            await signIn(email, password)
            navigate('/') 
        } catch (error : any) {
            setError(error.message || 'An error occurred during sign-in')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="w-screen flex flex-col items-center justify-center h-screen px-10">

            <form onSubmit={handleSubmit} className='border border-gray-500 p-6 rounded-lg bg-[#363636] text-center max-w-xl w-full'>

                    {/* Header */}
                    <h1 className="font-bold text-[30px]">Welcome back</h1>
                    <p className="mt-1 text-gray-300">Sign in to your XI11 account</p>

                    {/* Email Form */}
                    <div className="flex flex-col space-y-1 mt-6">
                        <label className="text-left text-sm">Email</label>
                        <input 
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="you@example.com"
                            className="border border-gray-500 rounded-md px-3 py-2 focus:outline-none focus:border-2 focus:border-emerald-500"
                        />
                    </div>

                    {/* Password Form */}
                    <div className="flex flex-col mt-5 space-y-1">
                        <div className="flex flex-row text-sm">
                            <label>Password</label>
                            <label className="ml-auto text-emerald-500 hover:cursor-pointer">Forgot Password?</label>
                        </div>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder='••••••••'
                            className="border border-gray-500 rounded-md px-3 py-2 focus:outline-none focus:border-2  focus:border-emerald-500"
                        />
                    </div>

                    {/* Sign In Button */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="colored-button mt-8 w-full disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? 'Signing in…' : 'Sign In'}
                    </button>

                    {/* Divider */}
                    <div className="mt-6 flex items-center space-x-3">
                        <hr className="flex-1 border-gray-600"/>
                        <span className="text-gray-400 text-sm">or</span>
                        <hr className="flex-1 border-gray-600"/>
                    </div>

                    <button className="w-full button-bg mt-6 flex flex-row justify-center items-center">
                        <img 
                            src={google}
                            alt='google'
                            className="w-5 h-5 mr-3"
                        />
                        Continue with Google
                    </button>

                    {/* Sign up Message */}
                    <div className="mt-6 flex flex-row justify-center space-x-1 text-sm">
                        <span className="text-gray-300">Don't have an acount?</span>
                        <span 
                            className="text-emerald-500 hover:cursor-pointer"
                            onClick={() => navigate('/signup')}
                        >
                            Sign up
                        </span>
                    </div>

            </form>

        </div>
    )
}

export default Login
