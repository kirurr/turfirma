'use client'
import { sendReview } from '@/app/actions/review-actions'
import { useFormState } from 'react-dom'
import { Textarea, Input, RadioGroup, Radio } from '@nextui-org/react'
import { FormButton } from '@/app/ui/auth/auth-forms'
import { createRef, useEffect } from 'react'

export default function ReviewsForm({ userId }: { userId: string }) {
  const sendReviewWithId = sendReview.bind(null, userId)
  const [state, dispatch] = useFormState(sendReviewWithId, undefined)
  const ref = createRef<HTMLFormElement>()

  useEffect(() => {
    if (state && state.status) ref.current?.reset()
  }, [state, ref])

  return (
    <form
      action={dispatch}
      ref={ref}
      className="flex flex-col gap-4 sm:w-1/2 mx-auto"
    >
      <h2 className="h2 text-center">Оставить отзыв</h2>
      <Input
        name="title"
        label="Название"
        isRequired
        placeholder="Название тура, дата"
      />
      <Textarea
        name="content"
        label="Отзыв"
        isRequired
        placeholder="Отзыв о туре"
      />

      <RadioGroup
        label="Характер отзыва"
        isRequired
        defaultValue="true"
        name="isPositive"
      >
        <Radio value="true">Позитивный</Radio>
        <Radio value="false">Негативный</Radio>
      </RadioGroup>
      <FormButton title="Отправить отзыв" className="w-fit mx-auto" />
      {state && <p className="text-center p text-balance">{state.message}</p>}
    </form>
  )
}
