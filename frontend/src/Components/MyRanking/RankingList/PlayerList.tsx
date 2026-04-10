import type { PlayerListResponse } from '../../../types/player'

const PlayerList = ({ players, onAdd }: PlayerListResponse) => {

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
        <div className=''>
            {players.map((player, index) => (
                <div
                    key={player.id}
                    className='flex flex-row items-center justify-between mt-4 p-3 rounded-lg bg-[#393939] text-white border-2 border-gray-500 transition-all duration-300 ease-out opacity-0 animate-[fadeSlideIn_0.3s_ease-out_forwards]'
                    style={{ animationDelay: `${index * 50}ms` }}
                >

                    {/* Player Flag */}
                    {player.country_code ? (
                        <img 
                            src={`https://flagcdn.com/w40/${player.country_code}.png`}
                            alt={player.nationality}
                            className="w-7 h-5 rounded object-cover mr-4"
                        />
                    ) : (
                        <div className="w-7 h-5 rounded bg-gray-600 mr-4" />
                    )}

                    {/* Player Info */}
                    <div className='mr-6'>
                        <div className='text-[16px] font-bold'>{player.name}</div>
                        <div className='text-[12px] text-gray-400'>{player.nationality} • {player.clubs.join(', ')}</div>
                    </div>

                    {/* Positions */}
                    <div className='ml-auto mr-4 flex flex-row gap-3'>
                        {player.positions.map((pos) => (
                            <div key={pos} className={`text-[12px] px-2 py-1 rounded-lg bg-[#383737] ${getPositionColor(pos)}`}>
                                {pos}
                            </div>
                        ))}
                    </div>

                    {/* Add button */}
                    <button className='px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 hover:bg-emerald-200/10 border border-emerald-400 text-[18px] font-bold hover:cursor-pointer transition-all duration-200 hover:scale-110 active:scale-95' onClick={() => onAdd(player.id)}>
                        +
                    </button>
                </div>
            ))}
        </div>
    )
}

export default PlayerList
