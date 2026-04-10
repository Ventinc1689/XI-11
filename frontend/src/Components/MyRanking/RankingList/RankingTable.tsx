import type { RankingTableProps } from '../../../types/player'
import { RankingSkeletonRow } from '../RankingPage/SkeletonRow'

const RankingTable = ({ entries, maxEntries, loading, error, onRemove, onReorder }: RankingTableProps) => {

    // Helper function to determine badge color based on position
    const getPositionColor = (pos: string) => {
        const forwards = ['ST', 'LW', 'RW']
        const midfielders = ['CM', 'CAM', 'CDM']
        const defenders = ['CB', 'LB', 'RB']
        const goalkeeper = ['GK']

        if (forwards.includes(pos)) return 'text-red-400 border border-red-400'
        if (midfielders.includes(pos)) return 'text-amber-400 border border-amber-400'
        if (defenders.includes(pos)) return 'text-blue-400 border border-blue-400'
        if (goalkeeper.includes(pos)) return 'text-violet-400 border border-violet-400'
        return 'text-gray-400 border border-gray-400'
    }

    return (
        <div className='lg:pr-6 flex flex-col flex-1 min-h-0'>
            {loading ? (
                <div className='flex-1 overflow-y-auto min-h-0'>
                    {Array.from({ length: Math.min(maxEntries, 8) }, (_, i) => (
                        <RankingSkeletonRow key={i} index={i} />
                    ))}
                </div>
            ) : error ? (
                <div className='text-red-400 text-sm mt-4'>{error}</div>
            ) : (
                <div className='flex-1 overflow-y-auto min-h-0'>
                    {/* Filled slots */}
                    {entries.map((entry, index) => (
                        <div
                            key={entry.id}
                            className='flex items-center gap-3 mt-3 bg-[#393939] rounded-lg border border-gray-500 transition-all duration-300 ease-out opacity-0 animate-[fadeSlideIn_0.3s_ease-out_forwards]'
                            style={{ animationDelay: `${index * 50}ms` }}
                        >
                            {/* Rank number */}
                            <div className='bg-emerald-500 w-10 min-h-13 flex items-center justify-center text-white font-bold'>
                                {entry.rank}
                            </div>
                            
                            {/* Flag */}
                            {entry.player.country_code ? (
                                <img
                                    src={`https://flagcdn.com/w40/${entry.player.country_code}.png`}
                                    alt={entry.player.nationality}
                                    className='w-7 h-5 rounded object-cover'
                                />
                            ) : (
                                <div className='w-7 h-5 rounded bg-gray-600' />
                            )}

                            {/* Player info */}
                            <div className='flex-1 min-w-0 pr-2'>
                                <div className='text-sm font-bold text-white truncate'>{entry.player.name}</div>
                                <div className='text-xs text-gray-400 truncate'>{entry.player.clubs.join(', ')}</div>
                            </div>

                            {/* Position badges */}
                            <div className='flex gap-2 mr-2'>
                                {entry.player.positions.map((pos) => (
                                    <span key={pos} className={`text-[10px] px-2 py-1 rounded ${getPositionColor(pos)}`}>
                                        {pos}
                                    </span>
                                ))}
                            </div>

                            {/* Remove button */}
                            <button
                                onClick={() => onRemove(entry.id)}
                                className='mr-3 text-gray-500 hover:text-emerald-400 cursor-pointer text-sm transition-colors duration-200'
                            >
                                x
                            </button>
                        </div>
                    ))}

                    {/* Empty slots */}
                    {Array.from({ length: maxEntries - entries.length }, (_, i) => (
                        <div
                            key={`empty-${i}`}
                            className='flex items-center gap-3 mt-3 border border-dashed border-gray-600 rounded-lg overflow-hidden transition-all duration-300 ease-out opacity-0 animate-[fadeSlideIn_0.3s_ease-out_forwards]'
                            style={{ animationDelay: `${(entries.length + i) * 50}ms` }}
                        >
                            <div className='w-10 min-h-13 flex items-center justify-center text-gray-600 font-bold'>
                                {entries.length + i + 1}
                            </div>
                            <span className='text-gray-600 text-sm'>Empty slot</span>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default RankingTable
