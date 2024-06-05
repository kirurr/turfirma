import { fetchLastReviews } from '@/app/data/reviews-data'
import {  fetchUsers } from '../data/users-data'
import ReviewsCarousel from './reviews-carousel'

export default async function ReviewsList() {
  const [users, reviews] = await Promise.all([fetchUsers(), fetchLastReviews()])

  return <ReviewsCarousel reviews={reviews} users={users} />
}