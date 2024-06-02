'use server'

import { del, put } from '@vercel/blob'
import { sql } from '@vercel/postgres'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { z } from 'zod'
import { Hotel } from '../lib/definitions'
import { fetchHotelBlob } from '../data/hotels-data'

export async function deleteHotel(id: string, image: string) {
    const blob = await fetchHotelBlob(id)
    const imageUrl = blob.find((i) => i.pathname.includes(image))!.url
    try {
        await sql`DELETE FROM hotels WHERE id = ${id}`

        await deleteBlob(imageUrl)
    } catch (error) {
        console.log(error)
        throw new Error('failed to delete hotel')
    }
    revalidatePath('/', 'layout')
    redirect('/admin/hotels/')
}

async function uploadBLob(id: string, image: File) {
    return await put(`hotels/${id}/${image.name}`, image, { access: 'public' })
}

async function deleteBlob(url: string) {
    return await del(url)
}

const HotelSchema = z.object({
    id: z.string(),
    title: z.string().trim().min(1),
    description: z.string().trim().min(1),
    image: z.string().trim().min(1),
    mapUrl: z.string().trim().min(1)
})

const CreateHotel = HotelSchema.omit({ id: true, image: true })

export type HotelState = {
    status: boolean
    message: string
    errors: {
        title?: string[]
        description?: string[]
        image?: string[]
        mapUrl?: string[]
    }
}

export async function createHotel(
    _prevState: HotelState | void,
    formData: FormData
): Promise<HotelState> {
    const data = Object.fromEntries(formData.entries())
    const image = formData.get('image') as File
    const validatedFields = CreateHotel.safeParse(data)

    if (!validatedFields.success) {
        return {
            status: false,
            message: 'Ошибка при создании отеля.',
            errors: validatedFields.error.flatten().fieldErrors
        }
    }

    const imageName = image.name.split('.')[0]

    const { title, description, mapUrl } = validatedFields.data

    try {
        const result = await sql<Hotel>`
        INSERT INTO hotels (title, description, image, map_url)
        VALUES (${title}, ${description}, ${imageName}, ${mapUrl})
        RETURNING id
        `

        await uploadBLob(result.rows[0].id, image)
    } catch (error) {
        console.log(error)
        return {
            status: false,
            message: 'Произошла ошибка. Попробуйте позже.',
            errors: {}
        }
    }
    revalidatePath('/', 'layout')
    redirect('/admin/hotels/')
}

const UpdateHotel = HotelSchema.omit({ id: true, image: true })

export async function updateHotel(
    prevData: Hotel,
    _prevState: HotelState | void,
    formData: FormData
): Promise<HotelState> {
    const validatedFields = UpdateHotel.safeParse(
        Object.fromEntries(formData.entries())
    )

    if (!validatedFields.success) {
        return {
            status: false,
            message: 'Ошибка. Проверьте правильность полей.',
            errors: validatedFields.error.flatten().fieldErrors
        }
    }

    const image = formData.get('image') as File
    let imageName
    if (image.name !== 'undefined') {
        await uploadBLob(prevData.id, image)
        const oldBlob = await fetchHotelBlob(prevData.id)
        const oldImageUrl = oldBlob.find((i) =>
            i.pathname.includes(prevData.image)
        )!.url
        await deleteBlob(oldImageUrl)
        imageName = image.name.split('.')[0]
    } else {
        imageName = prevData.image
    }

    const { title, description, mapUrl } = validatedFields.data

    try {
        await sql`UPDATE hotels SET 
        (title, description, image, map_url) = (${title}, ${description}, ${imageName}, ${mapUrl})
        WHERE id = ${prevData.id}`
    } catch (error) {
        console.log(error)
        return {
            status: false,
            message: 'Что-то пошло не так, повторите попытку позже.',
            errors: {}
        }
    }

    revalidatePath('/', 'layout')
    redirect('/admin/hotels/')
}
