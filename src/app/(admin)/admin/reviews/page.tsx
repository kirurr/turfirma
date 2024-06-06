import { fetchAllReviews } from "@/app/data/reviews-data"
import { AdminReviewsWrapper } from "@/app/ui/admin/reviews/reviews"

export default async function Page() {
  const reviews = await fetchAllReviews()
  return (
    <>
      <section className="section">
        <h2 className="h2 text-center">Отзывы</h2>
      </section>
      <section className="section">
      {reviews.length > 0 ? (
        <AdminReviewsWrapper reviews={reviews} />
      ): (
        <h2 className="h2 text-center">Еще нет отзывов</h2>
      )}
      </section>
    </>
  )
}