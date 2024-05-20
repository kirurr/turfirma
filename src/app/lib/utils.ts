import cyrillicToTranslit from "cyrillic-to-translit-js"

export function formatDateFromPostgreSQL(date: string): string {
	return new Intl.DateTimeFormat("ru-RU").format(new Date(date))
}

export function generateAlias(title: string): string {
	return cyrillicToTranslit().transform(title, '_')
}
