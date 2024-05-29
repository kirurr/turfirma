'use server'

import { z } from 'zod'
import { del, put } from '@vercel/blob'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { generateAlias } from '@/app/lib/utils'
import { sql } from '@vercel/postgres'
import { Category } from '@/app/lib/definitions'
import { fetchCategoriesBlobs } from '../data/categories-data'

async function uploadBLob(image: File) {
    return await put(`categories/${image.name}`, image, { access: 'public' })
}

async function deleteBlob(url: string) {
    return await del(url)
}
const CategorySchema = z.object({
    id: z.string(),
    title: z.string().trim().min(1),
    alias: z.string().trim().min(1),
    description: z.string().trim().min(1)
})

const CreateCategory = CategorySchema.omit({ id: true, alias: true })

export type CategoryState = {
    status: boolean
    message: string
    errors: {
        title?: string[]
        description?: string[]
    }
}

export async function createCategory(
    _prevState: CategoryState | void,
    formData: FormData
): Promise<CategoryState> {
    const data = Object.fromEntries(formData.entries())
    const image = formData.get('image') as File
    const validatedFields = CreateCategory.safeParse(data)

    if (!validatedFields.success) {
        return {
            status: false,
            message: 'Ошибка при создании категории.',
            errors: validatedFields.error.flatten().fieldErrors
        }
    }

    const { title, description } = validatedFields.data
    const alias = generateAlias(title)
    const imageName = image.name.split('.')[0]

    try {
        await uploadBLob(image)

        await sql`
        INSERT INTO categories (title, alias, description, image)
        VALUES (${title}, ${alias}, ${description}, ${imageName})
      `
    } catch (error) {
        console.log(error)
        return {
            status: false,
            message: 'Произошла ошибка. Попробуйте позже.',
            errors: {}
        }
    }

    revalidatePath('/')
    revalidatePath('admin/categories/')
    redirect('/admin/categories/')
}

const UpdateCategory = CategorySchema.omit({ id: true, alias: true })

export async function updateCategory(
    prevData: Category,
    _prevState: CategoryState | void,
    formData: FormData
): Promise<CategoryState> {
    const validatedFields = UpdateCategory.safeParse(
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
        await uploadBLob(image)
        const oldBlob = await fetchCategoriesBlobs()
        const oldImage = oldBlob.find((blob) =>
            blob.pathname.includes(prevData.image)
        )
        await deleteBlob(oldImage?.url!)
        imageName = image.name.split('.')[0]
    } else {
        imageName = prevData.image
    }
    const { title, description } = validatedFields.data
    const alias = generateAlias(title)

    try {
        await sql`UPDATE categories SET 
        (title, alias, description, image) = (${title}, ${alias}, ${description}, ${imageName})
        WHERE alias = ${prevData.alias}`
    } catch (error) {
        console.log(error)
        return {
            status: false,
            message: 'Ошибка. Попробуйте позже.',
            errors: {}
        }
    }
    revalidatePath('/')
    revalidatePath('admin/categories')
    redirect('/admin/categories')
}

export async function deleteCategory(category: Category) {
    const blob = await fetchCategoriesBlobs()
    const image = blob.find((blob) => blob.pathname.includes(category.image))
    try {
        await deleteBlob(image?.url!)

        await sql`DELETE FROM categories WHERE alias = ${category.alias}`
    } catch (error) {
        console.log(error)
        throw new Error('failed to delete category')
    }
    revalidatePath('/')
    revalidatePath('admin/categories/')
    redirect('/admin/categories/')
}
