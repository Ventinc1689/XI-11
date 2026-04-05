import React from 'react'
import type { PlayerSearchResponse } from '../../types/player'

const PlayerSearch = ({ searchTerm, setSearchTerm }: PlayerSearchResponse) => {
    return (
        <div className='md:mt-3'>
            <input 
                type='text'
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder='Search players...'
                className='w-full p-2 rounded-lg bg-[#393939] text-white border-2 border-gray-500 focus:outline-none focus:border-emerald-500'
            />
        </div>
    )
}

export default PlayerSearch
