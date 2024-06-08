import { fetchReviews } from '@/app/data/reviews-data'
import { auth } from '@/auth'
import ReviewsForm from '@/app/ui/reviews-form'
import ReviewsWrapper from '@/app/ui/reviews/reviews'
import Hero from '@/app/ui/hero'

export default async function Page() {
  const reviews = await fetchReviews()
  const session = await auth()
  return (
    <>
      <Hero
        isParagraph={false}
        isButton={false}
        isFullHeight={false}
        title="Отзывы"
				imageUrl='/reviews.jpg'
      />
      <section className="section py-4 lg:py-[6rem] max-w-3xl">
        {reviews.length > 0 ? (
          <ReviewsWrapper reviews={reviews} />
        ) : (
          <h2 className="h2 text-center">Еще нет отзывов, оставьте первый!</h2>
        )}
      </section>
      <section className="section">
        {session && session?.user.user_id ? (
          <ReviewsForm userId={session.user.user_id} />
        ) : (
          <h2 className="h2 text-center">Войдите чтобы оставить отзыв.</h2>
        )}
      </section>
    </>
  )
}
