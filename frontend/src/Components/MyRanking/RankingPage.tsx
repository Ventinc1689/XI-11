import { useState } from 'react'
import RankingTable from './RankingTable'
import PlayerPool from './PlayerPool'

const RankingPage = () => {
    const [mobileTab, setMobileTab] = useState<'rankings' | 'pool'>('rankings')

    return (
        <div className='flex flex-col h-screen mt-18 p-6'>
            <h1 className='text-[22px] md:text-[28px] font-bold'>Your Top 25</h1>
            <span className='text-[12px] md:text-[16px] text-gray-400 mt-1'>6 of 25 filled</span>

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
                <div className={`lg:flex lg:w-1/2 lg:flex-col lg:border-r lg:border-gray-500 min-h-0 ${mobileTab === 'rankings' ? 'block' : 'hidden'}`}>
                    <RankingTable />
                </div>

                {/* Right panel — same logic */}
                <div className={`lg:flex lg:w-1/2 lg:flex-col min-h-0 ${mobileTab === 'pool' ? 'flex flex-col flex-1' : 'hidden'}`}>
                    <PlayerPool />
                </div>

            </div>
        
        </div>
    )
}

export default RankingPage
