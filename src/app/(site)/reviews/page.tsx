import { fetchReviews } from '@/app/data/reviews-data'
import { auth } from '@/auth'
import ReviewsForm from '@/app/ui/reviews-form'
import ReviewsWrapper from '@/app/ui/reviews/reviews'

export default async function Page() {
  const reviews = await fetchReviews()
  const session = await auth()
  return (
    <>
      <section className='section'>
        <h1 className="h1 text-center">отзывы</h1>
        <ReviewsWrapper reviews={reviews} />
      </section>
      <section className='section'>
        {session && session?.user.user_id ? (
          <ReviewsForm userId={session.user.user_id} />
        ) : (
          <h2 className="h2 text-center">
            Войдите чтобы оставить отзыв.
          </h2>
        )}
      </section>
    </>
  )
}
