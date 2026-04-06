import type { PlayerListResponse } from '../../types/player'

const PlayerList = ({ players }: PlayerListResponse) => {
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
        <div>
            {players.map((player) => (
                <div key={player.id} className='flex flex-row items-center justify-between mt-4 p-3 rounded-lg bg-[#393939] text-white border-2 border-gray-500'>

                    {/*  */}
                    <div className='rounded-full p-5 bg-[#383939] border-2 border-gray-500 mr-3' >

                    </div>

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
                    <button className='px-3 py-1 rounded-full bg-emerald-500 text-white hover:bg-emerald-600 text-[18px] font-bold hover:cursor-pointer'>
                        +
                    </button>
                </div>
            ))}
        </div>
    )
}

export default PlayerList
