import { useAuth } from '../../context/AuthContext'
import { useNavigate } from 'react-router-dom'

const Settings = () => {
    const { user, signOut, loading } = useAuth()
    const navigate = useNavigate()

    const handleSignOut = async () => {
        try {
            await signOut()
            navigate('/')
        } catch {
            console.error('Error signing out')
        }
    }

    return (
        <div className='flex items-center justify-center w-full h-screen'>
            <button className='colored-button' onClick={handleSignOut} disabled={loading}>
                Sign Out
            </button>
        </div>  
    )
}

export default Settings
