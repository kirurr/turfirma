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
