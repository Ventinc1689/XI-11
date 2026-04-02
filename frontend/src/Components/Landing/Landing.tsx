import React from 'react'
import { useNavigate } from 'react-router-dom'

const Landing = () => {
    const navigate = useNavigate()

    return (
        <div className="pt-40 w-full items-center flex flex-col pb-20 border-b border-gray-500">
            <h1 className="font-bold text-4xl">Build your <span className="text-emerald-500">ultimate</span> XI</h1>

            <div className="text-center mt-4 text-gray-300">
                <h2>Rank the greatest soccer players of all time and see how</h2>
                <h2>your picks compare with the community.</h2>
            </div>  

            <div className="flex flex-row justify-center mt-8 space-x-4">
                <button className="colored-button">Start Ranking</button>
                <button className="colored-button">View Community Picks</button>
            </div>
            
        </div>
    )
}

export default Landing
