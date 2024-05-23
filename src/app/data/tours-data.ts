'use server'

import { Tour, TourWithHotel } from '@/app/lib/definitions'
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

export async function fetchTourAndHotels(alias: string) {
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
