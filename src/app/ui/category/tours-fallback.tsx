import { Skeleton } from '@nextui-org/react'

export default function ToursFallback() {
  return (
    <ul>
      {[...Array(10)].map((_, index) => (
        <FallbackItem key={index} />
      ))}
    </ul>
  )
}

function FallbackItem() {
  return (
    <li className="flex flex-1 flex-wrap items-center shadow-lg rounded-lg overflow-hidden mb-8">
      <Skeleton className="w-full lg:w-1/4 min-h-[17rem]" />
      <div className="flex items-center p-4 lg:w-2/4 h-full">
        <div className="h-full flex flex-col gap-4">
          <Skeleton className="w-[10rem] h-9 rounded-xl" />
          <Skeleton className="w-[6rem] h-7 rounded-xl" />
          <div>
            <Skeleton className="w-[23rem] h-20 rounded-xl" />
          </div>
          <div>
            <Skeleton className="w-[10rem] h-7 mb-2 rounded-xl" />
            <Skeleton className="w-[17rem] h-7 mb-2 rounded-xl" />
          </div>
        </div>
      </div>
      <div className="lg:w-1/4 w-full p-4 h-full flex flex-col gap-4">
      <Skeleton className="w-[10rem] h-7 rounded-xl" />
      <Skeleton className="w-[6rem] h-7 rounded-xl" />
      <Skeleton className="w-full mt-8 h-12 rounded-xl" />
      </div>
    </li>
  )
}
