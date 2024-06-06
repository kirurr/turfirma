'use server'

import { sql } from '@vercel/postgres'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'
import { redirect } from 'next/navigation'
import { del, put } from '@vercel/blob'
import { generateAlias } from '../lib/utils'
import { fetchTourBlobs } from '../data/tours-data'
import { TourWithHotel } from '../lib/definitions'

async function deleteBlob(url: string) {
    return await del(url)
}

const OrderSchema = z.object({
    id: z.string(),
    user_id: z.string(),
    tour_id: z.string(),
    hotel_id: z.nullable(z.string({ message: 'Выберите отель.' })),
    status: z.string()
})
const CreateOrder = OrderSchema.omit({ id: true, status: true })

export type CreateOrderState = {
    status: boolean
    message: string
    errors: {
        user_id?: string[]
        hotel_id?: string[]
        tour_id?: string[]
    }
}

export async function createOrder(
    ids: { user_id?: string; tour_id: string },
    _prevState: CreateOrderState,
    formData: FormData
) {
    const validatedFields = CreateOrder.safeParse({
        user_id: ids.user_id,
        tour_id: ids.tour_id,
        hotel_id: formData.get('hotel_id')?.toString()
    })

    if (!validatedFields.success) {
        return {
            status: false,
            message: 'Ошибка!',
            errors: validatedFields.error.flatten().fieldErrors
        }
    }

    let { user_id, tour_id, hotel_id } = validatedFields.data
    if (hotel_id === 'no_hotel') hotel_id = null

    try {
        await sql`INSERT INTO orders (user_id, tour_id, hotel_id)
		VALUES (${user_id}, ${tour_id}, ${hotel_id})`
        revalidatePath('/', 'layout')
        return {
            status: true,
            message: 'Успешно! заказ можно посмотреть в вашем личном кабинете.',
            errors: {}
        }
    } catch (error) {
        console.log(error)
        return {
            status: false,
            message: 'Произошла ошибка, попробуйте позже.',
            errors: {}
        }
    }
}

async function uploadBLob(alias: string, image: File) {
    return await put(`tours/${alias}/${image.name}`, image, {
        access: 'public'
    })
}

export type TourState = {
    status: boolean
    message: string
    errors: {
        title?: string[]
        description?: string[]
        price?: string[]
        programm?: string[]
        category?: string[]
        included?: string[]
        excluded?: string[]
        date?: string[]
        duration?: string[]
    }
}

const TourSchema = z.object({
    id: z.string(),
    title: z.string().trim().min(1),
    alias: z.string().trim().min(1),
    description: z.string().trim().min(1),
    price: z.string().min(1),
    program: z.string().trim().min(1),
    category: z.string().trim().min(1),
    included: z.string().trim().min(1),
    excluded: z.string().trim().min(1),
    date: z.string().trim().min(1),
    duration: z.string().min(1)
})

const CreateTour = TourSchema.omit({ id: true, alias: true })

export async function createTour(_prevState: TourState, formData: FormData) {
    const validatedFields = CreateTour.safeParse(
        Object.fromEntries(formData.entries())
    )

    if (!validatedFields.success) {
        console.log(validatedFields.error.flatten().fieldErrors)
        return {
            status: false,
            message: 'Ошибка. Проверьте правильность полей',
            errors: validatedFields.error.flatten().fieldErrors
        }
    }

    const {
        title,
        description,
        price,
        program,
        category,
        included,
        excluded,
        date,
        duration
    } = validatedFields.data

    const alias = generateAlias(title)

    const images = formData.getAll('image') as File[]
    const imagesArray = images.map((item) => item.name)

    const hotelsArray = formData.getAll('hotels') as string[]

    const includedArray = included.split(';').map((item) => item.trim())
    const excludedArray = excluded.split(';').map((item) => item.trim())

    try {
        await sql`INSERT INTO tours (title, description, price, program,
            category_id, included, excluded, date,
            duration, hotels_ids, images, alias)
            VALUES (${title}, ${description}, ${price}, ${program},
            ${category}, ${includedArray as any}, ${excludedArray as any},
            ${date}, ${duration}, ${hotelsArray as any},
            ${imagesArray as any}, ${alias})`

        await Promise.all(
            images.map(async (image) => await uploadBLob(alias, image))
        )
    } catch (error) {
        console.log(error)
        return {
            status: false,
            message: 'Произошла ошибка, попробуйте позже.',
            errors: {}
        }
    }
    revalidatePath('/', 'layout')
    redirect('/admin/tours')
}

export async function deleteTour(id: string, alias: string) {
    const images = await fetchTourBlobs(alias)
    try {
        await sql`DELETE FROM tours WHERE id = ${id}`
        await Promise.all(
            images.map(async (image) => await deleteBlob(image.url))
        )
    } catch (error) {
        console.log(error)
        throw new Error('failed to delete tour')
    }
    revalidatePath('/', 'layout')
    redirect('/admin/tours/')
}

const UpdateTour = TourSchema.omit({ id: true, alias: true })

export async function updateTour(
    prevData: TourWithHotel,
    _prevState: TourState,
    formData: FormData
) {
    const validatedFields = UpdateTour.safeParse(
        Object.fromEntries(formData.entries())
    )

    if (!validatedFields.success) {
        console.log(validatedFields.error.flatten().fieldErrors)
        return {
            status: false,
            message: 'Ошибка. Проверьте правильность полей',
            errors: validatedFields.error.flatten().fieldErrors
        }
    }

    const images = formData.getAll('image') as File[]
    let imagesArray: string[] = []
    if (images.length >= 1 && images[0].size > 0) {
        try {
            const oldImages = await fetchTourBlobs(prevData.alias)
            await Promise.all(
                oldImages.map(async (image) => await deleteBlob(image.url))
            )

            await Promise.all(
                images.map(
                    async (image) => await uploadBLob(prevData.alias, image)
                )
            )

            imagesArray = images.map((item) => item.name.split('.')[0])
        } catch (error) {
            console.log(error)
            return {
                status: false,
                message:
                    'Произошла ошибка при загрузке изображений, попробуйте позже.',
                errors: {}
            }
        }
    } else {
        imagesArray = prevData.images
    }

    const {
        title,
        description,
        price,
        program,
        category,
        included,
        excluded,
        date,
        duration
    } = validatedFields.data

    const alias = generateAlias(title)

    const hotelsArray = formData.getAll('hotels') as string[]

    const includedArray = included.split(';').map((item) => item.trim())
    const excludedArray = excluded.split(';').map((item) => item.trim())

    try {
        await sql`UPDATE tours SET (title, description, price, program,
            category_id, included, excluded, date,
            duration, hotels_ids, images, alias)
            = (${title}, ${description}, ${price}, ${program},
            ${category}, ${includedArray as any}, ${excludedArray as any},
            ${date}, ${duration}, ${hotelsArray as any},
            ${imagesArray as any}, ${alias}) WHERE id = ${prevData.id}`
    } catch (error) {
        console.log(error)
        return {
            status: false,
            message: 'Произошла ошибка, попробуйте позже.',
            errors: {}
        }
    }
    revalidatePath('/', 'layout')
    redirect('/admin/tours')
}
