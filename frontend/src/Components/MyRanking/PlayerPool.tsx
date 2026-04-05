import PlayerSearch from './PlayerSearch'
import { useState } from 'react'
import { usePlayers } from '../../hooks/usePlayers'

const PlayerPool = () => {
    const [position, setPosition] = useState('All')
    const [search, setSearch] = useState('')
    const { players, loading, error } = usePlayers(search, position)

    const positions = ['All', 'ST', 'LW', 'RW', 'CM', 'CDM', 'CAM', 'LB', 'RB', 'CB', 'GK']

    return (
        <div className='md:pl-6'>
            <span className='hidden md:block text-[18px] lg:text-[22px] font-bold text-emerald-500'>Player Pool</span>

            <PlayerSearch 
                searchTerm={search} 
                setSearchTerm={setSearch} 
            />

            <div className='flex flex-row gap-2 mt-4 overflow-x-auto whitespace-nowrap'>
                {positions.map((pos) => (
                    <button 
                        key={pos} 
                        onClick={() => setPosition(pos)}
                        className={`px-3 py-1 rounded-lg text-sm hover:cursor-pointer ${position === pos ? 'bg-emerald-500 text-white' : 'bg-[#393939] text-gray-400 border border-gray-500'}`}
                    >
                        {pos}
                    </button>
                ))}
            </div>

            {/* Player list */}
            {players.map((player) => (
                <div key={player.id} className='flex flex-row items-center justify-between mt-4 p-3 rounded-lg bg-[#393939] text-white border-2 border-gray-500'>
                    <div>
                        <div className='text-[16px] font-bold'>{player.name}</div>
                        <div className='text-[12px] text-gray-400'>{player.clubs.join(', ')} - {player.positions.join(', ')}</div>
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
