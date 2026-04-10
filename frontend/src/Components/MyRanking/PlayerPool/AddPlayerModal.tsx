import { useState } from 'react'
import type { Player, AddPlayerModalProps } from '../../../types/player'

const AddPlayerModal = ({ player, maxRank, loading, onConfirm, onClose }: AddPlayerModalProps) => {
    const [rank, setRank] = useState(maxRank)

    const handleConfirm = () => {
        if (rank < 1 || rank > maxRank) return
        onConfirm(rank)
    }

    return (
        <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-[fadeIn_0.2s_ease-out]' onClick={onClose}>
            <div
                className='bg-[#2a2a2a] border border-gray-600 rounded-2xl p-6 w-[90%] max-w-md shadow-2xl animate-[scaleIn_0.25s_ease-out]'
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className='flex items-center justify-between mb-5'>
                    <h2 className='text-lg font-bold text-white'>Add Player</h2>
                    <button
                        onClick={onClose}
                        className='text-gray-400 hover:text-emerald-400 transition-colors cursor-pointer'
                    >
                        X
                    </button>
                </div>

                {/* Player info */}
                <div className='flex items-center gap-3 p-3 rounded-lg bg-[#393939] border border-gray-600 mb-5'>
                    {player.country_code ? (
                        <img
                            src={`https://flagcdn.com/w40/${player.country_code}.png`}
                            alt={player.nationality}
                            className='w-7 h-5 rounded object-cover'
                        />
                    ) : (
                        <div className='w-7 h-5 rounded bg-gray-600' />
                    )}
                    <div>
                        <div className='text-white font-bold'>{player.name}</div>
                        <div className='text-xs text-gray-400'>
                            {player.nationality} • {player.clubs.join(', ')}
                        </div>
                    </div>
                </div>

                {/* Rank selection */}
                <label className='block text-sm text-gray-400 mb-2'>
                    Select rank <span className='text-gray-400'>(1 – {maxRank})</span>
                </label>

                <div className='flex items-center gap-3 mb-6'>
                    {/* Decrement */}
                    <button
                        onClick={() => setRank((r) => Math.max(1, r - 1))}
                        disabled={rank <= 1 || loading}
                        className='w-10 h-10 rounded-lg bg-[#393939] border-2 border-gray-500 text-white hover:text-emerald-400 text-lg font-bold hover:border-emerald-400 transition-colors disabled:opacity-30 disabled:hover:border-gray-600 cursor-pointer disabled:cursor-not-allowed'
                    >
                        −
                    </button>

                    {/* Input */}
                    <input
                        type='number'
                        min={1}
                        max={maxRank}
                        value={rank}
                        disabled={loading}
                        onChange={(e) => {
                            const val = parseInt(e.target.value)
                            if (!isNaN(val)) setRank(Math.min(maxRank, Math.max(1, val)))
                        }}
                        className='flex-1 text-center text-2xl font-bold text-white bg-[#393939] border-2 border-gray-600 rounded-lg py-2 focus:outline-none focus:border-emerald-500 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none disabled:opacity-50'
                    />

                    {/* Increment */}
                    <button
                        onClick={() => setRank((r) => Math.min(maxRank, r + 1))}
                        disabled={rank >= maxRank || loading}
                        className='w-10 h-10 rounded-lg bg-[#393939] border-2 border-gray-500 text-white hover:text-emerald-400 text-lg font-bold hover:border-emerald-400 transition-colors disabled:opacity-30 disabled:hover:border-gray-600 cursor-pointer disabled:cursor-not-allowed'
                    >
                        +
                    </button>
                </div>

                {/* Actions */}
                <div className='flex gap-3'>
                    <button
                        onClick={onClose}
                        disabled={loading}
                        className='flex-1 button-bg text-white cursor-pointer font-medium disabled:opacity-50 disabled:cursor-not-allowed'
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleConfirm}
                        disabled={loading}
                        className='flex-1 colored-button text-white font-bold cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2'
                    >
                        {loading ? (
                            <>
                                <svg className='w-4 h-4 animate-spin' viewBox='0 0 24 24' fill='none'>
                                    <circle cx='12' cy='12' r='10' stroke='currentColor' strokeWidth='3' className='opacity-25' />
                                    <path d='M4 12a8 8 0 018-8' stroke='currentColor' strokeWidth='3' strokeLinecap='round' className='opacity-75' />
                                </svg>
                                Adding...
                            </>
                        ) : (
                            `Add to #${rank}`
                        )}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default AddPlayerModal