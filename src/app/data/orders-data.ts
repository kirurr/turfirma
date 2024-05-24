import { sql } from '@vercel/postgres'
import { Order } from '@/app/lib/definitions'
import { cache } from 'react'

export const fetchOrdersByUserId = cache(async (userId?: string) => {
    try {
        const orders = await sql<Order>`
			SELECT * FROM orders WHERE user_id = ${userId}
		`
        return orders.rows
    } catch (error) {
        console.log(error)
        throw new Error('failed to fetch orders')
    }
})
