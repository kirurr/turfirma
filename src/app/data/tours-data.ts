'use server'

import { Tour } from '@/app/lib/definitions'
import { sql, db } from '@vercel/postgres'

export async function fetchTourByAlias(alias: string) {
    try {
        const tour = await sql<Tour>`SELECT * FROM tours WHERE alias=${alias}`
        return tour.rows[0]
    } catch (error) {
        console.log(error)
        throw new Error('failed to fetch tour')
    }
}


export async function fetchTours(alias: string, params?: string) {
    const client = await db.connect()
    try {
        let query = `SELECT * FROM tours`
        if (alias !== 'tours') {
            query += ` WHERE (category_alias = '${alias}')`
            if (params) {
                query += ` AND (title ILIKE '%${params}%')`
            }
        } else {
            if (params) {
                query += ` WHERE title ILIKE '%${params}%'`
            }
        }
        const tours = await client.query(query)
        return tours.rows
    } catch (error) {
        console.log(error)
        throw new Error('failed to fetch tours')
    }
}
