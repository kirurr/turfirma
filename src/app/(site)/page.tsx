import { CategoryList } from '@/app/ui/category/category'
import Hero from '@/app/ui/hero'
import { fetchCategories } from '@/app/data/categories-data'
import MainSearch from '@/app/ui/admin/main-search'
import ToursList from '@/app/ui/tours-list'
import ContactForm from '@/app/ui/contact-form'
import AboutIcons from '@/app/ui/about-icons'
import ReviewsList from '@/app/ui/reviews-list'
import AboutUs from '@/app/ui/about-us-main'
import { Suspense } from 'react'
import { Spinner } from '@nextui-org/react'

export const revalidate = 3600

export default async function Page() {
  const categories = await fetchCategories(null)
  return (
    <>
      <Hero />
      <section className="section sm:full-width flex flex-col sm:flex-row items-center bg-secondary-color">
        <h2 className="h2 text-2xl sm:mb-0 w-full text-center sm:text-start sm:w-1/3 text-text-secondary">
          Куда вы хотите отправиться?
        </h2>
        <MainSearch categories={categories} />
      </section>
      <section className="section text-center">
        <h2 className="h2">Популярные направления</h2>
        <CategoryList />
      </section>
      <section className="section text-center sm:full-width bg-secondary-color">
        <ContactForm />
      </section>
      <section className="section text-center">
        <h2 className="h2">Популярные туры</h2>
        <Suspense fallback={<Spinner size="lg" className="size-full" />}>
          <ToursList />
        </Suspense>
      </section>
      <section className="section text-center sm:full-width bg-triary-color">
        <h2 className="h2">Последние отзывы</h2>
        <Suspense fallback={<Spinner size="lg" className="size-full" />}>
          <ReviewsList />
        </Suspense>
      </section>
      <section className="section text-center">
        <h2 className="h2">Почему мы?</h2>
        <AboutIcons />
      </section>
      <section className="section text-center sm:full-width bg-triary-color">
        <h2 className="h2">О нас</h2>
        <AboutUs />
      </section>
    </>
  )
}
