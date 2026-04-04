import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

const Navbar = () => {
    const navigate = useNavigate()
    const { user, loading } = useAuth()
    
    const navOptions = [
        { name: 'Rankings', path: '/ranking'},
        { name: 'Community', path: '/'},
        { name: 'My XI', path: '/'},
        { name: 'Contact', path: '/'}
    ]

    return (
        <nav className="w-screen fixed left-0 top-0 z-100 border-b-3 border-gray-500 bg-[#2B2B2B]">
            <div className="flex flex-row items-center px-6 py-4">

                {/* App Name */}
                <h1 className="text-2xl font-bold flex hover:cursor-pointer" onClick={() => navigate("/")}>XI<span className="ml-0.5 text-emerald-500">11</span></h1>

                {/* Navigation Links */}
                <ul className="flex flex-row items-center ml-auto space-x-6 lg:space-x-10 text-gray-400 font-semibold">
                    {navOptions.map((option) => (
                        <li key={option.name} onClick={() => navigate(option.path)} className='hover:cursor-pointer hidden md:block'>
                            {option.name}
                        </li>
                    ))}

                    {!loading && (
                        user ? (
                            <div className='hover:cursor-pointer flex flex-row items-center space-x-2 md:border-l-2 border-gray-500 pl-6' onClick={() => navigate('/settings')}>
                                <span className='text-emerald-500'>{user.user_metadata.username}</span>
                                <img 
                                    src={user.user_metadata.avatar_url || 'https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y'}
                                    alt="User Avatar"
                                    className="w-10 h-10 rounded-full"
                                />
                            </div>
                        )

                        : (
                            <li onClick={() => navigate('/login')} className="hover:cursor-pointer colored-button">
                                Login
                            </li>
                        )
                    )}

                </ul>

            </div>
        </nav>
    )
}

export default Navbar
