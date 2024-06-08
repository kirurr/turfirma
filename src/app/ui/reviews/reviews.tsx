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
    <li
      key={review.id}
      className="p-4 shadow-xl rounded-lg flex lg:flex-row flex-col items-center gap-10"
    >
      <h2 className="h2 mb-0 lg:w-1/4">{review.title} </h2>
      <p className="lg:w-2/4 p">{review.content}</p>
      <div className="lg:w-1/4 text-end">
        {review.is_positive ? (
          <Chip size="lg" color="success" variant="bordered">
            Позитивный
          </Chip>
        ) : (
          <Chip size="lg" color="danger" variant="bordered">
            Негативный
          </Chip>
        )}
      </div>
    </li>
  )
}
