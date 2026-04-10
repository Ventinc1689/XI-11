import { useState, useEffect } from 'react'
import RankingTable from '../RankingList/RankingTable'
import PlayerPool from '../PlayerPool/PlayerPool'
import OptionDropDown from './OptionDropDown'
import { useRanking } from '../../../hooks/useRanking'

const RankingPage = () => {
    const [mobileTab, setMobileTab] = useState<'rankings' | 'pool'>('rankings')
    const [selectedOption, setSelectedOption] = useState('Top 25')
    const [dropdownOpen, setDropdownOpen] = useState(false)

    // ranking hook
    const {
        entries, listId, maxEntries, loading, error,
        addPlayer, removePlayer, reorderPlayers
    } = useRanking(selectedOption)

    return (
        <div className='flex flex-col h-screen pt-24 p-6 '>

            {/* Header with title and ranking options */}
            <div className='flex flex-row w-full'>
                <div className='flex flex-col flex-1'>
                    <h1 className='text-[22px] md:text-[28px] font-bold'>Your {`${selectedOption === 'Top 25' ? 'Top 25' : `Top ${selectedOption}`}`}</h1>
                    <span className='text-[12px] md:text-[16px] text-gray-400'>{entries.length} of {maxEntries} filled</span>
                </div>

                {/* Dropdown for ranking options */}
                <OptionDropDown 
                    selectedOption={selectedOption}
                    setSelectedOption={setSelectedOption}
                    dropdownOpen={dropdownOpen}
                    setDropdownOpen={setDropdownOpen}
                />
            </div>

            {/* Mobile Tabs */}
            <div className='lg:hidden flex flex-row mt-6'>

                {/* Rankings Tab */}
                <button className={`w-1/2 pb-2 hover:cursor-pointer ${mobileTab === 'rankings' ? 'border-b-3 border-emerald-500 text-emerald-500 font-bold' : 'border-b border-gray-500 text-white'}`} onClick={() => setMobileTab('rankings')}>
                    Rankings
                </button>

                {/* Player Pool Tab */} 
                <button className={`w-1/2 pb-2 hover:cursor-pointer ${mobileTab === 'pool' ? 'border-b-3 border-emerald-500 text-emerald-500 font-bold' : 'border-b border-gray-500 text-white'}`} onClick={() => setMobileTab('pool')}>
                    Player Pool
                </button>

            </div>

            { /* Content - stacked on mobile, side-by-side on larger screens */ }
            <div className="flex flex-col lg:flex-row mt-4 flex-1 min-h-0">

                {/* Left panel — always visible on desktop, conditionally shown on mobile */}
                <div className={`lg:flex lg:w-1/2 lg:flex-col lg:border-r lg:border-gray-500 min-h-0 ${mobileTab === 'rankings' ? 'flex flex-col flex-1' : 'hidden'}`}>
                    <RankingTable
                        entries={entries}
                        maxEntries={maxEntries}
                        loading={loading}
                        error={error}
                        onRemove={removePlayer}
                        onReorder={reorderPlayers}
                    />
                </div>

                {/* Right panel — same logic */}
                <div className={`lg:flex lg:w-1/2 lg:flex-col min-h-0 ${mobileTab === 'pool' ? 'flex flex-col flex-1' : 'hidden'}`}>
                    <PlayerPool 
                        onAdd={addPlayer}
                        currentCount={entries.length}
                        maxEntries={maxEntries}
                        changeTab={setMobileTab} 
                    />
                </div>

            </div>
        
        </div>
    )
}

export default RankingPage
