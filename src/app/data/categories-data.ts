'use server'

import { sql } from '@vercel/postgres'
import { Category } from '@/app/lib/definitions'

const categoriesNumber = 6
export async function fetchCategories() {
    try {
        const categories =
            await sql<Category>`SELECT * FROM categories LIMIT ${categoriesNumber}`
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
