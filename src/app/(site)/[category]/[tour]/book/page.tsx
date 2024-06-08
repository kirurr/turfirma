import { fetchTourAndHotels, fetchTourIdByAlias } from '@/app/data/tours-data'
import { notFound } from 'next/navigation'
import { auth } from '@/auth'
import BookForm from '@/app/ui/book-form'

export default async function Page({
  params
}: {
  params: { category: string; tour: string }
}) {
  const id = await fetchTourIdByAlias(params.tour)
  if (!id) notFound()
  const [tourData, session] = await Promise.all([
    fetchTourAndHotels(id.id),
    auth()
  ])

  const ids = {
    user_id: session?.user.user_id,
    tour_id: tourData.id
  }
  return (
    <section className="section max-w-lg">
      <h1 className="h2 sm:h1 text-center mb-8">
        Бронирование тура:
        <br />
        {tourData.title}
      </h1>
      <BookForm ids={ids} tourData={tourData} />
    </section>
  )
}
