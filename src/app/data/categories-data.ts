import { sql } from '@vercel/postgres'
import { cache } from 'react'
import { Category } from '@/app/lib/definitions'
import { list } from '@vercel/blob'

export const fetchCategories = cache(async (limit: number | null = 6) => {
    try {
        const categories =
            await sql<Category>`SELECT * FROM categories LIMIT ${limit}`
        return categories.rows
    } catch (error) {
        console.log(error)
        throw new Error('failed to fetch categories')
    }
})

export const fetchCategoryIdByAlias = cache(async (alias: string) => {
    if (alias === 'tours') {
        return null
    }
    try {
        const category = await sql<{
            id: string
        }>`SELECT id FROM categories WHERE alias = ${alias}`
        return category.rows[0]
    } catch (error) {
        console.log(error)
        throw new Error('failed to fetch category id')
    }
})

export const fetchCategoryById = cache(async (id: string) => {
    if (id === 'tours') {
        return null
    }
    try {
        const category =
            await sql<Category>`SELECT * FROM categories WHERE id = ${id} `
        return category.rows[0]
    } catch (error) {
        console.log(error)
        throw new Error('failed to fetch category')
    }
})

export const fetchCategoryByAlias = cache(async (alias: string) => {
    if (alias === 'tours') {
        return null
    }
    try {
        const category =
            await sql<Category>`SELECT * FROM categories WHERE alias = ${alias}`
        return category.rows[0]
    } catch (error) {
        console.log(error)
        throw new Error('failed to fetch category')
    }
})

export const fetchCategoriesBlobs = cache(async () => {
    try {
        const { blobs } = await list({ prefix: 'categories/' })
        return blobs
    } catch (error) {
        console.log(error)
        throw new Error('failed to fetch blobs')
    }
})