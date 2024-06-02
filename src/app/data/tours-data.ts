import { Tour, TourWithHotel } from '@/app/lib/definitions'
import { list } from '@vercel/blob'
import { sql, db } from '@vercel/postgres'
import { cache } from 'react'

export const fetchAllTours = cache(async () => {
    try {
        const tours = await sql<Tour>`SELECT * FROM tours`
        return tours.rows
    } catch(error) {
        console.log(error)
        throw new Error('failed to fetch tours')
    }
})

export const fetchToursForParams = cache(async() => {
    try {
        const ids = await sql<{alias: string, category_id: string}>`SELECT alias, category_id FROM tours`
        return ids.rows
    } catch(error) {
        console.log(error)
        throw new Error('failed to fetch tours ids')
    }
})

export const fetchTourIdByAlias = cache(async(alias: string) => {
    try {
        const tour = await sql<{id: string}>`SELECT id FROM tours WHERE alias = ${alias}`
        return tour.rows[0]
    } catch(error) {
        console.log(error)
        throw new Error('failed to fetch tour id')
    }
})

export const fetchTourAndHotels = cache(async (id: string) => {
    try {
        const tour = await sql<TourWithHotel>`
			SELECT
				t.id, t.title, t.alias,
				t.category_id, t.description,
				t.date, t.program, t.images,
				t.included, t.excluded,
				t.duration, t.price,
				COALESCE(
					json_agg(
						json_build_object(
						'id', h.id,
						'title', h.title,
						'description', h.description,
						'image', h.image,
						'map_url', h.map_url
						) 
					) FILTER (WHERE h.id IS NOT NULL), '[]'
				) AS hotels_info
			FROM
				tours t
			LEFT JOIN
				unnest(t.hotels_ids) AS hotel_id ON true
			LEFT JOIN
				hotels h ON h.id = hotel_id
			WHERE
				t.id = ${id} 
			GROUP BY t.id;
		`
        return tour.rows[0]
    } catch (error) {
        console.log(error)
        throw new Error('failed to fetch tour')
    }
})

const ITEMS_PER_PAGE = 1
export const fetchTours = cache(
    async (category_id: string, page?: number, params?: string) => {
        const offset = page ? (page - 1) * ITEMS_PER_PAGE : 0
        try {
            const client = await db.connect()
            let query = `SELECT * FROM tours`
            if (category_id !== 'tours') {
                query += ` WHERE (category_id = '${category_id}')`
                if (params) {
                    query += ` AND (title ILIKE '%${params}%')`
                }
            } else {
                if (params) {
                    query += ` WHERE title ILIKE '%${params}%'`
                }
            }
            query += ` LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset};`
            const tours = await client.query<Tour>(query)
            return tours.rows
        } catch (error) {
            console.log(error)
            throw new Error('failed to fetch tours')
        }
    }
)

export const fetchToursPages = cache(async (category_id: string | null, params?: string) => {
    try {
        const client = await db.connect()
        let query = `SELECT COUNT(*) FROM tours`
        if (category_id !== null) {
            query += ` WHERE (category_id = '${category_id}')`
            if (params) {
                query += ` AND (title ILIKE '%${params}%')`
            }
        } else {
            if (params) {
                query += ` WHERE title ILIKE '%${params}%'`
            }
        }
        const tours = await client.query(query)
        const totalPages = Math.ceil(
            Number(tours.rows[0].count) / ITEMS_PER_PAGE
        )
        return totalPages
    } catch (error) {
        console.log(error)
        throw new Error('failed to fetch tours')
    }
})

export const fetchTourBlobs = cache(async (alias: string) => {
    try {
        const { blobs } = await list({ prefix: `tours/${alias}/` })
        return blobs
    } catch (error) {
        console.log(error)
        throw new Error('failed to fetch blobs')
    }
})

export const fetchTourCountByCategory = cache(async (category_id: string) => {
    try {
        const count = await sql`SELECT COUNT(*) FROM tours WHERE category_id = ${category_id}`
        return count.rows[0].count
    } catch(error) {
        console.log(error)
        throw new Error('failed to fetch tours count')
    }
})