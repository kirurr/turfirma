import Navigation from '@/app/ui/admin/navigation'
import Link from 'next/link'
import Label from '@/app/ui/admin/label'
import { AdminLink } from '@/app/lib/definitions'

const links: AdminLink[] = [
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
    name: 'Отели',
    href: '/admin/hotels'
  },
  {
    name: 'Заказы',
    href: '/admin/orders'
  }
]

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main className=" max-w-screen-xl bg-primary-100 rounded-lg mx-auto mt-8 admin-grid p-2">
      <section className="col-start-1 p-2 flex items-center">
        <Link
          href="/"
          className="text-xl mx-auto link text-text-primary hover:text-primary-500"
        >
          Обратно
        </Link>
      </section>
      <Label links={links} />
      <section className="p-2">
        <Navigation links={links} />
      </section>
      <section className="col-start-2 row-start-2 bg-primary-color rounded-lg p-2">
        {children}
      </section>
    </main>
  )
}
