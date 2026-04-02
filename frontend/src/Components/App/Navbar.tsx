import React from 'react'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {
    const navigate = useNavigate()
    
    const navOptions = [
        { name: 'Home', path: '/' },
        { name: 'Rankings', path: '/'},
        { name: 'Community', path: '/'},
        { name: 'My XI', path: '/'},
        { name: 'Contact', path: '/'},
        { name: 'Login', path: '/login'}
    ]

    return (
        <nav className="w-screen fixed left-0 top-0 z-100 border-b border-gray-500 bg-[#2B2B2B]">
            <div className="flex flex-row items-center px-6 py-4">

                {/* App Name */}
                <h1 className="text-2xl font-bold flex">XI<span className="ml-0.5 text-emerald-500">11</span></h1>

                {/* Navigation Links */}
                <ul className="flex flex-row items-center ml-auto space-x-8 text-gray-400 font-semibold">
                    {navOptions.map((option) => (
                        <li key={option.name} onClick={() => navigate(option.path)} className={`hover:cursor-pointer hidden md:block ${option.path === '/login' ? 'colored-button' : ''}`}>
                            {option.name}
                        </li>
                    ))}

                </ul>

            </div>
        </nav>
    )
}

export default Navbar
