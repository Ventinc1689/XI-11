import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

const Landing = () => {
    const navigate = useNavigate()
    const { user } = useAuth()

    return (
        <div className="pt-40 w-full items-center flex flex-col">

            {/* Main Heading */}
            <h1 className="font-bold text-4xl">Build your <span className="text-emerald-500">ultimate</span> XI</h1>

            <div className="text-center mt-4 text-gray-300">
                <h2>Create your own all time rankings, build your</h2>
                <h2>personal XI, and see how your picks compare with the community.</h2>
            </div>  

            <div className="flex flex-row justify-center mt-8 space-x-4 pb-20 border-b border-gray-500 w-full">
                <button className="colored-button" onClick={() => navigate('/ranking')}>Start Ranking</button>
                <button className="button-bg">View Community Picks</button>
            </div>

        </div>
    )
}

export default Landing
