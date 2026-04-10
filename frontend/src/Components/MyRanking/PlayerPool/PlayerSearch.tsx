import React from 'react'
import type { PlayerSearchResponse } from '../../../types/player'

const PlayerSearch = ({ searchTerm, setSearchTerm }: PlayerSearchResponse) => {
    return (
        <div className='md:mt-3 relative'>

            {/* Search icon */}
            <svg
                className='absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none'
                fill="none" stroke="currentColor" viewBox="0 0 24 24"
            >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z" />
            </svg>

            {/* Search input */}
            <input 
                type='text'
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder='Search players...'
                className='w-full py-2 pl-9 pr-9 rounded-lg bg-[#393939] text-white border-2 border-gray-500 focus:outline-none focus:border-emerald-500'
            />

            {/* Clear button */}
            {searchTerm && (
                <button
                    onClick={() => setSearchTerm('')}
                    className='absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-emerald-400 transition-colors cursor-pointer'
                >
                    X
                </button>
            )}
        </div>
    )
}

export default PlayerSearch
