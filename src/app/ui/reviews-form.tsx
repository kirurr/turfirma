'use client'
import { sendReview } from '@/app/actions/review-actions'
import { useFormState } from 'react-dom'

export default function ReviewsForm({ userId }: { userId: string }) {
  const sendReviewWithId = sendReview.bind(null, userId)
  const [state, dispatch] = useFormState(sendReviewWithId, undefined)
  return (
    <form action={dispatch}>
      <h2>оставить отзыв</h2>
      <div>
        <label htmlFor="title">название тура</label>
        <input id="title" name="title" type="text" required />
      </div>
      <div>
        <label htmlFor="content">отзыв</label>
        <textarea name="content" id="content" required></textarea>
      </div>

      <div>
        <label htmlFor="positive">позитивный</label>
        <input
          type="radio"
          id="positive"
          name="isPositive"
          value="true"
          required
        />
      </div>
      <div>
        <label htmlFor="negative">негативный</label>
        <input type="radio" id="negative" name="isPositive" value="false" />
      </div>
      <button type="submit">отправить отзыв</button>
      {state && <p>{state.message}</p>}
    </form>
  )
}
