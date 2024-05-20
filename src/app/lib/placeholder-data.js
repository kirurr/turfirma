
const tours = [
	{
		id: '410544b2-4001-4271-9855-fec4b6a6442a',
		title: 'пример тура',
		alias: 'primer_tura',
		category_alias: 'kategoria',
		description: 'example description',
		date: '2022-06-05',
		program: 'example program',
		images_urls: ['1', '2'],
		included: ['stuff', 'stuff2'],
		excluded: ['ex', 'ex'],
		hotels_ids: ['3958dc9e-742f-4377-85e9-fec4b6a6442a'],
		duration: '1'
	},
	{
		id: '410544b2-4001-4271-9855-fec4b6a6443a',
		title: 'пример тура два',
		alias: 'primer_tura_dva',
		category_alias: 'kategoria_dva',
		description: 'example description',
		date: '2022-06-05',
		program: 'example program',
		images_urls: ['1', '2'],
		included: ['stuff', 'stuff2'],
		excluded: ['ex', 'ex'],
		hotels_ids: ['3958dc9e-742f-4377-85e9-fec4b6a6442a'],
		duration: '1'
	}
]

const categories = [
	{
		id: '3958dc9e-712f-4377-85e9-fec4b6a6442a',
		title: 'категория',
		alias: 'kategoria',
		description: 'sample',
		image_url: '1'
	},
	{
		id: '3958dc9e-712f-4377-85e9-fec4b6a6443a',
		title: 'категория два',
		alias: 'kategoria_dva',
		description: 'sample',
		image_url: '1'
	},
]

module.exports = {
	tours,
	categories
}
