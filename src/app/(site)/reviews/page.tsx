import { fetchReviews } from '@/app/data/reviews-data'
import { auth } from '@/auth'
import ReviewsForm from '@/app/ui/reviews-form'

export default async function Page() {
  const reviews = await fetchReviews()
  const session = await auth()
  return (
    <>
      <h1>отзывы</h1>
      <ul>
        {reviews &&
          reviews.map((review) => (
            <li key={review.id}>
              <h2> {review.title} </h2>
              <p>{review.content}</p>
              {review.is_positive ? (
                <p>позитивный отзыв</p>
              ) : (
                <p>негативный отзыв</p>
              )}
            </li>
          ))}
      </ul>
      {session && session?.user.user_id ? (
        <ReviewsForm userId={session.user.user_id} />
      ) : (
        <p>вы должны авторизоваться что бы оставить отзыв</p>
      )}
    </>
  )
}
