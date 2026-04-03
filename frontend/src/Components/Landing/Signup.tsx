import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import google from '../../Assets/google.svg'

const Signup = () => {
    const navigate = useNavigate()
    const { signUp } = useAuth()

    // Form state
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [loading, setLoading] = useState(false)

    // Handle form submission
    const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault()
        setError(null)
        setLoading(true)

        try {
            // Basic client-side validation
            const { needsConfirmation } = await signUp(email, password, {
                first_name: firstName || undefined,
                last_name: lastName || undefined,
                username,
            })

            // If sign-up is successful but requires email confirmation, show message
            if (needsConfirmation) {
                setConfirmPassword(true)
            } else {
                navigate('/') // Redirect to home or dashboard after successful sign-up
            }
        } catch (error: any) {
            setError(error.message || 'An error occurred during sign-up')
        } finally {
            setLoading(false)
        }
    }

    if (confirmPassword) {
        return (
            <div className="w-screen flex flex-col items-center mt-40 px-10">
                <div className="border border-gray-500 p-6 rounded-lg bg-[#363636] text-center max-w-xl w-full">
                    <h1 className="font-bold text-[30px]">Check your email</h1>
                    <p className="mt-3 text-gray-300">
                        We sent a confirmation link to <span className="text-emerald-500">{email}</span>.
                        <br />Click it to activate your account.
                    </p>
                    <button
                        className="colored-button mt-8"
                        onClick={() => navigate('/login')}
                    >
                        Go to Sign In
                    </button>
                </div>
            </div>
        )
    }

    return (
        <div className="w-screen flex flex-col items-center mt-30 mb-10 px-10">
            <form
                onSubmit={handleSubmit}
                className="border border-gray-500 p-6 rounded-lg bg-[#363636] text-center max-w-xl w-full"
            >
                    {/* Header */}
                    <h1 className="font-bold text-[30px]">Create an account</h1>
                    <p className="mt-1 text-gray-300">Start your journey with XI11</p>

                    {/* Error banner */}
                    {error && (
                        <div className="mt-4 rounded-md bg-red-500/10 border border-red-500/40 text-red-400 text-sm px-4 py-3">
                            {error}
                        </div>
                    )}

                    {/* Name Form */}
                    <div className="flex flex-row mt-6 gap-4">
                        <div className="flex flex-col space-y-1 flex-1 min-w-0">
                            <label className="text-left text-sm">First Name (Optional)</label>
                            <input 
                                type='text'
                                placeholder='Cristiano'
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                className="border border-gray-500 rounded-md px-3 py-2 focus:outline-none focus:border-2 focus:border-emerald-500"
                            />
                        </div>

                        <div className="flex flex-col space-y-1 flex-1 min-w-0">
                            <label className="text-left text-sm">Last Name (Optional)</label>
                            <input 
                                type='text'
                                placeholder='Ronaldo'
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                className="border border-gray-500 rounded-md px-3 py-2 focus:outline-none focus:border-2 focus:border-emerald-500"
                            />
                        </div>
                    </div>

                    {/* Username Form */}
                    <div className="flex flex-col space-y-1 mt-6">
                        <label className="text-left text-sm">Username</label>
                        <input 
                            type="text"
                            required
                            placeholder="cristiano_ronaldo1689"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="border border-gray-500 rounded-md px-3 py-2 focus:outline-none focus:border-2 focus:border-emerald-500"
                        />
                    </div>

                    {/* Email Form */}
                    <div className="flex flex-col space-y-1 mt-6">
                        <label className="text-left text-sm">Email</label>
                        <input 
                            type="email"
                            required
                            placeholder="you@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="border border-gray-500 rounded-md px-3 py-2 focus:outline-none focus:border-2 focus:border-emerald-500"
                        />
                    </div>

                    {/* Password Form */}
                    <div className="flex flex-col mt-5 space-y-1">
                        <label className="text-left text-sm">Password</label>
                        <input
                            type="password"
                            required
                            placeholder='••••••••'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="border border-gray-500 rounded-md px-3 py-2 focus:outline-none focus:border-2  focus:border-emerald-500"
                        />
                        <label className="text-left text-[11px] text-gray-400">At least 7 characters</label>
                    </div>

                    {/* Sign In Button */}
                    <button 
                        type="submit"
                        disabled={loading}
                        className="colored-button mt-8 w-full disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? 'Creating Account...' : 'Create Account'}
                    </button>

                    {/* Divider */}
                    <div className="mt-6 flex items-center space-x-3">
                        <hr className="flex-1 border-gray-600"/>
                        <span className="text-gray-400 text-sm">or</span>
                        <hr className="flex-1 border-gray-600"/>
                    </div>

                    {/* Google Button */}
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
                        <span className="text-gray-300">Already have an acount?</span>
                        <span 
                            className="text-emerald-500 hover:cursor-pointer"
                            onClick={() => navigate('/login')}
                        >
                            Sign in
                        </span>
                    </div>
            </form>
        </div>
    )
}

export default Signup
