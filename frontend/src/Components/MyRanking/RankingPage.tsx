import { useState, useEffect } from 'react'
import RankingTable from './RankingTable'
import PlayerPool from './PlayerPool'
import { PlayerService } from '../../services/playerService'

const RankingPage = () => {
    const [mobileTab, setMobileTab] = useState<'rankings' | 'pool'>('rankings')
    const [players, setPlayers] = useState<any[]>([])
    const [error, setError] = useState<string | null>(null)
    const [loading, setLoading] = useState<boolean>(true)

    useEffect(() => {
        const fetchAllPlayers = async () => {
            try {
                setLoading(true)
                const players = await PlayerService.getAllPlayers()
                setPlayers(Array.isArray(players.data) ? players.data : players.data.players ?? [])
            } catch (error: any) {
                setError(error.message)
            } finally {
                setLoading(false)
            }
        }
        fetchAllPlayers()
    }, [])

    return (
        <div className='flex flex-col mt-20 p-6'>
            <h1 className='text-[22px] md:text-[28px] font-bold'>Your Top 25</h1>
            <span className='text-[12px] md:text-[16px] text-gray-400 mt-1'>6 of 25 filled</span>

            {/* Mobile Tabs */}
            <div className='md:hidden flex flex-row mt-6'>

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
            <div className="flex flex-col md:flex-row mt-4">

                {/* Left panel — always visible on desktop, conditionally shown on mobile */}
                <div className={`md:block md:w-1/2 md:border-r md:border-gray-500 ${mobileTab === 'rankings' ? 'block' : 'hidden'}`}>
                    <RankingTable />
                </div>

                {/* Right panel — same logic */}
                <div className={`md:block md:w-1/2 ${mobileTab === 'pool' ? 'block' : 'hidden'}`}>
                    <PlayerPool 
                        players={players}
                        setPlayers={setPlayers}
                    />
                </div>

            </div>
        
        </div>
    )
}

export default RankingPage
