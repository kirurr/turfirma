import { cache } from 'react'
import { list } from '@vercel/blob'

export const fetchHotelBlob = cache(async (id: string) => {
    try {
        const { blobs } = await list({ prefix: `hotels/${id}/` })
        return blobs
    } catch (error) {
        console.log(error)
        throw new Error('failed to fetch blobs')
    }
})
