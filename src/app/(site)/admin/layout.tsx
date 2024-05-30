import Navigation from '@/app/ui/admin/navigation';
const links = [
	{
		name: 'Главная',
		href: '/admin'
	},
	{
		name: 'Категории',
		href: '/admin/categories'
	},
	{
		name: 'Туры',
		href: '/admin/tours'
	},
	{
		name: 'Отзывы',
		href: '/admin/reviews'
	}
]

export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<>
			<h1 className="h1 text-center">Панель администратора</h1>
			<Navigation links={links} />
			{children}
		</>
	);
}