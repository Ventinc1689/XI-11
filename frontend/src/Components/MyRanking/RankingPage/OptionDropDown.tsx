import React, { useRef, useEffect } from 'react'
import type { RankingOption } from '../../../types/player'

const OptionDropDown = ({ selectedOption, setSelectedOption, dropdownOpen, setDropdownOpen }: RankingOption) => {
    const dropdownRef = useRef<HTMLDivElement>(null)

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
                setDropdownOpen(false)
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    // Ranking options for the dropdown
    const rankingOptions = ['Top 25', 'Active', 'Forwards', 'Midfielders', 'Defenders', 'Goalkeepers']

    return (
        <div className='flex flex-col flex-1 items-end justify-center gap-1'>
            <label className='hidden md:block text-[12px] md:text-[16px] text-gray-400'>Ranking Option</label>
            <div className='relative' ref={dropdownRef}>
                <button
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className='flex items-center gap-2 px-4 py-2 rounded-lg bg-[#2a2a2a] text-white border border-gray-500 hover:border-emerald-500 transition-colors focus:outline-none focus:border-emerald-500 min-w-40 justify-between cursor-pointer text-[14px] md:text-[16px]'
                >
                    <span>{selectedOption}</span>
                    <svg
                        className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`}
                        fill="none" stroke="currentColor" viewBox="0 0 24 24"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                </button>

                {dropdownOpen && (
                    <ul className='absolute right-0 mt-1 w-full rounded-lg bg-[#2a2a2a] border border-emerald-500 shadow-lg overflow-hidden z-50 animate-in fade-in slide-in-from-top-1 duration-150'>
                        {rankingOptions.map(option => (
                            <li key={option}>
                                <button
                                    onClick={() => {
                                        setSelectedOption(option)
                                        setDropdownOpen(false)
                                    }}
                                    className={`w-full text-left px-4 py-3 text-sm transition-colors hover:bg-emerald-500/20 hover:text-emerald-400 cursor-pointer ${
                                        selectedOption === option
                                            ? 'text-emerald-400 bg-emerald-500/10 font-semibold'
                                            : 'text-white'
                                    }`}
                                >
                                    {option}
                                </button>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    )
}

export default OptionDropDown
