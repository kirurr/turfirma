import { fetchAllReviews, fetchReview } from '@/app/data/reviews-data'
import { AdminReviewForm } from '@/app/ui/admin/reviews/review-form'
import { notFound } from 'next/navigation'

export async function generateStaticParams() {
  const reviews = await fetchAllReviews()

  return reviews.map((review) => ({ id: review.id }))
}

export default async function Page({ params }: { params: { id: string } }) {
  const review = await fetchReview(params.id)
  if (!review) notFound()

  return <AdminReviewForm review={review} />
}
