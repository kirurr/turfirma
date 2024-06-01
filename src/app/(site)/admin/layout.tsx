import Navigation from '@/app/ui/admin/navigation'
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
  },
  {
    name: 'Пользователи',
    href: '/admin/users'
  },
  {
    name: 'Заказы',
    href: '/admin/orders'
  }
]

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <article className="section">
      <h1 className="h1 text-center">Панель администратора</h1>
      <Navigation links={links} />
      {children}
    </article>
  )
}
