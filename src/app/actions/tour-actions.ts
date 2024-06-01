'use server'

import { sql } from '@vercel/postgres'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'

const OrderSchema = z.object({
    id: z.string(),
    user_id: z.string(),
    tour_id: z.string(),
    hotel_id: z.nullable(z.string({message: 'Выберите отель.'})),
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
    if(hotel_id === 'no_hotel') hotel_id = null


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
        return { status: false, message: 'Произошла ошибка, попробуйте позже.', errors: {} }
    }
}
