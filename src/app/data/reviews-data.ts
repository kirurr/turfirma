import { sql } from '@vercel/postgres'
import { cache } from 'react'
import { Review } from '@/app/lib/definitions'

export const fetchReviews = cache(async (isAccepted: boolean = true) => {
    try {
        const reviews = await sql<Review>`
			SELECT * FROM reviews WHERE is_accepted = ${isAccepted}
		`
        return reviews.rows
    } catch (error) {
        console.log(error)
        throw new Error('failed to fetch reviews')
    }
})

export const fetchAllReviews = cache(async () => {
    try {
        const reviews = await sql<Review>`
			SELECT * FROM reviews`
        return reviews.rows
    } catch (error) {
        console.log(error)
        throw new Error('failed to fetch reviews')
    }
})

export const fetchReview = cache(async(id: string) => {
    try {
        const review = await sql<Review>`SELECT * FROM reviews WHERE id = ${id}`
        return review.rows[0]
    } catch(error) {
        console.log(error)
        throw new Error('failed to fetch review')
    }
})
