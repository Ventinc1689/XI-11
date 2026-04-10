import PlayerSearch from './PlayerSearch'
import PlayerList from '../RankingList/PlayerList'
import AddPlayerModal from './AddPlayerModal'
import { PlayerSkeletonRow } from '../RankingPage/SkeletonRow'
import { useState } from 'react'
import { usePlayers } from '../../../hooks/usePlayers'
import type { PlayerPoolProps, Player } from '../../../types/player'

const PlayerPool = ({ onAdd, currentCount, maxEntries, changeTab }: PlayerPoolProps) => {
    const [position, setPosition] = useState('All')
    const [search, setSearch] = useState('')
    const { players, loading, error } = usePlayers(search, position)
    const [modalPlayer, setModalPlayer] = useState<Player | null>(null)

    const positions = ['All', 'ST', 'LW', 'RW', 'CM', 'CAM', 'CDM', 'CB', 'LB', 'RB', 'GK']

    const handleAddPlayer = (playerId: string) => {
        if (currentCount >= maxEntries) {
            alert('Ranking list is full!')
            return
        }

        const player = players.find((p) => p.id === playerId)
        if (player) setModalPlayer(player)
    }

    const handleConfirmAdd = async (rank: number) => {
        if (!modalPlayer) return
        const playerToAdd = modalPlayer
        setModalPlayer(null)
        changeTab('rankings')

        try {
            await onAdd(playerToAdd.id, rank, playerToAdd)
        } catch (err: any) {
            alert(err.message)
        }
    }

    return (
        <div className='lg:pl-6 flex flex-col flex-1 min-h-0'>
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
                            className={`px-3 py-1 rounded-xl text-sm hover:cursor-pointer shrink-0 transition-all duration-200 ${position === pos ? 'bg-emerald-500 text-white font-bold' : 'bg-[#393939] text-gray-400 border border-gray-500 hover:border-emerald-500/50'}`}
                        >
                            {pos}
                        </button>
                    ))}
                </div>
            </div>

            {/* Player list */}
            <div className='mt-4 flex-1 overflow-y-auto'>
                {loading ? (
                    <div>
                        {Array.from({ length: 6 }, (_, i) => (
                            <PlayerSkeletonRow key={i} index={i} />
                        ))}
                    </div>
                ) : (
                    <PlayerList players={players} onAdd={handleAddPlayer} />
                )}
            </div>

            {/* Add Player Modal */}
            {modalPlayer && (
                <AddPlayerModal
                    player={modalPlayer}
                    maxRank={currentCount + 1}
                    loading={false}
                    onConfirm={handleConfirmAdd}
                    onClose={() => setModalPlayer(null)}
                />
            )}
        </div>
    )
}

export default PlayerPool
