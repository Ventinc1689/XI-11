// Skeleton components for loading states in the ranking page
const RankingSkeletonRow = ({ index }: { index: number }) => (
    <div
        className='flex items-center gap-3 mt-3 bg-[#393939] rounded-lg border border-gray-700 overflow-hidden animate-pulse'
        style={{ animationDelay: `${index * 80}ms`, animationFillMode: 'backwards' }}
    >
        <div className='bg-gray-600 w-10 min-h-13 flex items-center justify-center' />
        <div className='w-7 h-5 rounded bg-gray-600' />
        <div className='flex-1 min-w-0 pr-2 space-y-2 py-2'>
            <div className='h-3.5 w-32 bg-gray-600 rounded' />
            <div className='h-2.5 w-20 bg-gray-700 rounded' />
        </div>
        <div className='flex gap-2 mr-5'>
            <div className='h-5 w-8 bg-gray-600 rounded' />
        </div>
    </div>
)

const PlayerSkeletonRow = ({ index }: { index: number }) => (
    <div
        className='flex flex-row items-center justify-between mt-4 p-3 rounded-lg bg-[#393939] border-2 border-gray-700 animate-pulse'
        style={{ animationDelay: `${index * 80}ms`, animationFillMode: 'backwards' }}
    >
        <div className='w-7 h-5 rounded bg-gray-600 mr-4' />
        <div className='mr-6 space-y-2 flex-1'>
            <div className='h-4 w-28 bg-gray-600 rounded' />
            <div className='h-3 w-36 bg-gray-700 rounded' />
        </div>
        <div className='ml-auto mr-4 flex gap-3'>
            <div className='h-6 w-8 bg-gray-600 rounded-lg' />
        </div>
        <div className='w-8 h-8 rounded-full bg-gray-600' />
    </div>
)

export { RankingSkeletonRow, PlayerSkeletonRow }