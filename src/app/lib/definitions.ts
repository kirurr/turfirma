export type Tour = {
    id: string
    title: string
    alias: string
    category_alias: string
    description: string
    date: string
    program: string
    images_urls: string[]
    included: string[]
    excluded: string[]
    hotels_ids: string[]
    duration: number
}

export type Hotel = {
    id: string
    title: string
    description: string
    image_url: string
    map_url: string
}

export type Category = {
    id: string
    title: string
    alias: string
    description: string
    image_url: string
}

export type User = {
    id: string
    passport: string
    name: string
    email: string
    password: string
    role: 'user' | 'admin'
}
