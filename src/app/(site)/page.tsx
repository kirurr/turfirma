import { CategoryList } from '@/app/ui/category/category'
import Hero from '@/app/ui/hero'
import { fetchCategories } from '@/app/data/categories-data'
import MainSearch from '@/app/ui/admin/main-search'
import ToursList from '@/app/ui/tours-list'
import ContactForm from '@/app/ui/contact-form'
import AboutIcons from '@/app/ui/about-icons'
import ReviewsList from '@/app/ui/reviews-list'
import AboutUs from '@/app/ui/about-us-main'

export default async function Page() {
  const categories = await fetchCategories(null)
  return (
    <>
      <Hero />
      <section className="section full-width flex items-center bg-secondary-color">
        <h2 className="h2 text-2xl mb-0 w-1/3 text-text-secondary">
          Куда вы хотите отправиться?
        </h2>
        <MainSearch categories={categories} />
      </section>
      <section className="section text-center">
        <h2 className="h2">Популярные направления</h2>
        <CategoryList />
      </section>
      <section className="section text-center full-width bg-secondary-color">
        <ContactForm />
      </section>
      <section className="section text-center">
        <h2 className="h2">Популярные туры</h2>
        <ToursList />
      </section>
      <section className="section text-center full-width bg-triary-color">
        <h2 className="h2">Последние отзывы</h2>
        <ReviewsList />
      </section>
      <section className="section text-center">
        <h2 className="h2">Почему мы?</h2>
        <AboutIcons />
      </section>
      <section className="section text-center full-width bg-triary-color">
        <h2 className="h2">О нас</h2>
        <AboutUs />
      </section>
    </>
  )
}
