import Navigation from '@/app/ui/admin/navigation'
import Link from 'next/link'
import Label from '@/app/ui/admin/label'
import { AdminLink } from '@/app/lib/definitions'
import NavDropdown from '../ui/admin/nav-dropdown'

const links: AdminLink[] = [
  {
    name: 'Админ',
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
    <main className="max-w-screen-xl bg-primary-100 xl:rounded-lg mx-auto xl:mt-16 flex flex-col lg:grid grid-cols-[20%_80%] grid-rows-[max-content_max-content] p-2">
      <section className="col-start-1 py-2 lg:p-0 rounded-lg lg:bg-primary-300 lg:outline-2 lg:outline-primary-500 lg:outline w-full">
        <>
          <div className="flex items-center gap-4 justify-between lg:hidden relative">
            <NavDropdown links={links} />
            <Label />
          </div>
          <Link
            href="/"
            className="text-center hidden lg:block text-xl size-full p-2 link text-text-primary hover:text-text-secondary rounded-lg lg:hover:bg-primary-500 no-underline active:bg-primary-500"
          >
            Турфирма Travel
          </Link>
        </>
      </section>

      <section className="hidden lg:flex relative col-start-2 text-2xl items-center lg:justify-center p-2">
        <Label />
      </section>
      <section className="hidden lg:block p-2">
        <Navigation links={links} />
      </section>
      <section className="col-start-2 row-start-2 min-h-[45vh] bg-primary-color rounded-lg p-2 w-full lg:w-auto lg:min-h-0">
        {children}
      </section>
    </main>
  )
}
