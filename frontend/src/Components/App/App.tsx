import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Landing from '../Landing/Landing'
import Navbar from './Navbar'
import Login from '../Landing/Login'
import Signup from '../Landing/Signup'
import Settings from '../AccountSettings/Settings'
import RankingPage from '../MyRanking/RankingPage'
import { AuthProvider } from '../../context/AuthContext'
import ProtectedRoute from './ProtectedRoute'

const App = () => {
    return (
        <Router>
            <AuthProvider>
                <Navbar />

                <Routes>
                    <Route path="/" element={<Landing />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
                    <Route path="/ranking" element={<RankingPage /> } />
                </Routes>
            </AuthProvider>
        </Router>
    )
}

export default App
