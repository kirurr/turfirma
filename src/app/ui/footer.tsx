import Link from 'next/link'
import { fetchCategories } from '../data/categories-data'
import { auth } from '@/auth'

export default async function Footer() {
  const session = await auth()
  const isAuth = session?.user ? true : false
  const categories = await fetchCategories(null)
  return (
    <footer className="flex sm:flex-row sm:flex-wrap lg:flex-nowrap flex-col items-start gap-8 sm:gap-0 lg:gap-8 section py-8 lg:full-width bg-secondary-color">
      <div className="sm:w-1/2 lg:w-1/3 lg:mx-0">
        <h3 className="h3 text-text-secondary">Направления</h3>
        <ul className="flex flex-col gap-2 flex-grow-0 flex-shrink-0 flex-wrap max-h-[10rem]">
          {categories.map((category) => (
            <li key={category.id}>
              <Link
                href={`/${category.alias}`}
                className="link text-text-secondary hover:text-primary-500 active:text-text-secondary"
              >
                {category.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="sm:w-1/2 lg:w-1/3 lg:mx-auto sm:mx-0 flex">
        <div className="w-full">
          <h3 className="h3 text-text-secondary">Навигация</h3>
          <nav>
            <ul className="flex flex-col gap-2">
              <li>
                <Link
                  href="/#"
                  className="link text-text-secondary hover:text-primary-500 active:text-text-secondary"
                >
                  Главная
                </Link>
              </li>
              <li>
                <Link
                  href="/tours"
                  className="link text-text-secondary hover:text-primary-500 active:text-text-secondary"
                >
                  Все туры
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="link text-text-secondary hover:text-primary-500 active:text-text-secondary"
                >
                  О нас
                </Link>
              </li>
              <li>
                <Link
                  href="/reviews"
                  className="link text-text-secondary hover:text-primary-500 active:text-text-secondary"
                >
                  Отзывы
                </Link>
              </li>
              {isAuth && (
                <li>
                  <Link
                    href="/profile"
                    className="link text-text-secondary hover:text-primary-500 active:text-text-secondary"
                  >
                    Личный кабинет
                  </Link>
                </li>
              )}
            </ul>
          </nav>
        </div>
        <div className="w-full">
          <h3 className="h3 text-text-secondary">Наши контакты</h3>
          <div className="flex flex-col gap-2">
            <a
              className="link text-text-secondary hover:text-primary-500 active:text-text-secondary p-0"
              href="tel:+79991234567"
            >
              +7 (999) 123-45-67
            </a>
            <a
              className="link text-text-secondary hover:text-primary-500 active:text-text-secondary p-0"
              href="mailto:info@travel.com"
            >
              info@travel.com
            </a>
            <p className="font-semibold text-text-secondary">
              Адрес: Москва, ул. Солнца, д. 1, кв. 1
            </p>
          </div>
        </div>
      </div>
      <div className="sm:w-full lg:w-1/3 mx-auto">
        <h2 className="h2 text-text-secondary">Турфирма Travel</h2>
        <div className='relative'>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7439.121385491727!2d44.50204094184699!3d48.76037882622604!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x411aca44eebb5507%3A0x86e160e79a3b5fd!2z0JzQsNC80LAg0J3QvtGA0LrQsCDQn9Cw0L_QsCDQkdC-0LHRkdGA!5e0!3m2!1sru!2sru!4v1717666806094!5m2!1sru!2sru"
            width="100%"
            height="200"
            loading="lazy"
          ></iframe>
        </div>
      </div>      
    </footer>
  )
}
