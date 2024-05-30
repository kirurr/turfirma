'use client'
import React from 'react'
import { Chip, Button } from '@nextui-org/react'
import { Review } from '@/app/lib/definitions'
import Link from 'next/link'
import { deleteReview } from '@/app/actions/review-actions'

export function AdminReviewsWrapper({ reviews }: { reviews: Review[] }) {
  return (
    <ul>
      {reviews.map((review, index) => (
        <ReviewItem key={index} review={review} />
      ))}
    </ul>
  )
}

function ReviewItem({ review }: { review: Review }) {
  return (
    <li className="p-4 my-4 rounded flex items-center shadow gap-4">
      <p className="font-bold w-full">Название: {review.title}</p>
      <p className="w-full">Содержание: {review.content}</p>
      <div className="flex  gap-2 items-center w-full">
        {review.is_positive ? (
          <Chip size="lg" color="success" variant="bordered">
            Позитивный
          </Chip>
        ) : (
          <Chip size="lg" color="danger" variant="bordered">
            Негативный
          </Chip>
        )}
        {review.is_accepted ? (
          <Chip size="lg" color="success" variant="bordered">
            Принят
          </Chip>
        ) : (
          <Chip size="lg" color="default" variant="bordered">
            Не принят
          </Chip>
        )}
      </div>
      <div className="flex items-center w-full">
        <Button
          className="ml-auto mr-2"
          as={Link}
          href={`reviews/${review.id}`}
          color="primary"
        >
          Изменить
        </Button>
        <Button
          onPress={async () => {
            const shure = confirm(
              `Удалить отзыв? Это действие отменить нельзя.`
            )
            if (shure) {
              await deleteReview(review.id)
            }
          }}
          className="ml-4"
          color="danger"
          variant="bordered"
        >
          Удалить
        </Button>
      </div>
    </li>
  )
}
