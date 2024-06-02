import { ListBlobResultBlob } from '@vercel/blob'

export type Tour = {
    id: string
    title: string
    alias: string
    category_id: string
    description: string
    date: string
    program: string
    images: string[]
    included: string[]
    excluded: string[]
    hotels_ids?: string[]
    duration: number
    price: number
}

export type TourWithHotel = {
    hotels_info: Hotel[]
} & Tour

export type Hotel = {
    id: string
    title: string
    description: string
    image: string
    map_url: string
}

export type HotelWithBlob = {
    image: ListBlobResultBlob
} & Hotel

export type Category = {
    id: string
    title: string
    alias: string
    description: string
    image: string
}

export type User = {
    id: string
    passport: string
    name: string
    email: string
    password: string
    role: 'user' | 'admin'
}

export type Order = {
    id: string
    user_id: string
    tour_id: string
    hotel_id: string
    status: 'canceled' | 'paid' | 'pending'
}

export type Review = {
    id: string
    user_id: string
    title: string
    content: string
    is_positive: boolean
    is_accepted: boolean
}
