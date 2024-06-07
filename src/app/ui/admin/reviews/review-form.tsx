'use client'

import { Review } from '@/app/lib/definitions'
import { Button, Input, Radio, RadioGroup, Textarea } from '@nextui-org/react'
import { FormButton } from '@/app/ui/auth/auth-forms'
import { useFormState } from 'react-dom'
import { updateReview } from '@/app/actions/review-actions'
import Link from 'next/link'

export function AdminReviewForm({ review }: { review: Review }) {
  const updateReviewWithId = updateReview.bind(null, review.id)
  const [state, dispatch] = useFormState(updateReviewWithId, {
    status: false,
    message: '',
    errors: {}
  })
  return (
    <form action={dispatch} className="flex flex-col gap-4 w-full sm:w-1/2 mx-auto">
      <Input
        name="title"
        label="Название"
        isRequired
        placeholder="Название тура, дата"
        defaultValue={review.title}
      />
      <Textarea
        name="content"
        label="Отзыв"
        isRequired
        placeholder="Отзыв о туре"
        defaultValue={review.content}
      />

      <RadioGroup
        label="Характер отзыва"
        isRequired
        defaultValue={review.is_positive ? 'true' : 'false'}
        name="isPositive"
      >
        <Radio value="true">Позитивный</Radio>
        <Radio value="false">Негативный</Radio>
      </RadioGroup>
      <RadioGroup
        label="Статус отзыва"
        isRequired
        defaultValue={review.is_accepted ? 'true' : 'false'}
        name="isAccepted"
      >
        <Radio value="true">Принят</Radio>
        <Radio value="false">На рассмотрении</Radio>
      </RadioGroup>
      <div className="flex items-center justify-center gap-4">
        <FormButton title="Применить" />
        <Button
          variant="bordered"
          color="danger"
          as={Link}
          href="/admin/reviews"
        >
          Отмена
        </Button>
      </div>
      {state && <p>{state.message}</p>}
    </form>
  )
}
