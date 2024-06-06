import { sql } from '@vercel/postgres'
import { Order } from '@/app/lib/definitions'
import { cache } from 'react'

export const fetchNotPaidOrders = cache(async () => {
    try {
        const orders = await sql<Order>`
			SELECT * FROM orders WHERE status = 'pending'
		`
        return orders.rows
    } catch (error) {
        console.log(error)
        throw new Error('failed to fetch orders')
    }
})

export const fetchOrdersByUserId = cache(async (userId?: string) => {
    try {
        const orders = await sql<Order>`
			SELECT * FROM orders WHERE user_id = ${userId} ORDER BY (CASE status
                WHEN 'paid' THEN 1
                WHEN 'pending' THEN 2
                WHEN 'canceled' THEN 3 END)
		`
        return orders.rows
    } catch (error) {
        console.log(error)
        throw new Error('failed to fetch orders')
    }
})

export const fetchOrdersId = cache(async () => {
    try {
        const result = await sql<{ id: string }>`SELECT id FROM orders`
        return result.rows
    } catch (error) {
        console.log(error)
        throw new Error('failed to fetch orders')
    }
})

export const fetchOrders = cache(async () => {
    try {
        const result = await sql<Order>`SELECT * FROM orders`
        return result.rows
    } catch (error) {
        console.log(error)
        throw new Error('failed to fetch orders')
    }
})

export const fetchOrdersCountByTourId = cache(async (tourId: string) => {
    try {
        const result =
            await sql<Order>`SELECT * FROM orders WHERE tour_id = ${tourId}`
        return result.rowCount
    } catch (error) {
        console.log(error)
        throw new Error('failed to fetch orders')
    }
})
