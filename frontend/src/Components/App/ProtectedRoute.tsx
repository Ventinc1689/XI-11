import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    const { user, loading } = useAuth();
    const navigate = useNavigate();

    // Still checking for an existing session — don't redirect yet
    if (loading) {
        return (
            <div className="w-screen h-screen flex items-center justify-center">
                <span className="text-gray-400 text-sm">Loading...</span>
            </div>
        )
    }

    // No user found — redirect to login
    if (!user) {
        return (
            <div className="w-screen h-screen flex items-center justify-center p-10 ">
                <div className="flex flex-col text-center m-10 py-20 px-10 md:p-20 border-2 border-emerald-500 rounded-lg bg-[#262626]">
                    <span className="text-white font-semibold text-[20px]">Sorry, you must be logged in to access this page.</span>
                    <button className="colored-button mt-6" onClick={() => navigate('/login')}>Go to Login</button>
                </div>
            </div>
        )
    }
        
    return children
}

export default ProtectedRoute