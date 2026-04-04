import PlayerSearch from './PlayerSearch'
import { useState } from 'react'

type PlayerPoolProps = {
    players: any[]
    setPlayers: React.Dispatch<React.SetStateAction<any[]>>
}

const PlayerPool = ({ players, setPlayers }: PlayerPoolProps) => {
    const [searchTerm, setSearchTerm] = useState<string>('')

    return (
        <div className='md:pl-6'>
            <span className='hidden md:block text-[18px] lg:text-[22px] font-bold text-emerald-500'>Player Pool</span>

            <PlayerSearch 
                searchTerm={searchTerm} 
                setSearchTerm={setSearchTerm} 
            />

            {/* Player list */}
            {players.map((player) => (
                <div key={player.id} className='flex flex-row items-center justify-between mt-4 p-3 rounded-lg bg-[#393939] text-white border-2 border-gray-500'>
                    <div>
                        <div className='text-[16px] font-bold'>{player.name}</div>
                        <div className='text-[12px] text-gray-400'>{player.clubs} - {player.positions}</div>
                    </div>
                    <button className='px-3 py-1 rounded-lg bg-emerald-500 text-white hover:bg-emerald-600'>
                        Add
                    </button>
                </div>
            ))}

        </div>
    )
}

export default PlayerPool
