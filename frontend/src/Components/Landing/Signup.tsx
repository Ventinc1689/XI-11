import React from 'react'
import { useNavigate } from 'react-router-dom'
import google from '../../Assets/google.svg'

const Signup = () => {
    const navigate = useNavigate()

    return (
        <div className="w-screen flex flex-col items-center mt-30 px-10">

            <div className="border border-gray-500 p-6 rounded-lg bg-[#363636] text-center max-w-xl w-full">

                {/* Header */}
                <h1 className="font-bold text-[30px]">Create an account</h1>
                <p className="mt-1 text-gray-300">Start your journey with XI11</p>

                {/* Name Form */}
                <div className="flex flex-row mt-6 gap-4">
                    <div className="flex flex-col space-y-1 flex-1 min-w-0">
                        <label className="text-left text-sm">First Name (Optional)</label>
                        <input 
                            type='text'
                            placeholder='Cristiano'
                            className="border border-gray-500 rounded-md px-3 py-2 focus:outline-none focus:border-2 focus:border-emerald-500"
                        />
                    </div>

                    <div className="flex flex-col space-y-1 flex-1 min-w-0">
                        <label className="text-left text-sm">Last Name (Optional)</label>
                        <input 
                            type='text'
                            placeholder='Ronaldo'
                            className="border border-gray-500 rounded-md px-3 py-2 focus:outline-none focus:border-2 focus:border-emerald-500"
                        />
                    </div>
                </div>

                {/* Username Form */}
                <div className="flex flex-col space-y-1 mt-6">
                    <label className="text-left text-sm">Username</label>
                    <input 
                        type="text"
                        placeholder="cristiano_ronaldo1689"
                        className="border border-gray-500 rounded-md px-3 py-2 focus:outline-none focus:border-2 focus:border-emerald-500"
                    />
                </div>

                {/* Email Form */}
                <div className="flex flex-col space-y-1 mt-6">
                    <label className="text-left text-sm">Email</label>
                    <input 
                        type="email"
                        placeholder="you@example.com"
                        className="border border-gray-500 rounded-md px-3 py-2 focus:outline-none focus:border-2 focus:border-emerald-500"
                    />
                </div>

                {/* Password Form */}
                <div className="flex flex-col mt-5 space-y-1">
                    <label className="text-left text-sm">Password</label>
                    <input
                        type="password"
                        placeholder='••••••••'
                        className="border border-gray-500 rounded-md px-3 py-2 focus:outline-none focus:border-2  focus:border-emerald-500"
                    />
                    <label className="text-left text-[11px] text-gray-400">At least 7 characters</label>
                </div>

                {/* Sign In Button */}
                <button className="colored-button mt-8 w-full ">
                    Create Account
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

            </div>

        </div>
    )
}

export default Signup
