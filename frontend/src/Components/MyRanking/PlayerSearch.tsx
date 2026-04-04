import React from 'react'

type PlayerSearchProps = {
    searchTerm: string
    setSearchTerm: React.Dispatch<React.SetStateAction<string>>
}

const PlayerSearch = ({ searchTerm, setSearchTerm }: PlayerSearchProps) => {
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
