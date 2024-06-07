'use client'
import React, { useState } from 'react'
import { Chip, Button, Spinner } from '@nextui-org/react'
import { Review, User } from '@/app/lib/definitions'
import Link from 'next/link'
import { deleteReview } from '@/app/actions/review-actions'

export function AdminReviewsWrapper({
  reviews,
  users
}: {
  reviews: Review[]
  users: User[]
}) {
  return (
    <ul>
      {reviews.map((review, index) => (
        <ReviewItem key={index} review={review} users={users} />
      ))}
    </ul>
  )
}

function ReviewItem({ review, users }: { review: Review; users: User[] }) {
  const [isLoading, setIsLoading] = useState(false)

  const [prevState, setPrevState] = useState(review)

  if (review.id !== prevState.id) {
    setIsLoading(false)
    setPrevState(review)
  }

  const user = users.find((user) => user.id === review.user_id)
  return (
    <li className="relative p-2 sm:p-4 my-4 rounded flex sm:flex-nowrap flex-wrap items-center shadow sm:gap-4">
      {isLoading && (
        <Spinner
          size="lg"
          className="size-full absolute top-0 left-0 z-10 backdrop-blur-sm"
        />
      )}
      <div className="w-1/2 sm:w-full text-balance">
        <h2 className="text-xl mb-4 font-semibold">{review.title}</h2>
        <p className="text-xl font-semibold">{user?.name}</p>
      </div>
      <p className="hidden sm:block w-full text-xl">{review.content}</p>
      <div className="w-1/2 flex flex-col sm:flex-row gap-2 items-center sm:w-full">
        {review.is_positive ? (
          <Chip
            size="lg"
            color="success"
            variant="bordered"
            className="sm:ml-auto"
          >
            Позитивный
          </Chip>
        ) : (
          <Chip size="lg" color="danger" variant="bordered" className="sm:ml-auto">
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
      <div className="flex mt-4 sm:mt-0 gap-2 items-center sm:justify-normal justify-center w-full">
        <Button
          className="sm:ml-auto sm:mr-2"
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
              setIsLoading(true)
              await deleteReview(review.id)
            }
          }}
          className="sm:ml-4"
          color="danger"
          variant="bordered"
        >
          Удалить
        </Button>
      </div>
    </li>
  )
}
