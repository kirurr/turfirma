import { Review } from '@/app/lib/definitions'
import React from 'react'
import { Chip } from '@nextui-org/react'

export default function ReviewsWrapper({ reviews }: { reviews: Review[] }) {
  return (
    <ul className="flex flex-col gap-4">
      {reviews &&
        reviews.map((review, index) => (
          <ReviewsItem key={index} review={review} />
        ))}
    </ul>
  )
}

function ReviewsItem({ review }: { review: Review }) {
  return (
    <li key={review.id} className="p-4 shadow rounded-lg flex items-center">
      <h2 className="h2 !mb-0 w-full">Название тура: {review.title} </h2>
      <p className=" text-center w-full">{review.content}</p>
      <div className='w-full text-end'>
      {review.is_positive ? (
        <Chip size='lg' color='success' variant='bordered'>Позитивный</Chip>
      ): (
        <Chip size='lg' color='danger' variant='bordered'>Негативный</Chip>
      )}
      </div>
    </li>
  )
}
