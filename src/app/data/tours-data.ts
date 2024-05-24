import { Tour, TourWithHotel } from '@/app/lib/definitions'
import { sql, db } from '@vercel/postgres'
import { cache } from 'react'

// export async function fetchTourByAlias(alias: string) {
//     try {
//         const tour = await sql<Tour>`SELECT * FROM tours WHERE alias=${alias}`
//         return tour.rows[0]
//     } catch (error) {
//         console.log(error)
//         throw new Error('failed to fetch tour')
//     }
// }

export const fetchTourAndHotels = cache(async (alias: string) => {
    try {
        const tour = await sql<TourWithHotel>`
			SELECT
				t.id AS tour_id, t.title AS tour_title, t.alias AS tour_alias,
				t.category_alias AS tour_category_alias, t.description AS tour_description,
				t.date AS tour_date, t.program AS tour_program, t.images_urls AS tour_images,
				t.included AS tour_included, t.excluded AS tour_excluded,
				t.duration AS tour_duration, t.price AS tour_price,
				COALESCE(
					json_agg(
						json_build_object(
						'hotel_id', h.id,
						'hotel_title', h.title,
						'hotel_description', h.description,
						'hotel_image', h.image_url,
						'hotel_map', h.map_url
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
				t.alias = ${alias} 
			GROUP BY t.id;
		`
        return tour.rows[0]
    } catch (error) {
        console.log(error)
        throw new Error('failed to fetch tour')
    }
})

const ITEMS_PER_PAGE = 3
export const fetchTours = cache(
    async (alias: string, page?: number, params?: string) => {
        const offset = page ? (page - 1) * ITEMS_PER_PAGE : 0
        try {
            const client = await db.connect()
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
            query += ` LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset};`
            const tours = await client.query<Tour>(query)
            return tours.rows
        } catch (error) {
            console.log(error)
            throw new Error('failed to fetch tours')
        }
    }
)

export const fetchToursPages = cache(async (alias: string, params?: string) => {
    try {
        const client = await db.connect()
        let query = `SELECT COUNT(*) FROM tours`
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
        const totalPages = Math.ceil(
            Number(tours.rows[0].count) / ITEMS_PER_PAGE
        )
        return totalPages
    } catch (error) {
        console.log(error)
        throw new Error('failed to fetch tours')
    }
})
