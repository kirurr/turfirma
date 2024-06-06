import { fetchAllReviews } from '@/app/data/reviews-data'
import { AdminReviewsWrapper } from '@/app/ui/admin/reviews/reviews'
import { Spinner } from '@nextui-org/react'
import { Suspense } from 'react'

export default function Page() {
  return (
    <Suspense fallback={<Spinner size="lg" className="size-full" />}>
      <Reviews />
    </Suspense>
  )
}

async function Reviews() {
  const reviews = await fetchAllReviews()
  return (
    <>
      {reviews.length > 0 ? (
        <AdminReviewsWrapper reviews={reviews} />
      ) : (
        <h2 className="h2 my-8 text-center">Еще нет отзывов</h2>
      )}
    </>
  )
}
