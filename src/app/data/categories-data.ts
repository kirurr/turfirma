import { sql } from '@vercel/postgres'
import { Category } from '@/app/lib/definitions'

export async function fetchCategories(limit: number = 6) {
    try {
        const categories =
            await sql<Category>`SELECT * FROM categories LIMIT ${limit}`
        return categories.rows
    } catch (error) {
        console.log(error)
        throw new Error('failed to fetch categories')
    }
}

export async function fetchCategoryByAlias(alias: string) {
    if (alias === 'tours') {
        return { title: 'все туры' }
    }
    try {
        const category =
            await sql<Category>`SELECT * FROM categories WHERE alias = ${alias} `
        return category.rows[0]
    } catch (error) {
        console.log(error)
        throw new Error('failed to fetch category')
    }
}
