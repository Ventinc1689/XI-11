import PlayerSearch from './PlayerSearch'
import PlayerList from './PlayerList'
import { useState } from 'react'
import { usePlayers } from '../../hooks/usePlayers'

const PlayerPool = () => {
    const [position, setPosition] = useState('All')
    const [search, setSearch] = useState('')
    const { players, loading, error } = usePlayers(search, position)

    const positions = ['All', 'ST', 'LW', 'RW', 'CM', 'CAM', 'CDM', 'CB', 'LB', 'RB', 'GK']

    return (
        <div className='md:pl-6 flex flex-col flex-1 min-h-0'>
            <div className='shrink-0'>
                <span className='hidden md:block text-[18px] lg:text-[22px] font-bold text-emerald-500'>Player Pool</span>

                {/* Search Bar */}
                <PlayerSearch 
                    searchTerm={search} 
                    setSearchTerm={setSearch} 
                />

                {/* Position Filters */}
                <div className='flex flex-row gap-2 mt-4 overflow-x-auto whitespace-nowrap'>
                    {positions.map((pos) => (
                        <button 
                            key={pos} 
                            onClick={() => setPosition(pos)}
                            className={`px-3 py-1 rounded-xl text-sm hover:cursor-pointer shrink-0 ${position === pos ? 'bg-emerald-500 text-white font-bold' : 'bg-[#393939] text-gray-400 border border-gray-500'}`}
                        >
                            {pos}
                        </button>
                    ))}
                </div>
            </div>

            {/* Player list */}
            <div className='mt-4 flex-1 overflow-y-auto'>
                {/* Loading State */}
                {loading ? 
                    <div className='flex mt-25 items-center justify-center'>
                        <span className='text-gray-400 mt-4'>Loading players...</span>
                    </div>
                : 
                    <PlayerList players={players} />
                }
            </div>

        </div>
    )
}

export default PlayerPool
