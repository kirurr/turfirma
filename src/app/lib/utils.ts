import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import cyrillicToTranslit from 'cyrillic-to-translit-js'

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export function formatDateFromPostgreSQL(date: string): string {
    return new Intl.DateTimeFormat('ru-RU').format(new Date(date))
}

export function generateAlias(title: string): string {
    return cyrillicToTranslit().transform(title, '_')
}

export function checkForActiveLink(pathname: string, link: string) {
    if (pathname.split('/').length > 3)
        return pathname.split('/')[2] === link.split('/')[2]
    else return pathname.split('/').at(-1) === link.split('/').at(-1)
}
