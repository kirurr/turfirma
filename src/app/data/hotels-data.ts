import { cache } from 'react'
import { list } from '@vercel/blob'
import { sql } from '@vercel/postgres'
import { Hotel, Tour } from '@/app/lib/definitions'

export const fetchHotelBlob = cache(async (id: string) => {
    try {
        const { blobs } = await list({ prefix: `hotels/${id}/` })
        return blobs
    } catch (error) {
        console.log(error)
        throw new Error('failed to fetch blobs')
    }
})

export const fetchHotelsBlobs = cache(async () => {
    try {
        const blobs = await list({ prefix: 'hotels/' })
        return blobs.blobs
    } catch (error) {
        console.log(error)
        throw new Error('failed to fetch blobs')
    }
})

export const fetchHotels = cache(async () => {
    try {
        const hotels = await sql<Hotel>`SELECT * FROM hotels`
        return hotels.rows
    } catch (error) {
        console.log(error)
        throw new Error('failed to fetch hotels')
    }
})

export const fetchToursWithHotel = cache(async (id: string) => {
    try {
        const tours = await sql<Tour>`SELECT * FROM tours WHERE ${id} = ANY(hotels_ids)`
        return tours.rowCount
    } catch (error) {
        console.log(error)
        throw new Error('failed to fetch tours')
    }
})

export const fetchHotelById = cache(async (id: string) => {
    try {
        const hotel = await sql<Hotel>`SELECT * FROM hotels WHERE id = ${id}`
        return hotel.rows[0]
    } catch (error) {
        console.log(error)
        throw new Error('failed to fetch hotel')
    }
})