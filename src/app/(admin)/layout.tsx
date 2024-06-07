import Navigation from '@/app/ui/admin/navigation'
import Link from 'next/link'
import Label from '@/app/ui/admin/label'
import { AdminLink } from '@/app/lib/definitions'
import NavDropdown from '../ui/admin/nav-dropdown'

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
    <main className=" max-w-screen-xl bg-primary-100 rounded-lg mx-auto sm:mt-16 flex flex-wrap sm:grid grid-cols-[20%_80%] grid-rows-[max-content_1fr] p-2">
      <section className="col-start-1 py-2 sm:p-2 rounded-lg sm:bg-primary-500 w-full">
        <>
          <div className="flex items-center gap-4 justify-between sm:hidden relative">
            <NavDropdown links={links} />
            <Label />
          </div>
          <Link
            href="/"
            className=" hidden sm:block text-xl mx-auto link text-text-primary hover:text-primary-900"
          >
            Турфирма Travel
          </Link>
        </>
      </section>

      <section className="hidden sm:flex relative col-start-2 text-2xl items-center sm:justify-center p-2">
        <Label />
      </section>
      <section className="hidden sm:block p-2">
        <Navigation links={links} />
      </section>
      <section className="col-start-2 row-start-2 bg-primary-color rounded-lg p-2">
        {children}
      </section>
    </main>
  )
}
